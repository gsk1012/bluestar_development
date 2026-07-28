import { useReducedMotion } from "motion/react";
import { band, box, iso, offsetRing, pathFrom, poly, ring } from "../lib/iso";

// Ground slabs the scene sits on. Deliberately unequal in size and height —
// matching footprints read as a symmetrical plus rather than as a place.
const SLABS = [
  { x0: -8, x1: 80, y0: 4, y1: 92, z0: -18, z1: 0 },
  { x0: 92, x1: 204, y0: -18, y1: 70, z0: -18, z1: 12 },
  { x0: 4, x1: 80, y0: 104, y1: 200, z0: -18, z1: 5 },
];

// The lit block in the middle: the site the traffic is heading for.
const PEDESTAL = { x0: 96, x1: 172, y0: 92, y1: 168, z0: -18, z1: 30 };
const SCREEN = { x0: 104, x1: 164, y0: 100, y1: 160, z0: 30, z1: 35 };

// Laid on the screen's top face so the lit block reads as a page rather than as
// an abstract blue diamond: a header bar, two lines of copy, and a button.
const UI = [
  { x0: 109, x1: 159, y0: 105, y1: 112, o: 0.85 },
  { x0: 109, x1: 147, y0: 120, y1: 126, o: 0.5 },
  { x0: 109, x1: 138, y0: 131, y1: 137, o: 0.5 },
  { x0: 109, x1: 130, y0: 145, y1: 154, o: 1 },
].map(u => ({
  points: poly([
    [u.x0, u.y0, SCREEN.z1],
    [u.x1, u.y0, SCREEN.z1],
    [u.x1, u.y1, SCREEN.z1],
    [u.x0, u.y1, SCREEN.z1],
  ]),
  o: u.o,
}));

// Isometric has no depth buffer: whatever is drawn last wins. Sorting by the
// far corner puts nearer boxes on top, which is what makes them overlap
// correctly.
const BOXES = [...SLABS, PEDESTAL].sort((a, b) => a.x1 + a.y1 - (b.x1 + b.y1));

// The rail. Built from three concentric loops so it has real width and a wall
// underneath — a hairline path leaves the orbs looking like they travel over
// nothing.
const RAIL = { x0: -26, x1: 214, y0: -26, y1: 214, r: 62, z: 74 };
const RAIL_W = 11;
const RAIL_T = 7;

const OUTER = ring(offsetRing(RAIL, RAIL_W));
const INNER = ring(offsetRing(RAIL, -RAIL_W));
const OUTER_LOW = ring({ ...offsetRing(RAIL, RAIL_W), z: RAIL.z - RAIL_T });
const INNER_LOW = ring({ ...offsetRing(RAIL, -RAIL_W), z: RAIL.z - RAIL_T });

// Two subpaths with evenodd fill gives the ring between them.
const BELT_D = `${pathFrom(OUTER)} ${pathFrom(INNER)}`;

// Ridges across the belt, every few samples, so the rail reads as a conveyor
// rather than as a flat ribbon.
const RIDGES = OUTER.map((o, i) => [o, INNER[i]]).filter((_, i) => i % 2 === 0);

// Orbs ride slightly above the belt surface so they sit on it, not in it.
const ORB_D = pathFrom(ring({ ...RAIL, z: RAIL.z + 5 }));

const ORB_COUNT = 7;
const ORB_SECONDS = 16;

/**
 * The hero's focal object: an isometric platform carrying the site, with orbs
 * of light travelling an endless loop around it — visitors arriving.
 *
 * Built as SVG rather than rendered or generated footage. That buys three
 * things this scene specifically needs: the loop closes perfectly because the
 * orbs run a closed path at constant speed, the blues are the brand's exact
 * values, and it is transparent, so there is no background to mask away.
 *
 * The orbs ride a CSS `offset-path`, which is a compositor transform — seven of
 * them cost nothing per frame.
 */
