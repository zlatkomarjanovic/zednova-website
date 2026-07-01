import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings"];

const GROUPED_TYPES = [
  "service",
  "subService",
  "serviceMegaMenuCard",
  "customSoftware",
  "migration",
  "industryParent",
  "industry",
  "portfolioProject",
  "caseStudy",
  "testimonial",
  "post",
  "insightCategory",
  "tag",
  "author",
  "product",
  "faq",
];

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

      S.listItem()
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("service"),
              S.documentTypeListItem("subService").title("Sub services"),
              S.documentTypeListItem("serviceMegaMenuCard"),
              S.documentTypeListItem("customSoftware"),
              S.documentTypeListItem("migration"),
            ]),
        ),

      S.listItem()
        .title("Industries")
        .child(
          S.list()
            .title("Industries")
            .items([
              S.documentTypeListItem("industryParent"),
              S.documentTypeListItem("industry"),
            ]),
        ),

      S.listItem()
        .title("Work")
        .child(
          S.list()
            .title("Work")
            .items([
              S.documentTypeListItem("portfolioProject"),
              S.documentTypeListItem("caseStudy"),
              S.documentTypeListItem("testimonial"),
            ]),
        ),

      S.listItem()
        .title("Insights")
        .child(
          S.list()
            .title("Insights")
            .items([
              S.documentTypeListItem("post"),
              S.documentTypeListItem("insightCategory"),
              S.documentTypeListItem("tag"),
              S.documentTypeListItem("author"),
            ]),
        ),

      S.listItem()
        .title("Resources")
        .child(S.documentTypeList("product")),

      S.listItem()
        .title("FAQ")
        .child(S.documentTypeList("faq")),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETONS.includes(item.getId() ?? "") &&
          !GROUPED_TYPES.includes(item.getId() ?? ""),
      ),
    ]);
