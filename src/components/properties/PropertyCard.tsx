import Link from "next/link";
import { BedDouble, Bath, MapPin, MoveUpRight } from "lucide-react";
import type { Property } from "@/types/property";
import { formatPropertyPrice, formatPropertyType, formatSecondaryPrice, getStatusLabel } from "@/lib/property-utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

type PropertyCardProps = { property: Property };

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0];
  const secondaryPrice = formatSecondaryPrice(property);
  return (
    <article className="property-card">
      <Link className="property-card-link" href={`/properties/${property.slug}`} aria-label={`View details for ${property.title}`}>
        <div className="property-image">
          <ImageWithFallback src={mainImage?.src ?? "/images/exterior-modern-home.jpg"} alt={mainImage?.alt ?? `Illustrative image for ${property.title}`} />
          <div className="property-badges">
            <span className="pill pill-gold">For {property.listingType === "sale" ? "Sale" : "Rent"}</span>
            <span className="pill">{getStatusLabel(property.status)}</span>
          </div>
        </div>
        <div className="property-info">
          <p className="property-location"><MapPin size={12} aria-hidden="true" />{property.location}</p>
          <h3 className="property-title">{property.title}</h3>
          <p className="property-price">
            {formatPropertyPrice(property)}
            {secondaryPrice && <small>{secondaryPrice} indicative secondary display</small>}
          </p>
          <div className="property-meta">
            <span><BedDouble size={13} aria-hidden="true" /> {property.bedrooms || "—"} beds</span>
            <span><Bath size={13} aria-hidden="true" /> {property.bathrooms || "—"} baths</span>
            <span>{formatPropertyType(property.propertyType)}</span>
            <MoveUpRight size={15} aria-hidden="true" />
          </div>
          <span className="text-link" style={{ marginTop: 12 }}>
            View Details <MoveUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
