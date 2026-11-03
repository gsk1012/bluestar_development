/**
 * Een lichte kop met precies één nadrukzinsnede. `parts` komt uit i18n: elk
 * oneven deel wordt vet en indigo (`.accent`), de rest blijft licht.
 *
 * @param {string[]} parts
 * @param {"h1"|"h2"|"h3"} as
 */
export default function Heading({ parts, as: Tag = "h2", className = "", ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="accent">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Tag>
  );
}
