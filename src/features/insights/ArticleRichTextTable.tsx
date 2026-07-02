const TABLE_CLASS =
  "w-full min-w-[480px] border-collapse border border-zn-border text-left text-sm";

export function ArticleRichTextTable({
  caption,
  hasHeaderRow = true,
  rows,
}: {
  caption?: string;
  hasHeaderRow?: boolean;
  rows: string[][];
}) {
  if (!rows.length) return null;

  const [headerRow, ...bodyRows] = hasHeaderRow ? rows : [[], ...rows];
  const dataRows = hasHeaderRow ? bodyRows : rows;

  return (
    <figure className="my-8 overflow-x-auto">
      {caption ? (
        <figcaption className="zn-label mb-3 text-zn-text-3">{caption}</figcaption>
      ) : null}
      <table className={TABLE_CLASS}>
        {hasHeaderRow && headerRow.length > 0 ? (
          <thead>
            <tr className="border-b border-zn-border bg-zn-bg-2/60">
              {headerRow.map((cell, index) => (
                <th
                  key={`${cell}-${index}`}
                  scope="col"
                  className="border-r border-zn-border px-4 py-3 font-medium text-zn-text last:border-r-0"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-zn-border last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="border-r border-zn-border px-4 py-3 align-top text-zn-text-2 last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
