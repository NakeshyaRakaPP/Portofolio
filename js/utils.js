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
    },
    isTouchDevice() {
        // Tidak ada mouse presisi & tidak bisa hover = perangkat sentuh (HP/tablet)
        return window.matchMedia('(hover: none), (pointer: coarse)').matches;
    }
};
