import { useId } from "react";

const sizes = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
  hero: 128,
  impact: 168,
};

/** Custom path logomark — synapse S + sage P inside a soft hex frame */
export default function BrandMark({ size = "md", className = "" }) {
  const px = sizes[size] ?? sizes.md;
  const uid = useId().replace(/:/g, "");
  const frameGrad = `bm-frame-${uid}`;
  const sGrad = `bm-s-${uid}`;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`brand-mark shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={frameGrad} x1="4" y1="4" x2="44" y2="44">
          <stop offset="0%" stopColor="#a8906c" />
          <stop offset="45%" stopColor="#8e8880" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a8906c" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={sGrad} x1="10" y1="10" x2="30" y2="38">
          <stop offset="0%" stopColor="#f0ebe3" />
          <stop offset="100%" stopColor="#a8906c" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hex frame */}
      <path
        d="M24 3.5 40.5 13v22L24 44.5 7.5 35V13L24 3.5Z"
        fill="#12100e"
        stroke={`url(#${frameGrad})`}
        strokeWidth="1.15"
      />

      {/* Inner glow ring */}
      <path
        d="M24 8 36 15.5v17L24 40 12 32.5v-17L24 8Z"
        stroke="#a8906c"
        strokeOpacity="0.08"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Botanical leaf */}
      <path
        d="M37.5 10.5c-2.2 4.2-4.8 5.8-7.5 5.5 2.8-1.2 5-3.5 7.5-8.2z"
        fill="#8e8880"
        fillOpacity="0.65"
      />

      <g filter={`url(#${uid}-glow)`}>
        {/* S — flowing stroke */}
        <path
          d="M14 32c0-10 8.5-14 15-10.5 4.5 2.2 4 8.5-1 10.5-4 1.8-9 .5-10-3.5"
          stroke={`url(#${sGrad})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* P — stem + bowl */}
        <path
          d="M29 14v20M29 14c0 0 9 0 9 8.5s-5.5 9.5-9 7"
          stroke="#a09a92"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Synapse node */}
        <circle cx="24" cy="24" r="2.5" fill="#f0ebe3" />
        <circle cx="24" cy="24" r="6" stroke="#a8906c" strokeOpacity="0.35" strokeWidth="1" fill="none" />
      </g>

      {/* Signature tick */}
      <path
        d="M10 38.5h5"
        stroke="#a8906c"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
