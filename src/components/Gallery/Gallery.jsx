import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const Gallery = ({ data }) => {
  if (!data) return null;
  console.log("data", data);
  return (
    <Card className="p-3 rounded-xl w-full max-w-3xl overflow-hidden bg-[#C9E0F2] lg:flex gap-3 hidden mb-5">
      <div className="flex flex-col gap-3">
        <div>
          {data.length > 0 && data[0]?.asset && (
            <Image
              src={urlFor(data[0]).url()}
              alt="image"
              width={397}
              height={177}
              className="rounded-t-lg"
            />
          )}
        </div>
        <div>
          {data.length > 1 && data[1]?.asset && (
            <Image
              src={urlFor(data[1]).url()}
              alt="image"
              width={397}
              height={276}
              className="rounded-b-lg"
            />
          )}
        </div>
      </div>
      <div>
        {data?.length > 2 && data[2]?.asset && (
          <Image
            src={urlFor(data[2]).url()}
            alt="image"
            width={825}
            height={400}
            className="rounded-lg"
          />
        )}
      </div>
    </Card>
  );
};

export default Gallery;
