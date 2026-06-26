import type { ImplementationRow } from "@/lib/types";

export function ArticleImplementationTable({
  rows,
  caption = "Implementation summary",
}: {
  rows: ImplementationRow[];
  caption?: string;
}) {
  if (!rows.length) return null;

  return (
    <figure className="my-10 overflow-x-auto">
      <figcaption className="zn-label mb-4 text-zn-text-3">{caption}</figcaption>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zn-border bg-zn-bg-2/50">
            <th scope="col" className="px-4 py-3 font-medium text-zn-text">
              Fix
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-zn-text">
              Problem
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-zn-text">
              What to change
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-zn-text">
              Metric affected
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-zn-text">
              Tool or platform
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.fix} className="border-b border-zn-border align-top">
              <td className="px-4 py-3 font-medium text-zn-text">{row.fix}</td>
              <td className="px-4 py-3 text-zn-text-2">{row.problem}</td>
              <td className="px-4 py-3 text-zn-text-2">{row.change}</td>
              <td className="px-4 py-3 text-zn-text-2">{row.metric}</td>
              <td className="px-4 py-3 text-zn-text-2">{row.tool}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
