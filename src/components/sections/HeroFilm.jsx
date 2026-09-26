import { useEffect, useRef, useState } from 'react';

/**
 * HERO FILM
 *
 * Real footage of the restaurant, cut into a short sequence. Three rules:
 *
 *  1. The poster is painted first and never removed, so there is no moment —
 *     on a slow connection or a blocked codec — where the first viewport is an
 *     empty black rectangle.
 *  2. Playback only starts once the browser has actually decoded a frame, so
 *     the film is never torn or half-drawn underneath the type.
 *  3. The video is decorative: it is muted, inline, hidden from assistive
 *     technology, and it pauses whenever it leaves the viewport.
 */
export const HeroFilm = ({ className = '', wrapperRef }) => {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Only fade the film in once real picture exists; until then the poster
    // layer below is doing the work.
    const onReady = () => setReady(true);
    const onError = () => {
      setFailed(true);
      setReady(false);
    };

    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onError);

    // Some engines will not autoplay a muted video they consider
    // low-priority; asking again on user interaction is enough to recover.
    const kick = () => video.play().catch(() => {});
    video.play().catch(kick);
    window.addEventListener('pointerdown', kick, { once: true });
    window.addEventListener('wheel', kick, { once: true, passive: true });

    // Don't decode frames for a section nobody is looking at.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('wheel', kick);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 overflow-hidden ${className}`.trim()}>
      {/* Layer 1 — the still. Present from the first paint and never taken down. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/media/hero-poster.webp')" }}
      />

      {/* Layer 2 — the film, revealed only once it can actually play. */}
      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out will-change-opacity"
          style={{ opacity: ready ? 1 : 0 }}
          src="/media/hero.mp4"
          poster="/media/hero-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Layer 3 — one warm light source so the footage sits in the page. */}
      <div aria-hidden="true" className="absolute inset-0 vignette-warm" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,12,8,0.62) 0%, rgba(20,12,8,0.12) 30%, rgba(20,12,8,0.28) 62%, rgba(20,12,8,0.88) 100%)',
        }}
      />
    </div>
  );
};

export default HeroFilm;
