import type { Currency, ListingType, Property, PropertyType } from "@/types/property";

export type PropertySort = "newest" | "price-asc" | "price-desc";
export type PropertyFilters = {
  q: string;
  location: string;
  listingType: ListingType | "all";
  propertyType: PropertyType | "all";
  currency: Currency | "all";
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  sort: PropertySort;
};

export const defaultPropertyFilters: PropertyFilters = {
  q: "",
  location: "",
  listingType: "all",
  propertyType: "all",
  currency: "all",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  sort: "newest",
};

const validListingTypes: ListingType[] = ["sale", "rent"];
const validPropertyTypes: PropertyType[] = ["house", "apartment", "land", "commercial"];
const validCurrencies: Currency[] = ["GHS", "USD"];
const validSorts: PropertySort[] = ["newest", "price-asc", "price-desc"];

export function parsePropertyFilters(params: URLSearchParams): PropertyFilters {
  const listingType = params.get("listingType") as ListingType | null;
  const propertyType = params.get("propertyType") as PropertyType | null;
  const currency = params.get("currency") as Currency | null;
  const sort = params.get("sort") as PropertySort | null;
  return {
    q: params.get("q") ?? "",
    location: params.get("location") ?? "",
    listingType: listingType && validListingTypes.includes(listingType) ? listingType : "all",
    propertyType: propertyType && validPropertyTypes.includes(propertyType) ? propertyType : "all",
    currency: currency && validCurrencies.includes(currency) ? currency : "all",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    bedrooms: params.get("bedrooms") ?? "",
    sort: sort && validSorts.includes(sort) ? sort : "newest",
  };
}

export function serializePropertyFilters(filters: PropertyFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.location) params.set("location", filters.location);
  if (filters.listingType !== "all") params.set("listingType", filters.listingType);
  if (filters.propertyType !== "all") params.set("propertyType", filters.propertyType);
  if (filters.currency !== "all") params.set("currency", filters.currency);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  return params;
}

export function filterAndSortProperties(properties: Property[], filters: PropertyFilters): Property[] {
  const query = filters.q.trim().toLocaleLowerCase();
  const min = filters.minPrice === "" ? null : Number(filters.minPrice);
  const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);
  const minBeds = filters.bedrooms === "" ? null : Number(filters.bedrooms);

  const matching = properties.filter((property) => {
    if (property.status === "draft" || property.status === "unavailable") return false;
    if (query) {
      const searchable = `${property.title} ${property.location} ${property.city} ${property.description} ${property.reference}`.toLocaleLowerCase();
      if (!searchable.includes(query)) return false;
    }
    if (filters.location && property.location !== filters.location) return false;
    if (filters.listingType !== "all" && property.listingType !== filters.listingType) return false;
    if (filters.propertyType !== "all" && property.propertyType !== filters.propertyType) return false;
    if (filters.currency !== "all" && property.currency !== filters.currency) return false;
    if (min !== null && Number.isFinite(min) && property.price < min) return false;
    if (max !== null && Number.isFinite(max) && property.price > max) return false;
    if (minBeds !== null && Number.isFinite(minBeds) && property.bedrooms < minBeds) return false;
    return true;
  });

  return matching.sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
