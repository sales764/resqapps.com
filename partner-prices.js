// Page Partenaires : les 3 exemples de gains (« Ce que vous gagnez ») dans la monnaie d'un pays choisi
// (31/10/2026, défaut G27 : la page ne montrait que des bahts, alors que les films partenaires parlent aux
// États-Unis et au Canada).
//
// Prix : Google Play, lus par l'API le 31/10/2026 (tools/play-publisher/prices_dump.mjs, lecture seule) :
// forfaits resq_premium_family_subscription (yearly, monthly) et resq_premium_subscription (yearly).
// Les prix de l'App Store peuvent différer un peu (ex. Canada : 99,99 $ au lieu de 109,99 $) : la phrase
// au-dessus des exemples le dit.
//
// Pays par défaut : ?country=US|CA|GB|AU|FR|TH, sinon la région de la langue du navigateur (fr-CA → CA),
// sinon la langue de la page (fr → Canada, th → Thaïlande, sinon États-Unis).
// Page thaïe : pas de choix de pays ; les textes thaïs validés et les prix de la Thaïlande restent tels quels.
(function () {
    'use strict';
    var PRICES = {
        US: { cur: 'USD', fy: 79.99, iy: 39.99, fm: 9.99 },
        CA: { cur: 'CAD', fy: 109.99, iy: 54.99, fm: 13.99 },
        GB: { cur: 'GBP', fy: 64.99, iy: 29.99, fm: 7.99 },
        AU: { cur: 'AUD', fy: 109.99, iy: 54.99, fm: 13.99 },
        FR: { cur: 'EUR', fy: 79.99, iy: 39.99, fm: 9.99 },
        TH: { cur: 'THB', fy: 1590, iy: 790, fm: 199 }
    };
    var SHARE = 0.30;
    // L'anglais vit ici (le reste de l'anglais de la page est dans partner.html) ; le français dans
    // translations-business.js (ptnr_ex1_tpl…) ; le thaï garde ses phrases validées ptnr_ex1_desc….
    var EN_TPL = {
        fy: 'for you, on the {price} plan (for up to 6 people), and again each year it renews',
        iy: 'for you, on the {price} plan, and again each year it renews',
        fm: 'for you, every month the {price} plan continues'
    };
    var TPL_KEY = { fy: 'ptnr_ex1_tpl', iy: 'ptnr_ex2_tpl', fm: 'ptnr_ex3_tpl' };
    var TH_KEY = { fy: 'ptnr_ex1_desc', iy: 'ptnr_ex2_desc', fm: 'ptnr_ex3_desc' };
    var chosen = null;

    function pageLang() {
        var l = (window.i18n && window.i18n.currentLang) ||
            (typeof i18n !== 'undefined' && i18n.currentLang) || document.documentElement.lang || 'en';
        return String(l).slice(0, 2).toLowerCase();
    }

    function defaultCountry(lang) {
        var q = new URLSearchParams(window.location.search).get('country');
        if (q && PRICES[q.toUpperCase()]) return q.toUpperCase();
        var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
        for (var i = 0; i < langs.length; i++) {
            var region = (String(langs[i]).split('-')[1] || '').toUpperCase();
            if (PRICES[region]) return region;
        }
        return lang === 'fr' ? 'CA' : (lang === 'th' ? 'TH' : 'US');
    }

    function money(v, cur, lang) {
        if (cur === 'THB') {                       // « 1 590 ฿ », comme le reste de la page
            return Math.round(v).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US') + ' ฿';
        }
        try {
            return new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-US', { style: 'currency', currency: cur }).format(v);
        } catch (e) {
            return v.toFixed(2) + ' ' + cur;
        }
    }

    function dict(lang) {
        return (typeof i18nComplete !== 'undefined' && i18nComplete[lang]) || {};
    }

    function render() {
        var lang = pageLang();
        var box = document.getElementById('ptnr-country-box');
        var select = document.getElementById('ptnr-country');
        if (!box || !select) return;
        var thai = lang === 'th';
        box.style.display = thai ? 'none' : 'flex';
        var country = thai ? 'TH' : (chosen || defaultCountry(lang));
        if (!thai) select.value = country;
        var p = PRICES[country];
        ['fy', 'iy', 'fm'].forEach(function (ex) {
            var amount = document.querySelector('.ptnr-amount[data-ex="' + ex + '"]');
            var desc = document.querySelector('.ptnr-ex-desc[data-ex="' + ex + '"]');
            if (amount) amount.textContent = '≈ ' + money(Math.round(p[ex] * SHARE * 100) / 100, p.cur, lang);
            if (!desc) return;
            if (thai && dict('th')[TH_KEY[ex]]) {
                desc.textContent = dict('th')[TH_KEY[ex]];
            } else {
                var tpl = (lang === 'fr' && dict('fr')[TPL_KEY[ex]]) || EN_TPL[ex];
                desc.textContent = tpl.replace('{price}', money(p[ex], p.cur, lang));
            }
        });
    }

    function init() {
        var select = document.getElementById('ptnr-country');
        if (!select) return;
        select.addEventListener('change', function () {
            chosen = select.value;
            render();
        });
        var target = window.i18n || (typeof i18n !== 'undefined' ? i18n : null);
        if (target && typeof target.switchLang === 'function') {
            var original = target.switchLang;
            target.switchLang = function () {
                var r = original.apply(this, arguments);
                render();
                return r;
            };
        }
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
