// Isometric projection helpers for the hero scene.
//
// World axes: x runs right-and-down the screen, y runs left-and-down, z is up.
// A true isometric camera puts both ground axes at 30 degrees from horizontal,
// which is where the 0.866 (cos 30) and 0.5 (sin 30) come from.

const COS30 = Math.cos(Math.PI / 6);

export function iso(x, y, z = 0) {
  return [(x - y) * COS30, (x + y) * 0.5 - z];
}

const pt = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`;

export const poly = points => points.map(p => pt(iso(...p))).join(" ");

/**
 * The three visible faces of an axis-aligned box.
 *
 * Only two side faces can ever face this camera — the ones at max x and max y —
 * so the other two are never generated.
 */
export function box({ x0, x1, y0, y1, z0, z1 }) {
  return {
    top: poly([
      [x0, y0, z1],
      [x1, y0, z1],
      [x1, y1, z1],
      [x0, y1, z1],
    ]),
    right: poly([
      [x1, y0, z1],
      [x1, y1, z1],
      [x1, y1, z0],
      [x1, y0, z0],
    ]),
    left: poly([
      [x0, y1, z1],
      [x1, y1, z1],
      [x1, y1, z0],
      [x0, y1, z0],
    ]),
  };
}

/**
 * A closed rounded-rectangle loop in the z plane, as world points.
 *
 * Sampled as an even polyline rather than emitted as arcs for two reasons: the
 * path feeds `offset-path`, where even sampling keeps the orbs at a constant
 * speed all the way round, and index i on one ring lines up with index i on a
 * wider or narrower one, which is what lets the rail be built from them.
 */
export function ring({ x0, x1, y0, y1, r, z, steps = 16 }) {
  const points = [];
  const arc = (cx, cy, from) => {
    for (let i = 0; i <= steps; i++) {
      const a = from + (Math.PI / 2) * (i / steps);
      points.push([cx + r * Math.cos(a), cy + r * Math.sin(a), z]);
    }
  };

  arc(x1 - r, y0 + r, -Math.PI / 2);
  arc(x1 - r, y1 - r, 0);
  arc(x0 + r, y1 - r, Math.PI / 2);
  arc(x0 + r, y0 + r, Math.PI);

  return points;
}

/** Widen or narrow a loop by `d`, keeping the corners concentric. */
export const offsetRing = (spec, d) => ({
  ...spec,
  x0: spec.x0 - d,
  x1: spec.x1 + d,
  y0: spec.y0 - d,
  y1: spec.y1 + d,
  r: spec.r + d,
});

export const pathFrom = points => `M${points.map(p => pt(iso(...p))).join("L")}Z`;

/** A closed band between two loops, for the rail's outer and inner walls. */
export const band = (top, bottom) =>
  poly2([...top, ...[...bottom].reverse()]);

const poly2 = points => points.map(p => pt(iso(...p))).join(" ");
