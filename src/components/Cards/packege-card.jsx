import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

const PackegeCard = ({
  title,
  description,
  imageLink,
  packagesCount,
  currentSlug,
}) => {
  return (
    <Card className="min-w-[270px] border-none space-y-3 p-5">
      <Link
        href={`/${currentSlug}`}
        // className="px-3 py-1 bg-[#62A5DA] rounded-full text-[16px] font-medium text-white"
        className="w-full"
      >
        {imageLink && (
          <div className="rounded-lg w-full aspect-[5/4]">
            <Image
              src={urlFor(imageLink).url()}
              alt="hero"
              width={1080}
              height={900}
              className="rounded-lg aspect-[5/4]"
            />
          </div>
        )}
        <div className="mt-5 space-y-1">
          <h3 className="text-heading text-[16px] font-medium">{title}</h3>
          <p className="text-subheading text-sm">{description}</p>
        </div>
        <div className="px-3 py-1 bg-[#62A5DA] rounded-full text-[16px] font-medium text-white mt-3">
          {packagesCount} packages
        </div>
      </Link>
    </Card>
  );
};

export default PackegeCard;
