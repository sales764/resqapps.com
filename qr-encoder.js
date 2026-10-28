// Encodeur de QR codes pour le lien des partenaires (partner.html, 28/10/2026). Écrit pour le site, sans bibliothèque
// extérieure (le site n'appelle plus jsDelivr) : norme ISO/IEC 18004, mode octet, correction d'erreur M (environ 15 %
// du code réparable, bon compromis pour une affiche), versions 1 à 10 (jusqu'à 213 octets ; un lien de partenaire en
// fait au plus 139). Le choix du masque suit les 4 pénalités de la norme. Vérifié en relisant les codes produits avec
// le lecteur d'OpenCV.
(function (root) {
    'use strict';

    // Par version (index 1 à 10), pour le niveau M : octets de correction par bloc, et nombre de blocs.
    const ECC_PER_BLOCK = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26];
    const NUM_BLOCKS = [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5];
    const MAX_VERSION = 10;
    const ECC_FORMAT_BITS_M = 0;

    function numRawDataModules(ver) {
        let result = (16 * ver + 128) * ver + 64;
        if (ver >= 2) {
            const numAlign = Math.floor(ver / 7) + 2;
            result -= (25 * numAlign - 10) * numAlign - 55;
            if (ver >= 7) result -= 36;
        }
        return result;
    }

    function numDataCodewords(ver) {
        return Math.floor(numRawDataModules(ver) / 8) - ECC_PER_BLOCK[ver] * NUM_BLOCKS[ver];
    }

    // Corps de Galois GF(2^8), polynôme 0x11D.
    function gfMultiply(x, y) {
        let z = 0;
        for (let i = 7; i >= 0; i--) {
            z = (z << 1) ^ ((z >>> 7) * 0x11D);
            z ^= ((y >>> i) & 1) * x;
        }
        return z;
    }

    function reedSolomonDivisor(degree) {
        const result = new Array(degree).fill(0);
        result[degree - 1] = 1;
        let root = 1;
        for (let i = 0; i < degree; i++) {
            for (let j = 0; j < result.length; j++) {
                result[j] = gfMultiply(result[j], root);
                if (j + 1 < result.length) result[j] ^= result[j + 1];
            }
            root = gfMultiply(root, 0x02);
        }
        return result;
    }

    function reedSolomonRemainder(data, divisor) {
        const result = divisor.map(() => 0);
        for (const b of data) {
            const factor = b ^ result.shift();
            result.push(0);
            divisor.forEach((coef, i) => { result[i] ^= gfMultiply(coef, factor); });
        }
        return result;
    }

    // Découpe en blocs, ajoute la correction de chaque bloc, puis entrelace.
    function addEccAndInterleave(data, ver) {
        const numBlocks = NUM_BLOCKS[ver];
        const blockEccLen = ECC_PER_BLOCK[ver];
        const rawCodewords = Math.floor(numRawDataModules(ver) / 8);
        const numShortBlocks = numBlocks - rawCodewords % numBlocks;
        const shortBlockLen = Math.floor(rawCodewords / numBlocks);
        const divisor = reedSolomonDivisor(blockEccLen);
        const blocks = [];
        for (let i = 0, k = 0; i < numBlocks; i++) {
            const dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
            k += dat.length;
            const ecc = reedSolomonRemainder(dat, divisor);
            if (i < numShortBlocks) dat.push(0);
            blocks.push(dat.concat(ecc));
        }
        const result = [];
        for (let i = 0; i < blocks[0].length; i++) {
            blocks.forEach((block, j) => {
                if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]);
            });
        }
        return result;
    }

    function encodeData(bytes) {
        let ver = 1;
        for (; ver <= MAX_VERSION; ver++) {
            const used = 4 + (ver <= 9 ? 8 : 16) + bytes.length * 8;
            if (used <= numDataCodewords(ver) * 8) break;
        }
        if (ver > MAX_VERSION) throw new RangeError('Texte trop long pour un QR code de version 10');
        const capacityBits = numDataCodewords(ver) * 8;
        const bits = [];
        const append = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
        append(0x4, 4);
        append(bytes.length, ver <= 9 ? 8 : 16);
        bytes.forEach((b) => append(b, 8));
        append(0, Math.min(4, capacityBits - bits.length));
        append(0, (8 - bits.length % 8) % 8);
        for (let pad = 0xEC; bits.length < capacityBits; pad ^= 0xEC ^ 0x11) append(pad, 8);
        const codewords = [];
        for (let i = 0; i < bits.length; i += 8) {
            let b = 0;
            for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
            codewords.push(b);
        }
        return { ver, codewords };
    }

    function encode(text) {
        const { ver, codewords } = encodeData(Array.from(new TextEncoder().encode(text)));
        const size = ver * 4 + 17;
        const modules = Array.from({ length: size }, () => new Array(size).fill(false));
        const isFunction = Array.from({ length: size }, () => new Array(size).fill(false));
        const getBit = (x, i) => ((x >>> i) & 1) !== 0;
        const setFunction = (x, y, dark) => { modules[y][x] = dark; isFunction[y][x] = true; };

        function drawFinder(x, y) {
            for (let dy = -4; dy <= 4; dy++) {
                for (let dx = -4; dx <= 4; dx++) {
                    const dist = Math.max(Math.abs(dx), Math.abs(dy));
                    const xx = x + dx;
                    const yy = y + dy;
                    if (xx >= 0 && xx < size && yy >= 0 && yy < size) setFunction(xx, yy, dist !== 2 && dist !== 4);
                }
            }
        }

        function drawAlignment(x, y) {
            for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) setFunction(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
            }
        }

        function alignmentPositions() {
            if (ver === 1) return [];
            const numAlign = Math.floor(ver / 7) + 2;
            const step = Math.ceil((ver * 4 + 4) / (numAlign * 2 - 2)) * 2;
            const result = [6];
            for (let pos = size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
            return result;
        }

        function drawFormatBits(mask) {
            const data = (ECC_FORMAT_BITS_M << 3) | mask;
            let rem = data;
            for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
            const bits = ((data << 10) | rem) ^ 0x5412;
            for (let i = 0; i <= 5; i++) setFunction(8, i, getBit(bits, i));
            setFunction(8, 7, getBit(bits, 6));
            setFunction(8, 8, getBit(bits, 7));
            setFunction(7, 8, getBit(bits, 8));
            for (let i = 9; i < 15; i++) setFunction(14 - i, 8, getBit(bits, i));
            for (let i = 0; i < 8; i++) setFunction(size - 1 - i, 8, getBit(bits, i));
            for (let i = 8; i < 15; i++) setFunction(8, size - 15 + i, getBit(bits, i));
            setFunction(8, size - 8, true);
        }

        function drawVersion() {
            if (ver < 7) return;
            let rem = ver;
            for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
            const bits = (ver << 12) | rem;
            for (let i = 0; i < 18; i++) {
                const dark = getBit(bits, i);
                const a = size - 11 + i % 3;
                const b = Math.floor(i / 3);
                setFunction(a, b, dark);
                setFunction(b, a, dark);
            }
        }

        // Motifs fixes : chronométrage, repères des coins, alignement, zones de format et de version.
        for (let i = 0; i < size; i++) {
            setFunction(6, i, i % 2 === 0);
            setFunction(i, 6, i % 2 === 0);
        }
        drawFinder(3, 3);
        drawFinder(size - 4, 3);
        drawFinder(3, size - 4);
        const align = alignmentPositions();
        const n = align.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (!((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0))) drawAlignment(align[i], align[j]);
            }
        }
        drawFormatBits(0);
        drawVersion();

        // Données, en zigzag depuis le coin bas droit, deux colonnes à la fois.
        const data = addEccAndInterleave(codewords, ver);
        let bitIndex = 0;
        for (let right = size - 1; right >= 1; right -= 2) {
            if (right === 6) right = 5;
            for (let vert = 0; vert < size; vert++) {
                for (let j = 0; j < 2; j++) {
                    const x = right - j;
                    const upward = ((right + 1) & 2) === 0;
                    const y = upward ? size - 1 - vert : vert;
                    if (!isFunction[y][x] && bitIndex < data.length * 8) {
                        modules[y][x] = getBit(data[bitIndex >>> 3], 7 - (bitIndex & 7));
                        bitIndex++;
                    }
                }
            }
        }

        function applyMask(mask) {
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    let invert;
                    switch (mask) {
                        case 0: invert = (x + y) % 2 === 0; break;
                        case 1: invert = y % 2 === 0; break;
                        case 2: invert = x % 3 === 0; break;
                        case 3: invert = (x + y) % 3 === 0; break;
                        case 4: invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break;
                        case 5: invert = x * y % 2 + x * y % 3 === 0; break;
                        case 6: invert = (x * y % 2 + x * y % 3) % 2 === 0; break;
                        default: invert = ((x + y) % 2 + x * y % 3) % 2 === 0; break;
                    }
                    if (!isFunction[y][x] && invert) modules[y][x] = !modules[y][x];
                }
            }
        }

        function finderPenaltyCountPatterns(runHistory) {
            const m = runHistory[1];
            const core = m > 0 && runHistory[2] === m && runHistory[3] === m * 3 && runHistory[4] === m && runHistory[5] === m;
            return (core && runHistory[0] >= m * 4 && runHistory[6] >= m ? 1 : 0) +
                (core && runHistory[6] >= m * 4 && runHistory[0] >= m ? 1 : 0);
        }

        function finderPenaltyAddHistory(runLength, runHistory) {
            if (runHistory[0] === 0) runLength += size;
            runHistory.pop();
            runHistory.unshift(runLength);
        }

        function finderPenaltyTerminateAndCount(runColor, runLength, runHistory) {
            if (runColor) {
                finderPenaltyAddHistory(runLength, runHistory);
                runLength = 0;
            }
            runLength += size;
            finderPenaltyAddHistory(runLength, runHistory);
            return finderPenaltyCountPatterns(runHistory);
        }

        function penalty() {
            let result = 0;
            for (let pass = 0; pass < 2; pass++) {
                for (let a = 0; a < size; a++) {
                    let runColor = false;
                    let run = 0;
                    const runHistory = [0, 0, 0, 0, 0, 0, 0];
                    for (let b = 0; b < size; b++) {
                        const dark = pass === 0 ? modules[a][b] : modules[b][a];
                        if (dark === runColor) {
                            run++;
                            if (run === 5) result += 3;
                            else if (run > 5) result++;
                        } else {
                            finderPenaltyAddHistory(run, runHistory);
                            if (!runColor) result += finderPenaltyCountPatterns(runHistory) * 40;
                            runColor = dark;
                            run = 1;
                        }
                    }
                    result += finderPenaltyTerminateAndCount(runColor, run, runHistory) * 40;
                }
            }
            for (let y = 0; y < size - 1; y++) {
                for (let x = 0; x < size - 1; x++) {
                    const c = modules[y][x];
                    if (c === modules[y][x + 1] && c === modules[y + 1][x] && c === modules[y + 1][x + 1]) result += 3;
                }
            }
            let dark = 0;
            modules.forEach((row) => row.forEach((m) => { if (m) dark++; }));
            const total = size * size;
            result += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
            return result;
        }

        let bestMask = 0;
        let bestPenalty = Infinity;
        for (let mask = 0; mask < 8; mask++) {
            applyMask(mask);
            drawFormatBits(mask);
            const p = penalty();
            if (p < bestPenalty) {
                bestMask = mask;
                bestPenalty = p;
            }
            applyMask(mask);
        }
        applyMask(bestMask);
        drawFormatBits(bestMask);
        return { version: ver, size, mask: bestMask, modules };
    }

    // Dessine le code sur un canvas, avec la marge blanche de 4 modules exigée par la norme.
    function drawToCanvas(qr, canvas, scale) {
        const border = 4;
        const px = (qr.size + border * 2) * scale;
        canvas.width = px;
        canvas.height = px;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, px, px);
        ctx.fillStyle = '#000000';
        for (let y = 0; y < qr.size; y++) {
            for (let x = 0; x < qr.size; x++) {
                if (qr.modules[y][x]) ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
            }
        }
    }

    root.ResqQR = { encode, drawToCanvas };
})(typeof window !== 'undefined' ? window : globalThis);
