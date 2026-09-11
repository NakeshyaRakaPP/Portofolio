import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!finePointer || reduced || !dot || !outline) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let frame = 0;

    const move = event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    const hide = () => document.body.classList.add('cursor-hidden');
    const show = () => document.body.classList.remove('cursor-hidden');
    const enter = () => { outline.classList.add('cursor-hover'); dot.classList.add('cursor-hover'); };
    const leave = () => { outline.classList.remove('cursor-hover'); dot.classList.remove('cursor-hover'); };

    const selector = 'a, button, .btn, .logo-item, .card, .project-card, .tool-card, #theme-toggle, .stretched-link';
    const targets = [...document.querySelectorAll(selector)];
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove('custom-cursor-active', 'cursor-hidden');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
}
