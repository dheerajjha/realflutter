import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SimilarPackage = ({ data, title }) => {
  if (!data?.length) return null;
  return (
    <div className="w-full">
      <h2 className="text-heading text-[20px] font-medium">{title}</h2>
      <div className="flex flex-col gap-5 mt-5 w-full">
        {data?.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SimilarPackage;

const Card = ({ post }) => {
  return (
    <Link
      href={`/${post?.subCategories[0]?.subcategorySlug}/${post?.currentSlug}`}
      className="flex bg-white rounded-lg w-full"
      key={post._id} // Ensure unique key here
    >
      {post?.packageImage && (
        <Image
          src={urlFor(post?.packageImage).url()}
          alt="illustration"
          width={96}
          height={84}
          className="rounded-l-lg"
        />
      )}
      <div className="p-3 space-y-2 w-full overflow-hidden">
        <div className="text-heading text-[14px] font-medium flex justify-between items-center gap-3">
          {post?.name}{" "}
          <span className="whitespace-nowrap">
            ❤️{" "}
            {post?.likesCount > 1000
              ? `${(post?.likesCount / 1000).toFixed(1)}k`
              : post?.likesCount}
          </span>
        </div>
        <p className="text-subheading text-sm">{post?.author}</p>
      </div>
    </Link>
  );
};
