import { useEffect } from 'react';

export function useMagneticText(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reduced) return;

    const wrap = selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (element.dataset.magneticReady) return;
        element.dataset.magneticReady = 'true';

        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue.trim()) textNodes.push(node);
        }

        textNodes.forEach(textNode => {
          const fragment = document.createDocumentFragment();
          textNode.nodeValue.split(/(\s+)/).forEach(word => {
            if (!word.trim()) {
              fragment.appendChild(document.createTextNode(word));
              return;
            }
            const wordSpan = document.createElement('span');
            wordSpan.className = 'magnetic-word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            [...word].forEach(char => {
              const span = document.createElement('span');
              span.className = 'hover-char';
              span.textContent = char;
              wordSpan.appendChild(span);
            });
            fragment.appendChild(wordSpan);
          });
          textNode.parentNode?.replaceChild(fragment, textNode);
        });
      });
    };

    wrap('.hero-name-big, .hero-desc-long');

    const chars = [...document.querySelectorAll('.hover-char')];
    if (!chars.length) return;

    const hero = document.getElementById('hero-section');
    const maxDistance = 75;
    let data = [];
    let mouseX = 0;
    let mouseY = 0;
    let refresh = true;
    let ticking = false;

    const refreshRects = () => {
      data = chars.map(span => {
        const rect = span.getBoundingClientRect();
        return { span, cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
      });
      refresh = false;
    };

    const apply = () => {
      ticking = false;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      }
      if (refresh) refreshRects();
      data.forEach(({ span, cx, cy }) => {
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          const lift = ((maxDistance - distance) / maxDistance) * -18;
          span.style.transform = `translateY(${lift}px) scale(1.1)`;
          span.style.color = 'var(--accent-color)';
        } else if (span.style.color) {
          span.style.transform = 'translateY(0) scale(1)';
          span.style.color = '';
        }
      });
    };

    const onMove = event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    const markRefresh = () => { refresh = true; };

    document.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', markRefresh, { passive: true });
    window.addEventListener('resize', markRefresh);

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', markRefresh);
      window.removeEventListener('resize', markRefresh);
    };
  }, [enabled]);
}
