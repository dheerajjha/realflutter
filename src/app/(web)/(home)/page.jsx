"use client";
import PackegeCard from "@/components/Cards/packege-card";
import GradientText from "@/components/gradient-text";
import Hero from "@/components/Hero/Hero";
import { fetchCategoryWithSubCategories } from "@/lib/apis";
import React, { useEffect, useState } from "react";
import analytics from "@/lib/analytics/service";

function filterByTagAndDescription(dataSource, search) {
  return dataSource.subCategories.filter((subCategory) => {
    const matchesTags =
      subCategory.tags &&
      subCategory.tags.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesDescription =
      subCategory.description &&
      subCategory.description.toLowerCase().includes(search.toLowerCase());
    return matchesTags || matchesDescription;
  });
}

const HomePage = () => {
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetchCategoryWithSubCategories();
      data.sort((a, b) => a.order - b.order);
      setData(data);
      setDataSource(data);
      analytics.pageView('home_page');
    })();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    if (value) {
      analytics.search(value, 'home_search');
    }
  };

  useEffect(() => {
    if (search === "") {
      setData(dataSource);
    } else {
      let filteredData = dataSource.map((item) => {
        return {
          ...item,
          subCategories: filterByTagAndDescription(item, search),
        };
      });
      setData(filteredData);
    }
  }, [search]);

  return (
    <div className="bg-[#ECF4FB] w-full pb-8">
      <Hero search={search} setSearch={handleSearch} />
      <div className="w-full flex flex-col items-center justify-center mt-5">
        <div className="p-3 md:p-5 lg:p-0 w-full text-center">
          <GradientText
            text="Discover Flutters Best Packages"
            className="text-[30px] lg:text-[40px] font-medium text-center"
          />
          <p className="text-heading font-medium text-sm lg:text-[16px]">
            Access <GradientText text="40,000+" /> packages, categorised &
            enhanced with the latest Flutter advancements to boost your project
          </p>
        </div>

        <div className="mt-8 w-full max-w-6xl space-y-10 lg:space-y-10 p-3 md:p-5 lg:p-0">
          {data.map((item, index) => {
            return (
              <Showcase
                title={item?.name}
                order={item?.order}
                data={item?.subCategories}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const Showcase = ({ title, data, order }) => {
  if (data.length <= 0) return null;
  return (
    <div id={order}>
      <div className="space-y-0 lg:space-y-5 hidden lg:block">
        <p className="text-[25px] font-medium text-heading">{title}</p>
        <div className="grid grid-cols-4 gap-5">
          {data?.map((item, index) => {
            return (
              <PackegeCard
                key={index}
                title={item?.name}
                description={item?.description}
                imageLink={item?.subcategoryImage}
                packagesCount={item?.packagesCount}
                currentSlug={item?.currentSlug}
              />
            );
          })}
        </div>
      </div>
      <div className="space-y-5 lg:space-y-5 block lg:hidden">
        <p className="text-[20px] font-medium text-heading">{title}</p>
        <div className="flex items-center gap-5 w-full overflow-x-scroll">
          {data?.map((item, index) => {
            return (
              <PackegeCard
                key={index}
                title={item?.name}
                description={item?.description}
                imageLink={item?.subcategoryImage}
                packagesCount={item?.packagesCount}
                currentSlug={item?.currentSlug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
