// ===========================================
// PARALLAX — Hero parallax (mouse-follow + scroll-follow)
// Foto bergerak paling banyak, teks "SYSTEM THINKER" lebih sedikit, background paling halus.
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initParallax = function () {
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    const heroSection = document.getElementById('hero-section');

    if (!(parallaxEls.length && heroSection)) return;

    const reduceMotion = RakaSite.utils.prefersReducedMotion();
    if (reduceMotion) return; // Reveal.css/media query sudah menangani agar konten tetap terlihat statis

    const isTouch = RakaSite.utils.isTouchDevice();

    // ===== PERANGKAT SENTUH: tanpa mouse-follow, tanpa rAF loop permanen =====
    // Cukup pergeseran scroll yang SANGAT halus, dihitung langsung saat event scroll
    // (bukan rAF loop 60fps tanpa henti) — jauh lebih hemat baterai/CPU di HP.
    if (isTouch) {
        const TOUCH_SCROLL_DAMPING = 0.35; // dikurangi drastis dibanding versi desktop

        const applyTouchScrollShift = () => {
            const rect = heroSection.getBoundingClientRect();
            const scrollShift = Math.max(0, -rect.top);

            parallaxEls.forEach(el => {
                const scrollSpeed = el.hasAttribute('data-parallax-scroll') ? parseFloat(el.dataset.parallaxScroll) : 0;
                if (!scrollSpeed) return;
                const y = -(scrollShift * scrollSpeed * TOUCH_SCROLL_DAMPING);
                el.style.transform = `translate3d(0, ${y}px, 0)`;
            });
        };

        window.addEventListener('scroll', applyTouchScrollShift, { passive: true });
        applyTouchScrollShift();
        return;
    }

    // ===== DESKTOP: mouse-follow + scroll-follow penuh (perilaku asli) =====
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let scrollShift = 0;

    heroSection.addEventListener('mousemove', (e) => {
        const { innerWidth, innerHeight } = window;
        targetX = (e.clientX - innerWidth / 2);
        targetY = (e.clientY - innerHeight / 2);
    });

    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    const updateScrollShift = () => {
        const rect = heroSection.getBoundingClientRect();
        // How far the hero has scrolled past the top of the viewport (0 while hero is in view at top)
        scrollShift = Math.max(0, -rect.top);
    };
    window.addEventListener('scroll', updateScrollShift, { passive: true });
    updateScrollShift();

    function parallaxLoop() {
        // Smooth easing (lerp) toward target mouse position — feels premium, no jitter
        curX += (targetX - curX) * 0.08;
        curY += (targetY - curY) * 0.08;

        parallaxEls.forEach(el => {
            const mouseSpeed = el.hasAttribute('data-parallax') ? parseFloat(el.dataset.parallax) : 0.05;
            const scrollSpeed = el.hasAttribute('data-parallax-scroll') ? parseFloat(el.dataset.parallaxScroll) : 0;
            const x = curX * mouseSpeed;
            const y = curY * mouseSpeed - (scrollShift * scrollSpeed);
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        requestAnimationFrame(parallaxLoop);
    }

    parallaxLoop();
};
