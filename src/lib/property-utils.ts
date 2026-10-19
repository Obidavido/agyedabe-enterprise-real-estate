import type { Property, PropertyStatus } from "@/types/property";

export function formatMoney(amount: number, currency: Property["currency"]): string {
  if (currency === "GHS") {
    return `GH₵${new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 }).format(amount)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPropertyPrice(property: Property): string {
  const cadence = property.listingType === "rent" ? " / month" : "";
  return `${formatMoney(property.price, property.currency)}${cadence}`;
}

export function formatSecondaryPrice(property: Property): string | null {
  if (property.secondaryPrice === undefined) return null;
  return formatMoney(property.secondaryPrice, "GHS");
}

export function getStatusLabel(status: PropertyStatus): string {
  switch (status) {
    case "available": return "Availability to confirm";
    case "draft": return "Draft demo";
    case "unavailable": return "Unavailable";
    default: return "Demo listing";
  }
}

export function formatPropertyType(type: Property["propertyType"]): string {
  const names: Record<Property["propertyType"], string> = {
    house: "House",
    apartment: "Apartment",
    land: "Land",
    commercial: "Commercial",
  };
  return names[type];
}
