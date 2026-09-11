import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!elements.length) return;

    elements.forEach(el => {
      const delay = Number(el.dataset.delay || 0);
      el.style.transitionDelay = `${delay}ms`;
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      elements.forEach(el => {
        el.style.transitionDelay = '0ms';
        el.classList.add('is-visible');
      });
      return;
    }

    let observer;
    const show = el => {
      if (!el || el.classList.contains('is-visible')) return;
      el.classList.add('is-visible');
      observer?.unobserve(el);
    };

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) show(entry.target);
      });
    }, mobile
      ? { threshold: 0.01, rootMargin: '0px 0px 10% 0px' }
      : { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    const observeOrShow = el => {
      const rect = el.getBoundingClientRect();
      const height = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom > 0 && rect.top < height) show(el);
      else observer.observe(el);
    };

    elements.forEach(observeOrShow);

    const onPageShow = () => {
      elements.forEach(el => {
        if (el.classList.contains('is-visible')) return;
        const rect = el.getBoundingClientRect();
        const height = window.innerHeight || document.documentElement.clientHeight;
        if (rect.bottom > 0 && rect.top < height) show(el);
      });
    };

    window.addEventListener('pageshow', onPageShow);
    return () => {
      observer?.disconnect();
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);
}
