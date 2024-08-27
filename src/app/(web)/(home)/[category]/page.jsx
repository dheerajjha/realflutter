import CategoryPage from "@/components/CategoryPage/CategoryPage";
import { fetchSubcategoryPackages } from "@/lib/apis";
import { urlFor } from "@/lib/sanity";
import React from "react";

export async function generateMetadata({ params }) {
  const data = await fetchSubcategoryPackages(params.category);
  return {
    title: `${data?.name}`,
    description: `${data?.description}`,
    image: data?.subcategoryImage && urlFor(data?.subcategoryImage).url(),
    openGraph: {
      images: [
        {
          url: data?.subcategoryImage && urlFor(data?.subcategoryImage).url(),
        },
      ],
    },
  };
}

const page = () => {
  return <CategoryPage />;
};

export default page;
