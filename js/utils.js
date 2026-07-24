// ===========================================
// UTILS — Helper kecil yang dipakai lintas modul
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.utils = {
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    isFinePointer() {
        return window.matchMedia('(pointer: fine)').matches;
    }
};
