import { useEffect, useRef, useState, useCallback } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';

/**
 * MALLI LOGO 3D
 *
 * Wraps the existing logo with a restrained dimensional treatment: soft depth,
 * warm light, and a barely-visible floating motion. It preserves the exact mark,
 * the approved proportions, and the hero composition while making the object
 * feel slightly more architectural and premium.
 */
export const MalliLogo3D = ({
  alt = 'Malli',
  className = '',
  externallyControlled = false,
  interactive = true,
  idle = true,
  style,
  ...props
}) => {
  const logoRef = useRef(null);
  const frameRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reducedMotion = prefersReducedMotion();
  const mounted = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!interactive || reducedMotion || !logoRef.current) return;

    const rect = logoRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width * 0.7)));
    const y = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height * 0.7)));

    setMousePos({ x, y });
  }, [interactive, reducedMotion]);

  useEffect(() => {
    if (!interactive || reducedMotion) return undefined;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    mounted.current = true;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mounted.current = false;
    };
  }, [handleMouseMove, interactive, reducedMotion]);

  useEffect(() => {
    if (!idle || reducedMotion) return undefined;

    let frame = 0;
    const animate = () => {
      frame += 1;
      const t = frame * 0.012;
      const driftX = Math.sin(t * 1.2) * 1.6;
      const driftY = Math.cos(t * 1.1) * 2.4;
      const hover = Math.sin(t * 1.6) * 3;
      const scale = 1 + Math.sin(t * 0.9) * 0.008;

      if (logoRef.current) {
        logoRef.current.style.transform = `
          perspective(1200px)
          rotateX(${driftX}deg)
          rotateY(${driftY}deg)
          translate3d(0, ${hover}px, 0)
          scale(${scale})
        `;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [idle, reducedMotion]);

  const getTransform = () => {
    if (reducedMotion) return 'none';

    if (interactive && (mousePos.x !== 0 || mousePos.y !== 0)) {
      const rx = -mousePos.y * 3.2;
      const ry = mousePos.x * 3.2;
      return `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    return undefined;
  };

  const transform = getTransform();

  return (
    <div
      ref={logoRef}
      className={`malli-logo-3d-wrapper ${className}`.trim()}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        display: 'inline-block',
        willChange: externallyControlled ? 'transform, opacity' : 'transform',
        transform,
        transition: reducedMotion ? 'none' : 'transform 180ms ease-out',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      aria-hidden={true}
    >
      <div
        className="malli-logo-depth-shadow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '0',
          transform: 'translate3d(0, 12px, -18px) scale(1.03)',
          filter: 'blur(16px) opacity(0.16)',
          background: 'radial-gradient(ellipse at center, rgba(128, 41, 49, 0.4) 0%, rgba(67, 19, 24, 0.18) 35%, transparent 72%)',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          opacity: 0.7,
          willChange: 'transform, opacity',
        }}
      />

      <div
        className="malli-logo-ambient-glow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-18%',
          transform: 'translate3d(0, 0, -24px)',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(214, 176, 103, 0.10) 0%, rgba(214, 176, 103, 0.04) 42%, transparent 72%)',
          filter: 'blur(34px)',
          pointerEvents: 'none',
          opacity: 0.78,
          willChange: 'opacity',
        }}
      />

      <div
        className="malli-logo-front"
        style={{
          transform: 'translate3d(0, 0, 16px)',
          filter: 'drop-shadow(0 10px 26px rgba(14, 9, 5, 0.22)) drop-shadow(0 2px 8px rgba(14, 9, 5, 0.12))',
          willChange: 'transform, filter',
        }}
      >
        <img
          src="/malli-assets/malli-logo.png"
          alt={alt}
          className={`object-contain ${props.imgClassName || ''} ${props.className || ''}`.trim()}
          style={{
            mixBlendMode: props.blend === 'screen' ? 'screen' : undefined,
            filter: 'brightness(1.02) contrast(1.01) saturate(1.02)',
            transition: 'filter 600ms ease-out',
          }}
          draggable={false}
          decoding="async"
          fetchPriority="high"
          {...props}
        />
      </div>

      <div
        className="malli-logo-specular"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0',
          left: '10%',
          right: '10%',
          height: '18%',
          transform: 'translate3d(0, 0, 22px)',
          background: 'linear-gradient(180deg, rgba(242, 230, 203, 0.14) 0%, transparent 100%)',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          pointerEvents: 'none',
          opacity: 0.35,
          willChange: 'opacity',
        }}
      />
    </div>
  );
};

export default MalliLogo3D;