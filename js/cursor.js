// ===========================================
// CURSOR — Custom cursor (mouse follower)
// Hanya aktif untuk pointer presisi (mouse) & yang tidak minta reduced motion.
// ===========================================
window.RakaSite = window.RakaSite || {};

RakaSite.initCursor = function () {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const isFinePointer = RakaSite.utils.isFinePointer();
    const prefersReducedMotionCursor = RakaSite.utils.prefersReducedMotion();

    if (!(isFinePointer && !prefersReducedMotionCursor && cursorDot && cursorOutline)) return;

    document.body.classList.add('custom-cursor-active');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Dot follows instantly (no lag) for precision
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Outline follows with easing/smoothing (lerp) for a soft trailing feel
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
    document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

    // Grow + change color on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .logo-item, .card, .project-card, .skill-chip, #theme-toggle, .stretched-link');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
};
