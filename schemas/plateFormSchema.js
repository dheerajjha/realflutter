import { defineField } from "sanity";

const plateFormSchema = {
  name: "plateform",
  title: "Plateform",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "plateFormImage",
      title: "Plateform Image",
      type: "image",
    }),
  ],
};

export default plateFormSchema;
