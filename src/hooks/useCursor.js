import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!finePointer || reduced || !dot || !outline) return undefined;

    document.body.classList.add('custom-cursor-active');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let frame = 0;

    const interactiveSelector = [
      'a',
      'button',
      '.btn',
      '.project-card',
      '.tool-card',
      '.logo-coverflow-card',
      '.logo-coverflow-dot',
      '.logo-detail-gallery-item',
      '#theme-toggle',
      '.stretched-link'
    ].join(', ');

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

    const setHover = active => {
      outline.classList.toggle('cursor-hover', active);
      dot.classList.toggle('cursor-hover', active);
    };

    const handlePointerOver = event => {
      if (event.target.closest?.(interactiveSelector)) setHover(true);
    };

    const handlePointerOut = event => {
      const fromInteractive = event.target.closest?.(interactiveSelector);
      if (!fromInteractive) return;

      const next = event.relatedTarget;
      if (next instanceof Element && next.closest(interactiveSelector)) return;

      setHover(false);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove('custom-cursor-active', 'cursor-hidden');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      setHover(false);
    };
  }, []);
}
