import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

// Initialen in plaats van portretfoto's: stockgezichten naast echte namen van
// opdrachtgevers lezen als nep, precies in de sectie die vertrouwen moet geven.
function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const { t } = useLanguage();
  const te = t.testimonials;

  return (
    <section id="reviews" className="band section">
      <div className="wrap">
        {/* Gecentreerd op desktop: twee even grote quotes eronder. */}
        <div className="max-w-3xl lg:mx-auto lg:text-center">
          <Heading parts={te.heading} />
          <p className="lead mt-4 max-w-[40rem] lg:mx-auto">{te.subheading}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {te.items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-card bg-ground p-[clamp(1.75rem,3vw,2.75rem)] shadow-soft"
            >
              <blockquote className="mb-8 text-pretty text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-light leading-[1.45] tracking-[-0.01em]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-[0.9375rem] font-bold tracking-wide text-white"
                >
                  {initials(item.name)}
                </span>
                <div className="min-w-0">
                  <span className="block font-bold">{item.name}</span>
                  <span className="block text-[0.9375rem] text-ink-soft">{item.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
