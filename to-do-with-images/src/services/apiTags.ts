import { endpoints } from "./endpoints";

const extractEndpointKeyword = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 2] : parts[0];
};

const endpointValues = Object.values(endpoints);
export const tagTypes = endpointValues.map(extractEndpointKeyword) as string[];

export type Tag = (typeof tagTypes)[number];

// A utility function to determine the tag based on the URL
export const determineTag = (url: string): Tag => {
  const endpointKeyword = extractEndpointKeyword(url.split("?")[0]);
  if (tagTypes.includes(endpointKeyword)) {
    return endpointKeyword as Tag;
  }
  return "defaultTag";
  // throw new Error(`No tag found for URL: ${url}`);
};
