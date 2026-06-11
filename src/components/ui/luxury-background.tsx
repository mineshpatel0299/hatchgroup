import Image from "next/image";

/**
 * Chandelier watermark — ultra-faint, full-section fill.
 * Only used in alternating sections.
 */
export function LuxuryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Chandelier image — barely visible, blends into warm background */}
      <Image
        src="/images/luxury-bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-center opacity-[0.06] mix-blend-multiply"
      />
      {/* Soft vignette so edges stay clean */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,var(--background)_100%)]" />
    </div>
  );
}
