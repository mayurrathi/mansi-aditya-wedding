export default function InfinityEmblemSvg({ size = 84, className = "" }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.46)}
      viewBox="0 0 180 84"
      fill="none"
      className={`infinity-svg ${className}`.trim()}
      aria-hidden="true"
    >
      <path
        d="M22 42c0-14 11.5-25 25.5-25 16.5 0 28.5 14 42.5 25 14 11 26 25 42.5 25 14 0 25.5-11 25.5-25s-11.5-25-25.5-25c-16.5 0-28.5 14-42.5 25-14 11-26 25-42.5 25C33.5 67 22 56 22 42z"
        stroke="#B68B3C"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="infinity-svg__path"
      />
      <path
        d="M28 42c0-10.5 8.5-19 19.5-19 13.5 0 24.5 11.5 42.5 19 18 7.5 29 19 42.5 19 11 0 19.5-8.5 19.5-19s-8.5-19-19.5-19c-13.5 0-24.5 11.5-42.5 19-18 7.5-29 19-42.5 19C36.5 61 28 52.5 28 42z"
        stroke="#8BB17E"
        strokeWidth="1.25"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <circle cx="90" cy="42" r="4" fill="#A63A2E" />
    </svg>
  );
}
