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
    icon: "/apple.png",
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
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (selected.length > 0) {
        filteredData = filteredData.filter((pack) => {
          const platforms =
            pack.platforms?.map((platform) => platform.name?.toLowerCase()) ||
            [];
          return selected.every((item) =>
            platforms.includes(item.value.toLowerCase())
          );
        });
      }

      setPackages(filteredData);
    } else {
      setPackages([]);
    }
  }, [search, selected]);

  if (loading) return <Loader />;

  return (
    <div className="">
      <section className="w-full bg-[#122030] flex items-center justify-center px-3 md:px-8 py-8 lg:py-8 relative overflow-hidden">
        <div className="max-w-4xl w-full relative  z-10">
          <form action="" className="w-full relative">
            <input
              type="text"
              className="p-[12px] rounded-full text-[#ffffff66] w-full pl-12 text-[16px] bg-[#1A2B3A] border-none focus:outline-none bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1)_0%,_rgba(255,_255,_255,_0.25)_50.3%,_rgba(255,_255,_255,_0.1)_100%)]"
              placeholder="Search packages here "
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Search
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Button
              variant="gradient"
              className="absolute top-1/2 right-1 transform -translate-y-1/2 px-8"
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
          className="absolute hidden lg:flex -top-[54%] left-[8%] transform rotate-90 z-0"
        />
        <Image
          src="/assets/leaf.png"
          alt="leaf"
          width={160}
          height={160}
          className="absolute hidden lg:flex -bottom-[54%] right-[8%] z-0"
        />
      </section>
      <div className="w-full mx-auto py-3 shadow-[0px_4px_4px_rgba(0,0,0,0.1)] z-30">
        <div className="w-full max-w-6xl mx-auto px-3 md:px-5 lg:px-0">
          <BreadCrumbs breadCrumbs={breadCrumbs} />
        </div>
      </div>
      <div className="w-full mx-auto py-3 bg-[#ECF4FB] shadow-[0_-2px_2px_rgba(0,0,0,0.1)]">
        {/* Name of the package */}
        <div className="max-w-6xl w-full mx-auto px-3 lg:px-0">
          <div className="py-3 md:py-5 lg:p-0 w-full">
            <GradientText
              text={`All ${data?.name} Packages`}
              className="text-[25px] lg:text-[32px] font-medium text-center"
            />
            <p className="text-heading font-medium text-sm lg:text-[16px]">
              Find all the <GradientText text="top packages" /> to kickstart
              your Flutter app with {data?.name}.
            </p>
          </div>
        </div>

        {/* Showcase of the packages */}
        <div className="w-full max-w-6xl mx-auto mt-3 md:mt-7 lg:mt-10 flex flex-col lg:flex-row items-start gap-10 px-3 md:px-5 lg:px-0">
          <div className="w-full lg:flex-[1_1_25%]">
            <Button
              className="items-center gap-2 hidden lg:flex"
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
                      src={`/assets${item.icon}`}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:flex-[1_1_75%] pb-10">
            <div className="space-y-0 md:space-y-5">
              <div className=" items-center gap-5 h-14 hidden lg:flex">
                <p className="whitespace-nowrap">{packages.length} Results</p>
                <div className="flex items-center flex-wrap gap-3">
                  {selected.length > 0 &&
                    selected.map((item) => (
                      <div
                        className="flex items-center gap-3 border-heading border rounded-full w-fit py-2 px-2 text-heading"
                        key={item.label}
                      >
                        <span>{item.label}</span> |{" "}
                        <X
                          size={18}
                          className=" cursor-pointer"
                          onClick={() =>
                            handleCheckChange(false, item.label, item.value)
                          }
                        />
                      </div>
                    ))}
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
