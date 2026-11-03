import { Article, Atom, ChartLineUp, Eye, Gauge, Lightning } from "@phosphor-icons/react";

// Omslag van een blogpost: een rustig bone vlak met een icoon dat bij het
// onderwerp past, en rechts een smalle indigo chevron als merkaccent. Vervangt
// de gegenereerde coverbeelden op de site; die blijven alleen als og:image.
const ICONS = {
  "core-web-vitals-uitgelegd": Gauge,
  "wcag-toegankelijkheid-website": Eye,
  "ssg-vs-ssr-razendsnel-website": Lightning,
  "wat-is-een-lighthouse-score": ChartLineUp,
  "waarom-wij-react-gebruiken": Atom,
};

/**
 * @param {{ slug: string, category: string }} post
 * @param {"lg"|"sm"} size - "sm" laat het categorielabel weg voor kleine thumbnails.
 */
export default function BlogCover({ post, size = "lg", className = "" }) {
  const Icon = ICONS[post.slug] || Article;
  const lg = size === "lg";

  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-bone ${className}`}>
      <span
        className="absolute inset-y-0 right-0 w-[22%] bg-brand"
        style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 45% 100%, 0 50%)" }}
      />
      <div className={`relative flex h-full flex-col justify-center ${lg ? "gap-3 px-[clamp(1.25rem,3vw,1.75rem)]" : "items-center pr-[22%]"}`}>
        <span
          className={`flex items-center justify-center rounded-full bg-ground text-brand shadow-soft ${
            lg ? "h-14 w-14" : "h-10 w-10"
          }`}
        >
          <Icon size={lg ? 28 : 20} />
        </span>
        {lg && <span className="text-[0.9375rem] font-semibold text-ink">{post.category}</span>}
      </div>
    </div>
  );
}
