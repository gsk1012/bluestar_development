import { Check, Clock, CloudCheck } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import { sendIntent } from "../lib/intent";
import Heading from "./Heading";

/**
 * Drie pakketten naast elkaar, met de website op maat in het midden als
 * indigo hoofdvlak. De prijs staat op een label in de chevronvorm van het
 * merk. Hosting en extra's staan in één rustige strook eronder.
 *
 * De bedragen komen uit public/pricing.md; houd die twee gelijk.
 */
function PriceTag({ plan, from, featured }) {
  return (
    <div
      className={`inline-flex flex-wrap items-baseline gap-x-2 py-3 pl-5 pr-10 ${
        featured ? "bg-white text-brand" : "bg-bone text-ink"
      }`}
      style={{ clipPath: "polygon(0 0, calc(100% - 1.25rem) 0, 100% 50%, calc(100% - 1.25rem) 100%, 0 100%)" }}
    >
      {plan.from && <span className="text-[0.9375rem] font-semibold opacity-80">{from}</span>}
      <span
        className={`tabular whitespace-nowrap leading-none tracking-[-0.02em] ${
          plan.from ? "text-[2.5rem] font-bold" : "text-[1.625rem] font-bold"
        }`}
      >
        {plan.price}
      </span>
      <span className="text-[0.9375rem] opacity-80">{plan.unit}</span>
    </div>
  );
}

export default function Pricing() {
  const { t } = useLanguage();
  const pr = t.pricing;

  return (
    <section id="prijzen" className="band section">
      <div className="band__lanes" aria-hidden="true">
        <span className="band__lane band__lane--one" />
      </div>

      <div className="wrap relative">
        {/* Gecentreerd: de drie pakketten eronder staan symmetrisch om het middelste. */}
        <div className="mx-auto max-w-[56rem] text-center">
          <Heading parts={pr.heading} />
          <p className="lead mx-auto mt-5 max-w-[54rem]">{pr.subheading}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {pr.plans.map((plan) => {
            const featured = !!plan.featured;
            return (
              <article
                key={plan.key}
                className={`flex flex-col rounded-card p-[clamp(1.75rem,3vw,2.5rem)] ${
                  featured
                    ? "bg-brand text-white shadow-lift lg:-my-5 lg:py-[calc(clamp(1.75rem,3vw,2.5rem)+1.25rem)]"
                    : "bg-ground shadow-soft"
                } ${featured ? "max-lg:order-first" : ""}`}
              >
                <h3 className="text-[1.5rem] font-bold tracking-[-0.015em]">{plan.title}</h3>
                <p className={`mt-1.5 text-[0.9375rem] ${featured ? "text-white/85" : "text-ink-soft"}`}>{plan.suits}</p>

                <div className="mt-6">
                  <PriceTag plan={plan} from={pr.from} featured={featured} />
                </div>

                <p className={`mt-4 inline-flex items-center gap-2 text-[0.9375rem] ${featured ? "text-white/90" : "text-ink-soft"}`}>
                  <Clock size={18} aria-hidden="true" />
                  <span>
                    <span className="sr-only">{pr.termLabel}: </span>
                    {plan.term}
                  </span>
                </p>

                <ul className={`mb-8 mt-6 flex flex-col gap-2.5 border-t pt-6 text-[0.9375rem] ${featured ? "border-white/25" : "border-line"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        weight="bold"
                        aria-hidden="true"
                        className={`mt-1 shrink-0 ${featured ? "text-white" : "text-brand"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  onClick={() => sendIntent(`${pr.intentMessage}: ${plan.title}.`)}
                  className={`btn mt-auto w-full ${
                    featured
                      ? "btn-light"
                      : "border border-brand text-brand hover:bg-brand hover:text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-card bg-ground p-[clamp(1.5rem,3vw,2.25rem)] shadow-soft md:grid-cols-[1.4fr_1fr] md:items-center md:gap-10">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-inner bg-bone text-brand">
              <CloudCheck size={24} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold">{pr.hostingTitle}</h3>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">{pr.hostingBody}</p>
            </div>
          </div>
          <div className="md:border-l md:border-line md:pl-10">
            <p className="text-[0.9375rem] font-semibold">{pr.extrasTitle}</p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {pr.extras.map((extra) => (
                <li key={extra} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-semibold">
                  {extra}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 text-[0.9375rem] text-ink-soft">{pr.vatNote}</p>
      </div>
    </section>
  );
}
