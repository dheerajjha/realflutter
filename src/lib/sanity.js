import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET,
  apiVersion: "2023-05-03",
  useCdn: true,
});

export default sanityClient;

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
