export type ListingType = "sale" | "rent";
export type PropertyType = "house" | "apartment" | "land" | "commercial";
export type PropertyStatus = "demo" | "available" | "draft" | "unavailable";
export type Currency = "GHS" | "USD";

export type PropertyImage = {
  src: string;
  alt: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  city: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: number;
  currency: Currency;
  secondaryPrice?: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  area: number;
  features: string[];
  images: PropertyImage[];
  status: PropertyStatus;
  featured: boolean;
  createdAt: string;
  reference: string;
  negotiability?: string;
  verificationNote?: string;
};
