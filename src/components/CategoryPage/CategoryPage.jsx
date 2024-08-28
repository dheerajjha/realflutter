"use client";
import { Button } from "@/components/ui/button";
import { Filter, Search, X } from "lucide-react";
import Image from "next/image";
// import React, { useState } from "react";

import GradientText from "@/components/gradient-text";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import FilterSider from "@/components/FilterSider/FilterSider";
import DetailPackageCard from "@/components/Cards/detail-packege-card";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { getSubcategoryPackages } from "@/lib/sanityQueries";
import { fetchSubcategoryPackages } from "@/lib/apis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

const checkBoxItem = [
  {
    id: 1,
    name: "Android",
    slug: "android",
    icon: "/android.png",
  },
  {
    id: 2,
    name: "iOS",
    slug: "ios",
    icon: "/ios.png",
  },
  {
    id: 3,
    name: "MacOS",
    slug: "macos",
    icon: "/macos.png",
  },
  {
    id: 4,
    name: "Web",
    slug: "web",
    icon: "/web.png",
  },
  {
    id: 5,
    name: "Windows",
    slug: "windows",
    icon: "/windows.png",
  },
  {
    id: 6,
    name: "Linux",
    slug: "linux",
    icon: "/linux.png",
  },
];

function convertToTitleCase(str) {
  return (
    str
      .split("-" || "_")
      // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" ")
  ); // Join the words back together with a space
}

const CategoryPage = () => {
  const { category } = useParams();
  const [data, setData] = useState({});
  const [dataSource, setDataSource] = useState({});
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState(null);
  const [breadCrumbs, setBreadCrumbs] = useState([
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: convertToTitleCase(category),
      url: `#`,
    },
  ]);

  const getData = async () => {
    setLoading(true);
    const data = await fetchSubcategoryPackages(category);
    setLoading(false);
    setData(data);
    setPackages(data.packages);
    return data;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCheckChange = (e, name, slug) => {
    if (e) {
      setSelected([...selected, { label: name, value: slug }]);
    } else {
      setSelected(selected.filter((item) => item.value !== slug));
    }
  };

  useEffect(() => {
    if (data?.packages && Array.isArray(data.packages)) {
      let filteredData = data.packages;

      if (search) {
        filteredData = filteredData.filter((item) =>
          item?.name?.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (selected.length > 0) {
        filteredData = filteredData.filter((pack) => {
          const platforms = Array.isArray(pack?.platforms)
            ? pack.platforms
                .filter((platform) => typeof platform === "string")
                .map((platform) => platform.toLowerCase())
            : [];
          return selected.every((item) =>
            platforms.includes(item?.value?.toLowerCase()),
          );
        });
      }

      setPackages(filteredData);
    } else {
      setPackages([]);
    }
  }, [search, selected, data]);

  console.log("selected", packages);

  if (loading) return <Loader />;

  return (
    <div className="">
      <section className="relative flex w-full items-center justify-center overflow-hidden bg-[#122030] px-3 py-8 md:px-8 lg:py-8">
        <div className="relative z-10 w-full max-w-4xl">
          <form action="" className="relative w-full">
            <input
              type="text"
              className="w-full rounded-full border-none bg-[#1A2B3A] bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1)_0%,_rgba(255,_255,_255,_0.25)_50.3%,_rgba(255,_255,_255,_0.1)_100%)] p-[12px] pl-12 text-[16px] text-[#ffffff66] focus:outline-none"
              placeholder="Search packages here "
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
              size={18}
            />
            <Button
              variant="gradient"
              className="absolute right-1 top-1/2 -translate-y-1/2 transform px-8"
              type="submit"
            >
              Search
            </Button>
          </form>
        </div>
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={160}
          height={160}
          className="absolute -top-[54%] left-[8%] z-0 hidden rotate-90 transform lg:flex"
        />
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={160}
          height={160}
          className="absolute -bottom-[54%] right-[8%] z-0 hidden lg:flex"
        />
      </section>
      <div className="z-30 mx-auto w-full py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div className="mx-auto w-full max-w-6xl px-3 md:px-5 lg:px-0">
          <BreadCrumbs breadCrumbs={breadCrumbs} />
        </div>
      </div>
      <div className="mx-auto w-full bg-[#ECF4FB] py-3 shadow-[0_-2px_2px_rgba(0,0,0,0.1)]">
        {/* Name of the package */}
        <div className="mx-auto w-full max-w-6xl px-3 lg:px-0">
          <div className="w-full py-3 md:py-5 lg:p-0">
            <GradientText
              text={`All ${data?.name} Packages`}
              className="text-center text-[25px] font-medium lg:text-[32px]"
            />
            <p className="text-sm font-medium text-heading lg:text-[16px]">
              Find all the <GradientText text="top packages" /> to kickstart
              your Flutter app with {data?.name}.
            </p>
          </div>
        </div>

        {/* Showcase of the packages */}
        <div className="mx-auto mt-3 flex w-full max-w-6xl flex-col items-start gap-10 px-3 md:mt-7 md:px-5 lg:mt-10 lg:flex-row lg:px-0">
          <div className="w-full lg:flex-[1_1_25%]">
            <Button
              className="hidden items-center gap-2 lg:flex"
              variant="gradient"
            >
              <Filter size={18} />
              Filter
            </Button>
            <FilterSider
              checkBoxItem={checkBoxItem}
              selected={selected}
              setSelected={setSelected}
              handleCheckChange={handleCheckChange}
            />
            <div className="hidden lg:block">
              <Separator className="my-5" />
              <ul className="space-y-3">
                {checkBoxItem.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-start gap-2"
                  >
                    <Checkbox
                      className="mr-3"
                      onCheckedChange={(e) =>
                        handleCheckChange(e, item.name, item.slug)
                      }
                      checked={selected.some((i) => i.value === item.slug)}
                      name={item.slug}
                    />
                    {item.name}
                    <Image
                      src={`/assets/platform${item.icon}`}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full pb-10 lg:flex-[1_1_75%]">
            <div className="space-y-0 md:space-y-5">
              <div className="hidden h-14 items-center gap-5 lg:flex">
                <p className="whitespace-nowrap">{packages.length} Results</p>
                <div className="flex flex-wrap items-center gap-3">
                  {selected.length > 0 &&
                    selected.map((item) => (
                      <div
                        className="flex w-fit items-center gap-3 rounded-full border border-heading px-2 py-2 text-heading"
                        key={item.label}
                      >
                        <span>{item.label}</span> |{" "}
                        <X
                          size={18}
                          className="cursor-pointer"
                          onClick={() =>
                            handleCheckChange(false, item.label, item.value)
                          }
                        />
                      </div>
                    ))}
                  {selected.length > 0 && (
                    <div className="flex w-fit items-center gap-3 rounded-full border border-heading px-2 py-2 text-heading">
                      <span>Clear All</span> |{" "}
                      <X
                        size={18}
                        className="cursor-pointer"
                        onClick={() => setSelected([])}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-5">
                {packages.map((item, index) => {
                  return (
                    <DetailPackageCard
                      key={index}
                      data={item}
                      categorySlug={category}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
