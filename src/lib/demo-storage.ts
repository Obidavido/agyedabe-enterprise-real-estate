import { seedProperties } from "@/data/properties";
import type { Property } from "@/types/property";

export const DEMO_STORAGE_KEY = "agyedabe-enterprise-demo-properties-v1";

function cloneSeed(): Property[] {
  return seedProperties.map((property) => ({
    ...property,
    features: [...property.features],
    images: property.images.map((image) => ({ ...image })),
  }));
}

function isProperty(value: unknown): value is Property {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Property>;
  return typeof item.id === "string"
    && typeof item.slug === "string"
    && typeof item.title === "string"
    && typeof item.description === "string"
    && typeof item.location === "string"
    && typeof item.city === "string"
    && (item.listingType === "sale" || item.listingType === "rent")
    && (item.propertyType === "house" || item.propertyType === "apartment" || item.propertyType === "land" || item.propertyType === "commercial")
    && typeof item.price === "number"
    && Number.isFinite(item.price)
    && (item.currency === "GHS" || item.currency === "USD")
    && Array.isArray(item.features)
    && item.features.every((feature) => typeof feature === "string")
    && Array.isArray(item.images)
    && item.images.every((image) => !!image && typeof image.src === "string" && typeof image.alt === "string")
    && (item.status === "demo" || item.status === "available" || item.status === "draft" || item.status === "unavailable")
    && typeof item.featured === "boolean";
}

export function readDemoProperties(): Property[] {
  if (typeof window === "undefined") return cloneSeed();
  try {
    const stored = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (!stored) return cloneSeed();
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isProperty)) return cloneSeed();
    return parsed.map((property) => ({ ...property, features: [...property.features], images: property.images.map((image) => ({ ...image })) }));
  } catch {
    return cloneSeed();
  }
}

export function writeDemoProperties(properties: Property[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(properties));
    return true;
  } catch {
    return false;
  }
}

export function resetDemoProperties(): Property[] {
  if (typeof window !== "undefined") {
    try { window.localStorage.removeItem(DEMO_STORAGE_KEY); } catch { /* Browser storage can be unavailable. */ }
  }
  return cloneSeed();
}
