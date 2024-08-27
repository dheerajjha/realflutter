import { groq } from "next-sanity";

export const getCategoryWithSubCategories = groq`*[_type == "category"]{
    _id,
    name,
    order,
    "subCategories": *[_type == "subCategory" && references(^._id)]{
      _id,
      name,
      tags,
      description,
      subcategoryImage,
      "currentSlug":slug.current,
      packagesCount
    }
  }`;

export const getSubcategoryPackages = groq`*[_type == "subCategory" && slug.current == $slug][0]{
  _id,
  name,
  description,
  category->{
    _id,
    name
  },
  subcategoryImage,
  packagesCount,
  "packages": *[_type == "package" && references(^._id)]{
    name,
    author,
    sortDescription,
    packageImage,
    platforms,
    likesCount,
    tutorialIncluded,
    "currentSlug":slug.current,
  }
}
`;

export const getPackage = groq`*[_type == "package" && slug.current == $slug][0]{
    name,
    author,
    sortDescription,
    gallery,
    packageImage,
    platforms,
    lastUpdate,
    likesCount,
    pubPoint,
    likes[]->{
        name
    },
    tutorialIncluded,
    tags,
    _createdAt,
    subCategories[]->{
        name,
        "category": category->{
            name,
            order
        }
    },
    description,
    example,
    tutorial,
      similarPackages[]->{
      name,
      packageImage,
      author,
      likesCount,
      "currentSlug":slug.current,
      subCategories[]->{
        "subcategorySlug":slug.current,
      }
    },
    dependentPackages[]->{
      name,
      packageImage,
      author,
      likesCount,
      "currentSlug":slug.current,
      subCategories[]->{
        "subcategorySlug":slug.current,
      }
    }
    }`;
