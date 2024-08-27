import { defineField } from "sanity";

const packagesSchema = {
  name: "package",
  title: "Package",
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
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
    }),
    defineField({
      name: "packageImage",
      title: "Package Image",
      type: "image",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid", // Optional: Display images in a grid layout in the studio
      },
    }),
    defineField({
      name: "platforms",
      title: "Platforms",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "iOS", value: "ios" },
          { title: "Android", value: "android" },
          { title: "Web", value: "web" },
          { title: "Windows", value: "windows" },
          { title: "Linux", value: "linux" },
          { title: "Apple", value: "apple" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "lastUpdate",
      title: "Last Update",
      type: "datetime",
    }),
    defineField({
      name: "likesCount",
      title: "Likes Count",
      type: "number",
    }),
    defineField({
      name: "pubPoint",
      title: "Pub Point",
      type: "number",
    }),
    defineField({
      name: "tutorialIncluded",
      title: "Tutorial Included",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "subCategories",
      title: "Sub Category",
      type: "array",
      of: [{ type: "reference", to: [{ type: "subCategory" }] }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "markdown",
    }),
    defineField({
      name: "tutorial",
      title: "Tutorial",
      type: "markdown",
    }),
    defineField({
      name: "example",
      title: "Example",
      type: "markdown",
    }),
    defineField({
      name: "similarPackages",
      title: "Similar Packages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "package" }] }],
    }),
    defineField({
      name: "dependentPackages",
      title: "Dependent Packages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "package" }] }],
    }),
  ],
};

export default packagesSchema;
