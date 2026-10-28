// Lien et QR code d'un partenaire (partner.html, section #my-link, 28/10/2026, demande de JP). Le partenaire tape son
// code ; la page fabrique le lien Google Play qui le porte (lu par l'appli depuis la 4.6.10 : PartnerLink.kt,
// docs/PLAN_GOMARKETME_4610.md § 2) et son QR code (qr-encoder.js). Rien n'est envoyé : tout se calcule dans le
// navigateur.
(function () {
    'use strict';

    const BASE = 'https://play.google.com/store/apps/details?id=com.firstaidkit.resq' +
        '&referrer=utm_source%3Dpartner%26utm_term%3D';
    // Les caractères que l'appli garde (InstallAttribution.clean), 32 au plus (PartnerLink.MAX_CODE_LENGTH) : un code
    // valide n'a donc rien à encoder dans le lien.
    const VALID = /^[A-Za-z0-9_.-]{1,32}$/;
    const QR_SCALE = 8;

    // L'anglais vit dans partner.html ; FR et TH ici (thaï à valider : docs/THAI_A_VALIDER_SITE_1_1.md).
    const MSG = {
        en: {
            empty: 'Type your partner code.',
            invalid: 'A partner code only contains letters, digits and the signs _ - .',
            copied: 'Link copied'
        },
        fr: {
            empty: 'Tapez votre code partenaire.',
            invalid: 'Un code partenaire ne contient que des lettres, des chiffres et les signes _ - .',
            copied: 'Lien copié'
        },
        th: {
            empty: 'พิมพ์โค้ดพาร์ทเนอร์ของคุณ',
            invalid: 'โค้ดพาร์ทเนอร์มีได้เฉพาะตัวอักษร ตัวเลข และเครื่องหมาย _ - .',
            copied: 'คัดลอกลิงก์แล้ว'
        }
    };

    const lang = () => (document.documentElement.lang || 'en').slice(0, 2);
    const t = (k) => (MSG[lang()] || MSG.en)[k];

    function init() {
        const form = document.getElementById('link-form');
        if (!form || !window.ResqQR) return;
        const input = document.getElementById('link-code');
        const msg = document.getElementById('link-msg');
        const result = document.getElementById('link-result');
        const urlField = document.getElementById('link-url');
        const canvas = document.getElementById('link-qr');
        const download = document.getElementById('link-download');
        const copy = document.getElementById('link-copy');

        const say = (text) => {
            msg.textContent = text;
            msg.className = text ? 'link-msg err' : 'link-msg';
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = input.value.trim();
            if (!VALID.test(code)) {
                say(code ? t('invalid') : t('empty'));
                result.hidden = true;
                return;
            }
            say('');
            const url = BASE + code;
            urlField.value = url;
            window.ResqQR.drawToCanvas(window.ResqQR.encode(url), canvas, QR_SCALE);
            download.href = canvas.toDataURL('image/png');
            download.download = 'resq-qr-' + code + '.png';
            result.hidden = false;
        });

        copy.addEventListener('click', () => {
            const label = copy.innerHTML;
            const done = () => {
                copy.textContent = '✓ ' + t('copied');
                setTimeout(() => { copy.innerHTML = label; }, 2000);
            };
            const fallback = () => {
                urlField.select();
                document.execCommand('copy');
                done();
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(urlField.value).then(done, fallback);
            } else {
                fallback();
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
