import ArticalTabs from "@/components/ArticalTabs/ArticalTabs";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import Gallery from "@/components/Gallery/Gallery";
import SimilarPackage from "@/components/SimilarPackage/SimilarPackage";
import { Card } from "@/components/ui/card";
import { fetchPackage, getPosts } from "@/lib/apis";
import { urlFor } from "@/lib/sanity";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { platformImages } from "../../../../../../public/assets";

export async function generateMetadata({ params }) {
  const data = await fetchPackage(params.slug);
  return {
    title: `${data?.name}`,
    description: `${data?.sortDescription}`,
    image: data?.packageImage && urlFor(data?.packageImage).url(),
    openGraph: {
      images: [
        {
          url: data?.packageImage && urlFor(data?.packageImage).url(),
        },
      ],
    },
  };
}

function convertToTitleCase(str) {
  return (
    str
      .split("-" || "_")
      // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" ")
  ); // Join the words back together with a space
}

const page = async ({ params }) => {
  const { slug } = params;
  const data = await fetchPackage(slug);
  console.log(data);
  const tags = data?.tags?.join(" ");
  const plateforms = data?.platforms.map((item) => item?.name).join(" ");
  const breadCrumbs = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: convertToTitleCase(params.category),
      url: `/${params.category}`,
    },
    {
      id: 3,
      name: convertToTitleCase(params.slug),
      url: `#`,
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.1)] z-30 border-t-2">
        <div className="w-full max-w-6xl mx-auto px-3 md:px-5 lg:px-0">
          <BreadCrumbs breadCrumbs={breadCrumbs} />
        </div>
      </div>
      <section className="w-full bg-[#122030] flex items-center justify-center px-3 md:px-8 py-8 lg:py-8 relative overflow-hidden">
        <div className="max-w-6xl w-full relative z-10">
          <h2 className="text-white text-lg font-semibold">{data?.name}</h2>
          <div className="flex items-center flex-wrap gap-5 mt-5">
            <div className="px-6 py-2 bg-[#3A6285] text-white rounded-full flex items-center gap-2">
              <span>✍️</span> {data?.author}
            </div>
            <span className="px-6 py-2 bg-[#3A6285] text-white rounded-full flex items-center gap-2">
              <span>❤️</span>
              {data?.likesCount > 1000
                ? `${(data?.likesCount / 1000).toFixed(1)}k`
                : data?.likesCount}{" "}
              likes
            </span>
            {data?.tutorialIncluded && (
              <div className="px-6 py-2 bg-[#3A6285] text-white rounded-full flex items-center gap-2">
                <span>🎓</span> Tutorial Included
              </div>
            )}
          </div>

          <div className="my-4">
            <p className="text-white text-lg font-medium">
              {data?.sortDescription}
            </p>
          </div>
          <div className="my-3 lg:hidden">
            <ul className="flex items-center gap-3">
              {data?.platforms?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <Image
                    src={platformImages[item]}
                    alt={item}
                    width={30}
                    height={30}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="my-2">
            <p className="text-muted-foreground text-md">
              Last Updated: {dayjs(data?.lastUpdate).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={160}
          height={160}
          className="absolute hidden lg:flex -top-[14%] left-[68%] transform rotate-90 z-0"
        />
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={160}
          height={160}
          className="absolute hidden lg:flex -bottom-[14%] right-[10%] z-0"
        />
      </section>
      <div className="w-full py-10 bg-[#ECF4FB]">
        <div className="max-w-6xl mx-auto px-3 md:px-5 lg:px-0">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className="w-full max-w-3xl">
              {data?.gallery && <Gallery data={data?.gallery} />}
              <Card className="p-3 rounded-xl w-full max-w-3xl overflow-hidden">
                <ArticalTabs body={data} />
              </Card>
            </div>
            <div className="w-full lg:max-w-xs">
              <Card className="p-5 rounded-xl space-y-5 max-w-xs hidden md:block">
                <p className="flex items-center">
                  <span className="min-w-[130px]">Category</span>
                  <span>: {data?.subCategories[0]?.category?.name}</span>
                </p>
                <p className="flex items-center">
                  <span className="min-w-[130px]"> Published</span>
                  <span>: {dayjs(data?._createdAt).format("DD MMM YYYY")}</span>
                </p>
                <p className="flex">
                  <span className="min-w-[130px]">Plateforms</span>
                  <span>: {plateforms}</span>
                </p>
                <p className="flex items-center">
                  <span className="min-w-[130px]">Publisher</span>
                  <span>: {data?.author}</span>
                </p>
                <p className="flex">
                  <span className="min-w-[130px]">Pub Points</span>
                  <span>: {data?.pubPoint}</span>
                </p>
                <p className="flex ">
                  <span className="min-w-[130px]">Tags</span>
                  <span>: {tags}</span>
                </p>
              </Card>
              <div className="mt-10 w-full">
                <SimilarPackage
                  data={data?.similarPackages}
                  title="Similar Packages"
                />
              </div>
              <div className="mt-10">
                <SimilarPackage
                  data={data?.dependentPackages}
                  title="Dependent Packages"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
