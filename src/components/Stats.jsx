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

const ACCENT_BRIGHT = "#3B9EFF";
const GRID = "#FFFFFF1A";
const AXIS = "#FFFFFF99";
const BAR_MUTED = "#FFFFFF26";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-rsm border border-white/10 bg-panel px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-white">{label}</p>
      <p className="text-white/70">{payload[0].value} sec laadtijd</p>
    </div>
  );
}

export default function Stats() {
  const reduceMotion = useReducedMotion();

  const summary = chartData
    .map((d) => `${d.label}: ${d.waarde} seconden laadtijd`)
    .join(". ");

  return (
    <section id="cijfers" className="bg-ink py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Snelheid die je merkt en Google waardeert
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Een snelle site houdt bezoekers vast en scoort beter in
              zoekresultaten. Onze sites laden in een fractie van de tijd van een
              gemiddelde website. De cijfers hieronder zijn illustratief.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
              {keyStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-4xl font-bold tabular-nums tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-rlg border border-white/10 bg-white/5 p-4 sm:p-6"
          >
            <p className="mb-4 text-sm font-medium text-white/60">
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
                    <CartesianGrid stroke={GRID} vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: AXIS, fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: GRID }}
                    />
                    <YAxis
                      unit="s"
                      tick={{ fill: AXIS, fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      content={<ChartTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.06)" }}
                      contentStyle={{
                        background: "#0F2236",
                        border: "1px solid #FFFFFF1A",
                        color: "#fff",
                      }}
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
                          fill={
                            index === chartData.length - 1
                              ? ACCENT_BRIGHT
                              : BAR_MUTED
                          }
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