export default function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 z-0 w-[min(104vw,430px)] -translate-x-1/2 translate-y-[40%] sm:left-auto sm:right-0 sm:top-1/2 sm:w-[min(72vw,540px)] sm:-translate-y-1/2 sm:translate-x-[2%] lg:w-[min(50vw,740px)] lg:translate-x-[-4%] [@media(orientation:landscape)_and_(max-height:600px)]:w-[min(52vh,340px)]"
    >
      {/* Pre-rasterised brand glow behind the lit block */}
      <div className="absolute inset-[26%] rounded-full bg-accent/25 blur-[70px] sm:bg-accent/30 sm:blur-[110px]" />

      <div className="scene-float relative">
        <svg viewBox="-215 -120 430 360" className="w-full overflow-visible">
          <defs>
            <linearGradient id="slab-top" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#1E4E80" />
              <stop offset="100%" stopColor="#102B49" />
            </linearGradient>
            <linearGradient id="screen-top" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#3B9EFF" />
              <stop offset="100%" stopColor="#0B5FD8" />
            </linearGradient>
            <linearGradient id="belt" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#1D4E7E" />
              <stop offset="100%" stopColor="#0E2B49" />
            </linearGradient>
            <radialGradient id="orb">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#8CCBFF" />
              <stop offset="100%" stopColor="#0B5FD8" />
            </radialGradient>
          </defs>

          {/* Ground slabs and the pedestal, back to front */}
          {BOXES.map((b, i) => {
            const f = box(b);
            return (
              <g key={i}>
                <polygon points={f.left} fill="#08172A" />
                <polygon points={f.right} fill="#0C2340" />
                <polygon points={f.top} fill="url(#slab-top)" />
                <polygon
                  points={f.top}
                  fill="none"
                  stroke="#3B9EFF"
                  strokeOpacity="0.28"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}

          {/* The site itself, sitting on the pedestal */}
          {(() => {
            const f = box(SCREEN);
            return (
              <g>
                <polygon points={f.left} fill="#0B5FD8" />
                <polygon points={f.right} fill="#1B78F0" />
                <polygon points={f.top} fill="url(#screen-top)" />
                {UI.map((u, i) => (
                  <polygon key={i} points={u.points} fill="#FFFFFF" opacity={u.o} />
                ))}
                <polygon
                  points={f.top}
                  fill="none"
                  stroke="#9FD4FF"
                  strokeOpacity="0.8"
                  strokeWidth="0.9"
                />
              </g>
            );
          })()}

          {/* The rail: walls first, then the belt surface on top of them —
              a wall always hangs below its own belt edge on screen, so this
              order needs no per-segment depth sorting. */}
          <polygon points={band(INNER, INNER_LOW)} fill="#071426" />
          <polygon points={band(OUTER, OUTER_LOW)} fill="#0B2038" />
          <path d={BELT_D} fillRule="evenodd" fill="url(#belt)" />
          {RIDGES.map(([o, i2], i) => (
            <line
              key={i}
              x1={iso(...o)[0]}
              y1={iso(...o)[1]}
              x2={iso(...i2)[0]}
              y2={iso(...i2)[1]}
              stroke="#3B9EFF"
              strokeOpacity="0.18"
              strokeWidth="0.7"
            />
          ))}
          <path
            d={BELT_D}
            fillRule="evenodd"
            fill="none"
            stroke="#5FB0FF"
            strokeOpacity="0.45"
            strokeWidth="0.9"
          />

          {/* Orbs. Reduced motion parks them evenly around the loop instead of
              letting the global duration override stack them all at 100%. */}
          {Array.from({ length: ORB_COUNT }, (_, i) => (
            <g
              key={i}
              className={reduce ? undefined : "scene-orb"}
              style={{
                offsetPath: `path("${ORB_D}")`,
                offsetRotate: "0deg",
                ...(reduce
                  ? { offsetDistance: `${(i * 100) / ORB_COUNT}%` }
                  : { animationDelay: `${(-i * ORB_SECONDS) / ORB_COUNT}s` }),
              }}
            >
              <circle r="9" fill="#3B9EFF" opacity="0.22" />
              <circle r="4.6" fill="url(#orb)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
