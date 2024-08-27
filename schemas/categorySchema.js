import { defineField } from "sanity";

const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
};

export default categorySchema;
