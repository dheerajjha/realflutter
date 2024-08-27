import { defineField } from "sanity";

const subCategorySchema = {
  name: "subCategory",
  title: "Sub Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "subcategoryImage",
      title: "Subcategory Image",
      type: "image",
    }),
    defineField({
      name: "packagesCount",
      title: "Packages Count",
      type: "number",
      validation: (Rule) =>
        Rule.min(0).error("Packages count cannot be negative"),
    }),
  ],
};

export default subCategorySchema;
