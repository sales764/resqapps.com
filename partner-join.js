// Partner sign-up form on partner.html (02/10/2026).
// Open to individuals and businesses in every country. Sends name, e-mail, country and the
// acceptance of the partner terms to Formspree (already used by the site), which e-mails
// sales@sornsawan.com. The owner then invites the partner in GoMarketMe.
(function () {
    'use strict';

    const ENDPOINT = 'https://formspree.io/f/mppwgzpo';

    // ISO 3166-1 alpha-2 codes; names come from the browser in the page language.
    const CODES = ('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ ' +
        'CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR ' +
        'GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP ' +
        'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT ' +
        'MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW ' +
        'SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG ' +
        'UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW').split(' ');

    // English lives in partner.html; FR and TH here (Thai validated by the owner on 02/10/2026).
    const MSG = {
        en: {
            choose: 'Choose your country',
            missing: 'Please fill in your name, a valid e-mail and your country, and tick the box.',
            sending: 'Sending…',
            ok: 'Thank you! We will e-mail you your partner invitation within 24 hours.',
            err: 'Sending failed. Please try again, or write to sales@sornsawan.com.'
        },
        fr: {
            choose: 'Choisissez votre pays',
            missing: 'Indiquez votre nom, une adresse e-mail valide et votre pays, puis cochez la case.',
            sending: 'Envoi…',
            ok: 'Merci ! Vous recevrez votre invitation de partenaire par e-mail sous 24 heures.',
            err: "L'envoi a échoué. Réessayez, ou écrivez à sales@sornsawan.com."
        },
        th: {
            choose: 'เลือกประเทศของคุณ',
            missing: 'กรุณากรอกชื่อ อีเมลที่ถูกต้อง และประเทศของคุณ แล้วทำเครื่องหมายในช่อง',
            sending: 'กำลังส่ง…',
            ok: 'ขอบคุณ เราจะส่งคำเชิญเป็นพันธมิตรให้คุณทางอีเมลภายใน 24 ชั่วโมง',
            err: 'ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อ sales@sornsawan.com'
        }
    };

    const lang = () => (document.documentElement.lang || 'en').slice(0, 2);
    const t = (k) => (MSG[lang()] || MSG.en)[k];

    function fillCountries(select) {
        const keep = select.value;
        let names;
        try { names = new Intl.DisplayNames([lang(), 'en'], { type: 'region' }); } catch (e) { names = null; }
        const list = CODES.map((c) => ({ c, n: (names && names.of(c)) || c }))
            .sort((a, b) => a.n.localeCompare(b.n, lang()));
        select.innerHTML = `<option value="">${t('choose')}</option>` +
            list.map((x) => `<option value="${x.c}">${x.n}</option>`).join('');
        if (keep) {
            select.value = keep;
        } else {
            // Pre-select the visitor's country from the browser language (e.g. fr-CA → CA), if any.
            const m = (navigator.language || '').match(/-([A-Z]{2})$/i);
            if (m && CODES.includes(m[1].toUpperCase())) select.value = m[1].toUpperCase();
        }
    }

    function init() {
        const form = document.getElementById('join-form');
        if (!form) return;
        const select = document.getElementById('join-country');
        const msg = document.getElementById('join-msg');
        const btn = document.getElementById('join-submit');
        fillCountries(select);

        // The site switches language after load: rebuild the country names when it does.
        new MutationObserver(() => fillCountries(select))
            .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

        const show = (kind, text) => { msg.className = 'join-msg ' + kind; msg.textContent = text; };

        // The "fill in everything" error goes away as soon as the person corrects the form.
        const clearError = () => { if (msg.classList.contains('err')) { msg.className = 'join-msg'; msg.textContent = ''; } };
        form.addEventListener('input', clearError);
        form.addEventListener('change', clearError);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const country = select.value;
            const accepted = document.getElementById('join-terms').checked;
            if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !country || !accepted) {
                show('err', t('missing'));
                return;
            }
            btn.disabled = true;
            const label = btn.lastElementChild.textContent;
            btn.lastElementChild.textContent = t('sending');
            try {
                const body = {
                    name, email,
                    country: `${country} – ${select.options[select.selectedIndex].text}`,
                    terms_accepted: `yes – Partner Program Terms of 2 October 2026, accepted ${new Date().toISOString()}`,
                    page_language: lang(),
                    _gotcha: form._gotcha.value,
                    _subject: `New RESQ+ partner: ${name} (${country})`,
                    form_type: 'partner_signup'
                };
                const res = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(body)
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                form.reset();
                fillCountries(select);
                show('ok', t('ok'));
                if (typeof gtag === 'function') gtag('event', 'partner_signup', { country });
            } catch (err) {
                show('err', t('err'));
            } finally {
                btn.disabled = false;
                btn.lastElementChild.textContent = label;
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
