// ===========================================
// REVEAL — Cinematic scroll reveal (fade + slide + scale + blur, staggered)
// Reveal HANYA SEKALI: setelah muncul, elemen di-unobserve agar tidak
// animasi berulang tiap kali di-scroll masuk/keluar viewport.
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initReveal = function () {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    revealEls.forEach(el => {
        const delay = el.dataset.delay || 0;
        el.style.transitionDelay = `${delay}ms`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
};
