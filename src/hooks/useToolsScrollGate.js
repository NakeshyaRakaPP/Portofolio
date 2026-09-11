import { useEffect, useRef } from 'react';

export function useToolsScrollGate() {
  const hasGatedRef = useRef(false);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    const isDesktopPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (!isDesktopPointer.matches || reducedMotion.matches) {
      return undefined;
    }

    const toolsSection = document.getElementById('skills');

    if (!toolsSection) {
      return undefined;
    }

    const handleWheel = event => {
      if (event.deltaY <= 0) return;

      const now = performance.now();

      // Selama masa lock, tahan scroll sebentar agar user benar-benar mendarat di Tools
      if (now < lockUntilRef.current) {
        event.preventDefault();
        return;
      }

      // Gate hanya aktif sekali selama user terus scroll ke bawah
      if (hasGatedRef.current) return;

      const rect = toolsSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isApproachingTools =
        rect.top > viewportHeight * 0.18 &&
        rect.top < viewportHeight * 0.58;

      if (!isApproachingTools) return;

      event.preventDefault();

      hasGatedRef.current = true;

      // Beri waktu sedikit agar user "mendarat" di Tools
      lockUntilRef.current = now + 820;

      toolsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    const handleScroll = () => {
      const rect = toolsSection.getBoundingClientRect();

      /*
       * Kalau user scroll balik cukup jauh ke atas,
       * gate di-reset supaya nanti saat turun lagi
       * Tools bisa menahan scroll sekali lagi.
       */
      if (rect.top > window.innerHeight * 1.25) {
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