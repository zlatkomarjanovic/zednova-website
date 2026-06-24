import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? ""),
      ),
    ]);
