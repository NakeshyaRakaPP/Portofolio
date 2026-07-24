// ===========================================
// LOADER — Layar loading di awal kunjungan
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initLoader = function () {
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (!loader) return;
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            document.body.classList.remove('is-loading');
            setTimeout(() => loader.remove(), 700);
        }, 900); // logo + bar animation gets its moment before hero appears
    });
};
