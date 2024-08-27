import { defineField } from "sanity";

const homeSchema = {
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
  ],
};

export default homeSchema;
