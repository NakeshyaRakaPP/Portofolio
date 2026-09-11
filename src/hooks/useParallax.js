import { useEffect } from 'react';

export function useParallax(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const elements = [...document.querySelectorAll('[data-parallax]')];
    const hero = document.getElementById('hero-section');
    if (!elements.length || !hero) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (touch) {
      let ticking = false;
      const apply = () => {
        ticking = false;
        const rect = hero.getBoundingClientRect();
        const scrollShift = Math.max(0, -rect.top);
        elements.forEach(el => {
          const speed = Number.parseFloat(el.dataset.parallaxScroll || '0');
          if (!speed) return;
          el.style.transform = `translate3d(0, ${-(scrollShift * speed * 0.35)}px, 0)`;
        });
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(apply);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      apply();
      return () => window.removeEventListener('scroll', onScroll);
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollShift = 0;
    let frame = 0;

    const onMouseMove = event => {
      targetX = event.clientX - window.innerWidth / 2;
      targetY = event.clientY - window.innerHeight / 2;
    };
    const onMouseLeave = () => { targetX = 0; targetY = 0; };
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      scrollShift = Math.max(0, -rect.top);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      elements.forEach(el => {
        const mouseSpeed = Number.parseFloat(el.dataset.parallax || '0.05');
        const scrollSpeed = Number.parseFloat(el.dataset.parallaxScroll || '0');
        const x = currentX * mouseSpeed;
        const y = currentY * mouseSpeed - scrollShift * scrollSpeed;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      frame = requestAnimationFrame(loop);
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      elements.forEach(el => { el.style.transform = ''; });
    };
  }, [enabled]);
}
