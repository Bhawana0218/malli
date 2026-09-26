/**
 * The Malli mark.
 *
 * The supplied artwork is a light-on-transparent lockup, so `mix-blend-mode:
 * screen` lets the gold sit on photographic surfaces without a black box. On the
 * light editorial sections the blend is switched off by the caller, where the
 * same artwork would otherwise disappear.
 */
export const MalliLogo = ({
  alt = 'Malli',
  className = '',
  imgClassName = '',
  blend = 'screen',
}) => (
  <img
    src="/malli-assets/malli-logo.png"
    alt={alt}
    className={`object-contain ${imgClassName} ${className}`.trim()}
    style={blend === 'screen' ? { mixBlendMode: 'screen' } : undefined}
    draggable={false}
    decoding="async"
    fetchPriority="high"
  />
);

export default MalliLogo;
