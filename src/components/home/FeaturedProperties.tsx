"use client";

import PropertyCard from "@/components/properties/PropertyCard";
import { usePropertyStore } from "@/components/admin/PropertyStoreProvider";

export default function FeaturedProperties() {
  const { properties } = usePropertyStore();
  const featured = properties.filter((property) => property.featured && property.status !== "draft" && property.status !== "unavailable").slice(0, 4);
  if (featured.length === 0) return <p className="empty-featured">No featured demo properties are available right now. Browse all properties to see the current collection.</p>;
  return <div className="property-grid">{featured.map((property) => <PropertyCard key={property.id} property={property} />)}</div>;
}
