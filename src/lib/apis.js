import sanityClient from "./sanity";
import * as queries from "./sanityQueries";

export const fetchCategoryWithSubCategories = async () => {
  const posts = await sanityClient.fetch(
    queries.getCategoryWithSubCategories,
    {},
    {
      cache: "no-cache",
    }
  );
  return posts;
};

export const fetchSubcategoryPackages = async (slug) => {
  const posts = await sanityClient.fetch(
    queries.getSubcategoryPackages,
    { slug },
    {
      cache: "no-cache",
    }
  );
  return posts;
};

export const fetchPackage = async (slug) => {
  const posts = await sanityClient.fetch(
    queries.getPackage,
    { slug },
    {
      cache: "no-cache",
    }
  );
  return posts;
};
