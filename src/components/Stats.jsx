import { motion, useReducedMotion } from "motion/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { chartData, keyStats } from "../data/stats";
import { fadeUp } from "../lib/motion";

const ACCENT = "#0B5FD8";
const MUTED = "#E2E9F2";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-rsm border border-line bg-bg px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-ink">{label}</p>
      <p className="text-ink-soft">{payload[0].value} sec laadtijd</p>
    </div>
  );
}

export default function Stats() {
  const reduceMotion = useReducedMotion();

  const summary = chartData
    .map((d) => `${d.label}: ${d.waarde} seconden laadtijd`)
    .join(". ");

  return (
    <section id="cijfers" className="bg-bg py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
              Snelheid die je merkt en Google waardeert
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              Een snelle site houdt bezoekers vast en scoort beter in
              zoekresultaten. Onze sites laden in een fractie van de tijd van een
              gemiddelde website. De cijfers hieronder zijn illustratief.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
              {keyStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-4xl font-bold tabular-nums tracking-tight text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-rmd border border-line bg-bg p-5 sm:p-6"
          >
            <p className="mb-4 text-sm font-medium text-ink-soft">
              Laadtijd in seconden (illustratief)
            </p>
            <figure
              role="img"
              aria-label={`Staafdiagram van laadtijd in seconden. ${summary}`}
            >
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid stroke={MUTED} vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "#3A4A60", fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: MUTED }}
                    />
                    <YAxis
                      unit="s"
                      tick={{ fill: "#3A4A60", fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      content={<ChartTooltip />}
                      cursor={{ fill: "rgba(11,95,216,0.06)" }}
                    />
                    <Bar
                      dataKey="waarde"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={88}
                      isAnimationActive={!reduceMotion}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.label}
                          fill={index === chartData.length - 1 ? ACCENT : MUTED}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <figcaption className="sr-only">{summary}.</figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
