/**
 * Renders one or more JSON-LD documents as <script type="application/ld+json">.
 * Escapes `<` to prevent XSS injection from user-controlled strings.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const docs = Array.isArray(data) ? data : [data];
  return (
    <>
      {docs.map((doc, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(doc).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
