import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../styles/magnetic.css';

/**
 * Magnetic — wraps a CTA so it gets pulled toward the cursor
 * (subtle tilt + scale), then elastically springs back on leave.
 * Pattern extracted from CinematicFooter's MagneticAction so the
 * whole site shares one magnetic feel.
 *
 * Disabled on touch devices and prefers-reduced-motion.
 * CSS :hover transforms remain as the no-JS fallback.
 */
export default function Magnetic({
  as: Component = 'a',
  strength = 0.22,
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    if (
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const move = event => {
      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        rotateX: -y * 0.06,
        rotateY: x * 0.06,
        scale: 1.035,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true
      });
    };

    const leave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true
      });
    };

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);

    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      gsap.killTweensOf(element);
    };
  }, [strength]);

  return (
    <Component
      ref={ref}
      className={`magnetic${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Component>
  );
}
