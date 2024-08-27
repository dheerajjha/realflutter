"use client";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import dayjs from "dayjs";
import { platformImages } from "../../../public/assets";

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

const DetailPackageCard = ({ data, categorySlug }) => {
  console.log("plateform", data?.platforms);
  return (
    <div>
      <Card className="w-full rounded-2xl flex flex-col md:flex-row">
        <div className="aspect-[5/4] lg:max-w-[400px] lg:max-h-[275px]">
          {data?.packageImage && (
            <Image
              src={urlFor(data?.packageImage).url()}
              alt="illustration"
              width={1180}
              height={900}
              onError={(e) => {
                e.target.src = "/assets/placeholder.png";
              }}
              className="rounded-t-2xl aspect-[6/5] md:rounded-l-2xl md:rounded-tr-none object-cover"
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row items-start p-3 w-full">
          <div className="flex flex-col justify-between mt-3 md:mt-0 w-full">
            <h3 className="text-heading text-lg font-medium flex items-center justify-between w-full">
              {data?.name}
              <span className="md:hidden text-blueHeading">
                ❤️{" "}
                {data?.likesCount > 1000
                  ? `${(data?.likesCount / 1000).toFixed(1)}k`
                  : data?.likesCount}
              </span>
            </h3>
            <Link href="#" className="text-muted-foreground text-sm">
              {data?.author}
            </Link>
            <p className="text-heading text-sm font-medium mt-3 ">
              {data?.sortDescription}
            </p>
            <div className="my-3">
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
            <p className="text-subheading text-sm">
              Last Updated: {dayjs(data?._updatedAt).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="h-full overflow-hidden mx-2 -mt-2">
            <Separator className="my-5" orientation="vertical" />
          </div>
          <div className="w-full md:max-w-[150px] flex flex-col items-start md:items-center justify-center text-center">
            <div>
              <p className="hidden md:block">❤️</p>
              <p className="text-blueHeading font-medium hidden md:block">
                {data?.likesCount > 1000
                  ? `${(data?.likesCount / 1000).toFixed(1)}k`
                  : data?.likesCount}
              </p>
              <div className="my-2"></div>
              <div className="flex md:flex-col items-center gap-3">
                {data?.tutorialIncluded && (
                  <>
                    {" "}
                    <p>🎓</p>
                    <p className="text-blueHeading font-medium">
                      Tutorial Included
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-3 md:mt-5 w-full">
              <Link
                href={`/${categorySlug}/${data?.currentSlug}`}
                className={cn(
                  buttonVariants({ variant: "gradient" }),
                  "px-6 w-full"
                )}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetailPackageCard;
