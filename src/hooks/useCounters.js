import { useEffect } from 'react';

export function useCounters() {
  useEffect(() => {
    const elements = [...document.querySelectorAll('.stat-count')];
    if (!elements.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = el => {
      const target = Number.parseInt(el.dataset.count, 10) || 0;
      if (reduced) {
        el.textContent = target;
        return;
      }

      const duration = 1500;
      const start = performance.now();
      let frame = 0;

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) frame = requestAnimationFrame(tick);
        else el.textContent = target;
      };

      frame = requestAnimationFrame(tick);
      el._counterFrame = frame;
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.target.dataset.counted) return;
        entry.target.dataset.counted = 'true';
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
      elements.forEach(el => {
        if (el._counterFrame) cancelAnimationFrame(el._counterFrame);
      });
    };
  }, []);
}
