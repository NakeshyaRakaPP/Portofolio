import { useEffect, useRef } from 'react';

export function useContactScrollGate() {
  const hasGatedRef = useRef(false);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (!finePointer.matches || reducedMotion.matches) {
      return undefined;
    }

    const contactSection = document.getElementById('contact');

    if (!contactSection) {
      return undefined;
    }

    const handleWheel = event => {
      if (event.deltaY <= 0) return;

      const now = performance.now();

      if (now < lockUntilRef.current) {
        event.preventDefault();
        return;
      }

      if (hasGatedRef.current) return;

      const rect = contactSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isApproachingContact =
        rect.top > 0 &&
        rect.top < viewportHeight * 0.92;

      if (!isApproachingContact) return;

      event.preventDefault();

      hasGatedRef.current = true;
      lockUntilRef.current = now + 900;

      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    const handleScroll = () => {
      const rect = contactSection.getBoundingClientRect();

      // Kalau user naik jauh ke atas lagi,
      // gate boleh aktif lagi saat turun berikutnya.
      if (rect.top > window.innerHeight * 1.35) {
        hasGatedRef.current = false;
      }
    };

    window.addEventListener('wheel', handleWheel, {
      passive: false
    });

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}