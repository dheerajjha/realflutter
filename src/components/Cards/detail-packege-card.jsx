"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import dayjs from "dayjs";
import { platformImages } from "../../../public/assets";

const TruncatedText = ({ text, wordLimit = 15, isExpanded, setIsExpanded }) => {
  const words = text?.split(" ") || [];
  const shouldTruncate = words.length > wordLimit;

  const truncatedText = shouldTruncate
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p className="mt-3 text-sm font-medium text-heading">
      {isExpanded || !shouldTruncate ? text : truncatedText}
      {shouldTruncate && (
        <span
          onClick={toggleExpand}
          className="ml-1 cursor-pointer text-blue-500"
        >
          {isExpanded ? " Show less" : " Show more"}
        </span>
      )}
    </p>
  );
};

const DetailPackageCard = ({ data, categorySlug }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <Card className="flex w-full flex-col rounded-2xl md:flex-row">
        <div className="aspect-[5/4] lg:max-h-[275px] lg:max-w-[400px]">
          {data?.packageImage && (
            <Image
              src={urlFor(data?.packageImage).url()}
              alt="illustration"
              width={1180}
              height={900}
              onError={(e) => {
                e.target.src = "/assets/placeholder.png";
              }}
              className="aspect-[6/5] rounded-t-2xl object-cover md:rounded-l-2xl md:rounded-tr-none"
              style={{
                borderRadius: isExpanded ? "1rem" : "",
              }}
            />
          )}
        </div>
        <div className="flex w-full flex-col items-start p-3 md:flex-row">
          <div className="mt-3 flex w-full flex-col justify-between md:mt-0">
            <h3 className="flex w-full items-center justify-between text-lg font-medium text-heading">
              {data?.name}
              <span className="text-blueHeading md:hidden">
                ❤️{" "}
                {data?.likesCount > 1000
                  ? `${(data?.likesCount / 1000).toFixed(1)}k`
                  : data?.likesCount}
              </span>
            </h3>
            <Link
              href="#"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Image
                src="/assets/author.svg"
                width={13}
                height={13}
                alt="authoe"
              />{" "}
              {data?.author}
            </Link>
            <TruncatedText
              text={data?.shortDescription}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
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
            <p className="text-sm text-subheading">
              Last Updated: {dayjs(data?._updatedAt).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="mx-2 -mt-2 h-full overflow-hidden">
            <Separator className="my-5" orientation="vertical" />
          </div>
          <div className="flex w-full flex-col items-start justify-center text-center md:max-w-[150px] md:items-center">
            <div>
              <p className="hidden md:block">❤️</p>
              <p className="hidden font-medium text-blueHeading md:block">
                {data?.likesCount > 1000
                  ? `${(data?.likesCount / 1000).toFixed(1)}k`
                  : data?.likesCount}{" "}
                likes
              </p>
              <div className="my-2"></div>
              <div className="flex items-center gap-3 md:flex-col">
                {data?.tutorialIncluded && (
                  <>
                    {" "}
                    <p>🎓</p>
                    <p className="font-medium text-blueHeading">
                      Tutorial Included
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-3 w-full md:mt-5">
              <Link
                href={`/${categorySlug}/${data?.currentSlug}`}
                className={cn(
                  buttonVariants({ variant: "gradient" }),
                  "w-full px-8 lg:w-fit",
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
