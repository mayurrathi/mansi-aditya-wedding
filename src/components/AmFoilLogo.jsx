import { brand } from "../data/weddingData";

export default function AmFoilLogo({
  className = "",
  label = "AM Official Wedding Monogram",
}) {
  const maskUrl = `url("${brand.logo}")`;

  return (
    <span
      className={`am-foil-logo ${className}`.trim()}
      role="img"
      aria-label={label}
      style={{
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
      }}
    />
  );
}
