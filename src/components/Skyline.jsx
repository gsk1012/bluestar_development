// Een Nederlandse grachtengevelrij in drie lagen, als SVG uit code. De lagen
// liggen achter elkaar zoals bergkammen: hoe verder weg, hoe dichter bij de
// kleur van de lucht. In de voorste twee lagen gaan ramen één voor één aan.
//
// Alles komt uit een vaste seed, zodat de voorgerenderde HTML en de browser
// exact dezelfde stad tekenen (geen hydratieverschil, geen verspringing).

const VIEW_W = 1440;
const VIEW_H = 560;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const between = (r, min, max) => min + r() * (max - min);

// Gevelkop boven de daklijn `top`, van links (x) naar rechts (x + w).
// Geeft de punten van links naar rechts terug, exclusief de twee hoeken.
function gable(type, x, w, top, g) {
  const cx = x + w / 2;
  switch (type) {
    case "trap": {
      // Trapgevel: drie treden aan elke kant, vlakke top.
      const step = w / 8;
      const rise = g / 4;
      const pts = [];
      for (let i = 0; i < 3; i++) {
        pts.push(`L${x + step * i} ${top - rise * (i + 1)}`, `L${x + step * (i + 1)} ${top - rise * (i + 1)}`);
      }
      pts.push(`L${x + step * 3} ${top - g}`, `L${x + w - step * 3} ${top - g}`);
      for (let i = 2; i >= 0; i--) {
        pts.push(`L${x + w - step * (i + 1)} ${top - rise * (i + 1)}`, `L${x + w - step * i} ${top - rise * (i + 1)}`);
      }
      return pts.join(" ");
    }
    case "hals": {
      // Halsgevel: schouders met een smalle hals en een klein fronton.
      const n = w * 0.22;
      return [
        `L${x + n * 0.6} ${top}`,
        `Q${x + n} ${top} ${x + n} ${top - g * 0.35}`,
        `L${cx - n} ${top - g * 0.75}`,
        `L${cx} ${top - g}`,
        `L${cx + n} ${top - g * 0.75}`,
        `L${x + w - n} ${top - g * 0.35}`,
        `Q${x + w - n} ${top} ${x + w - n * 0.6} ${top}`,
      ].join(" ");
    }
    case "klok": {
      // Klokgevel: een gebogen kop.
      return [
        `C${x} ${top - g * 0.5} ${x + w * 0.3} ${top - g * 0.45} ${x + w * 0.3} ${top - g * 0.85}`,
        `L${cx} ${top - g}`,
        `L${x + w * 0.7} ${top - g * 0.85}`,
        `C${x + w * 0.7} ${top - g * 0.45} ${x + w} ${top - g * 0.5} ${x + w} ${top}`,
      ].join(" ");
    }
    case "tuit":
      // Tuitgevel: een spitse driehoek.
      return `L${cx} ${top - g}`;
    default:
      // Lijstgevel: rechte daklijn met een kroonlijst.
      return `L${x - 3} ${top} L${x - 3} ${top - 6} L${x + w + 3} ${top - 6} L${x + w + 3} ${top}`;
  }
}

const TYPES = ["trap", "hals", "klok", "tuit", "lijst"];

// Opkomst bij het laden: elk pand rijst van onder op, als een golf vanuit het
// midden naar buiten; de achterste laag eerst. De ramen gaan pas aan als hun
// pand staat. Afgeleid van de positie, niet van de rng, zodat de stad zelf
// niet verandert.
const RISE_MS = 900;
const WAVE_MS = 520;

function riseDelay(layerDelay, x, w) {
  const fromCenter = Math.abs(x + w / 2 - VIEW_W / 2) / (VIEW_W / 2);
  return Math.round(layerDelay + Math.min(fromCenter, 1) * WAVE_MS);
}

function buildLayer({ seed, minH, maxH, minW, maxW, windows, delay: layerDelay }) {
  const r = rng(seed);
  const houses = [];
  let x = -between(r, 10, 40);

  while (x < VIEW_W + 20) {
    const w = between(r, minW, maxW);
    const h = between(r, minH, maxH);
    const g = between(r, w * 0.35, w * 0.6);
    const type = TYPES[Math.floor(r() * TYPES.length)];
    const top = VIEW_H - h;
    const rise = riseDelay(layerDelay, x, w);
    const lights = [];

    if (windows) {
      const cols = Math.max(2, Math.round(w / windows.pitch));
      const ww = windows.w;
      const wh = windows.h;
      const gap = (w - cols * ww) / (cols + 1);
      for (let row = 0; top + windows.rowH * (row + 1) < VIEW_H - windows.rowH * 0.6; row++) {
        for (let c = 0; c < cols; c++) {
          // Ongeveer de helft van de ramen gaat aan; de rest blijft donker.
          if (r() < windows.lit) {
            lights.push({
              x: x + gap + c * (ww + gap),
              y: top + windows.rowH * row + windows.rowH * 0.35,
              w: ww,
              h: wh,
              delay: rise + RISE_MS + Math.round(between(r, 0, 2200)),
            });
          }
        }
      }
    }

    houses.push({
      d: `M${x} ${VIEW_H} L${x} ${top} ${gable(type, x, w, top, g)} L${x + w} ${top} L${x + w} ${VIEW_H} Z`,
      rise,
      lights,
    });

    x += w + between(r, 0, 3);
  }

  return { houses };
}

const LAYERS = [
  { key: "far", seed: 11, delay: 0, minH: 250, maxH: 380, minW: 46, maxW: 86, color: "var(--skyline-far)", windows: null },
  {
    key: "mid",
    seed: 47,
    delay: 160,
    minH: 170,
    maxH: 280,
    minW: 62,
    maxW: 110,
    color: "var(--skyline-mid)",
    windows: { pitch: 24, w: 7, h: 11, rowH: 30, lit: 0.32 },
  },
  {
    key: "near",
    seed: 83,
    delay: 320,
    minH: 105,
    maxH: 190,
    minW: 84,
    maxW: 150,
    color: "var(--skyline-near)",
    windows: { pitch: 30, w: 10, h: 15, rowH: 38, lit: 0.42 },
  },
].map((layer) => ({ ...layer, ...buildLayer(layer) }));

export default function Skyline() {
  return (
    <div className="skyline" aria-hidden="true">
      {LAYERS.map((layer) => (
        <svg
          key={layer.key}
          className={`skyline__layer skyline__layer--${layer.key}`}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMax slice"
        >
          {layer.houses.map((house, i) => (
            <g key={i} className="skyline__house" style={{ animationDelay: `${house.rise}ms` }}>
              <path d={house.d} fill={layer.color} />
              {house.lights.map((l, j) => (
                <rect
                  key={j}
                  className="skyline__window"
                  x={l.x}
                  y={l.y}
                  width={l.w}
                  height={l.h}
                  style={{ animationDelay: `${l.delay}ms` }}
                />
              ))}
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
