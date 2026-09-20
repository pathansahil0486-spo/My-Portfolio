import { useRef, useEffect } from 'react';

/**
 * High-performance 3D tilt & mouse spotlight hook
 * Sets CSS variables --mouse-x, --mouse-y, --tilt-x, --tilt-y on the target element
 * without triggering React re-renders for buttery 60fps performance.
 */
export const useTiltEffect = ({
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  glare = true
} = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let timeoutId = null;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const tiltX = ((y / rect.height) - 0.5) * -maxTilt;
      const tiltY = ((x / rect.width) - 0.5) * maxTilt;

      el.style.setProperty('--mouse-x', `${percentX}%`);
      el.style.setProperty('--mouse-y', `${percentY}%`);
      el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      el.style.setProperty('--card-scale', `${scale}`);
      el.style.setProperty('--perspective', `${perspective}px`);
      el.style.setProperty('--transition-tilt', `transform 0.1s ease-out`);
    };

    const handleMouseLeave = () => {
      el.style.setProperty('--transition-tilt', `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`);
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.style.setProperty('--card-scale', '1');
      el.style.setProperty('--mouse-x', '50%');
      el.style.setProperty('--mouse-y', '50%');
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [maxTilt, perspective, scale, speed, glare]);

  return elementRef;
};
