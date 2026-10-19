"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bath, BedDouble, MapPin, CarFront, Ruler } from "lucide-react";
import { usePropertyStore } from "@/components/admin/PropertyStoreProvider";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyGallery from "@/components/properties/PropertyGallery";
import { BUSINESS, whatsappEnquiry } from "@/lib/contact";
import { formatPropertyPrice, formatPropertyType, formatSecondaryPrice, getStatusLabel } from "@/lib/property-utils";

export default function PropertyDetailClient({ slug }: { slug: string }) {
  const { properties, loaded } = usePropertyStore();
  const property = properties.find((item) => item.slug === slug && item.status !== "draft" && item.status !== "unavailable");

  if (!loaded) {
    return <main className="detail-page"><div className="section-inner loading-state" role="status">Loading property details…</div></main>;
  }

  if (!property) {
    return (
      <main className="detail-page">
        <div className="section-inner">
          <section className="placeholder-card property-not-found" aria-labelledby="property-not-found-title">
            <span className="section-kicker">Property not found</span>
            <h1 id="property-not-found-title">This property isn’t available in the demo collection.</h1>
            <p>The link may be out of date, or the listing may be in draft or unavailable status. Explore the public collection for current demo examples.</p>
            <Link className="button-primary" href="/properties">Back to properties</Link>
          </section>
        </div>
      </main>
    );
  }

  const message = `Hello AGYEDABE ENTERPRISE, I am interested in ${property.title}. Please share more information and viewing availability.`;
  const similar = properties.filter((item) => item.id !== property.id && item.status !== "draft" && item.status !== "unavailable" && item.propertyType === property.propertyType).slice(0, 3);
  const secondaryPrice = formatSecondaryPrice(property);

  return (
    <main className="detail-page">
      <div className="section-inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/properties">Properties</Link><span>/</span><span aria-current="page">{property.title}</span></nav>
        <div className="detail-topline"><Link className="back-link" href="/properties"><ArrowLeft size={15} /> Back to properties</Link><span className="demo-note">{getStatusLabel(property.status)}</span></div>
        <PropertyGallery images={property.images} title={property.title} />
        <div className="detail-layout">
          <article className="detail-main-content">
            <p className="section-kicker">For {property.listingType === "sale" ? "sale" : "rent"} · {formatPropertyType(property.propertyType)}</p>
            <h1 className="detail-title">{property.title}</h1>
            <p className="detail-location"><MapPin size={16} />{property.location}</p>
            <div className="detail-price-block"><p className="detail-price">{formatPropertyPrice(property)}</p>{secondaryPrice && <p className="detail-secondary-price">Secondary display: {secondaryPrice}</p>}{property.negotiability && <p className="detail-secondary-price">{property.negotiability}</p>}</div>
            <p className="detail-description">{property.description}</p>
            {property.verificationNote && <p className="verification-note"><strong>Note for verification:</strong> {property.verificationNote}</p>}
            <section className="detail-facts" aria-label="Property facts">
              <div><BedDouble size={17} /><strong>{property.bedrooms || "—"}</strong><span>Bedrooms</span></div>
              <div><Bath size={17} /><strong>{property.bathrooms || "—"}</strong><span>Bathrooms</span></div>
              <div><CarFront size={17} /><strong>{property.parkingSpaces || "—"}</strong><span>Parking spaces</span></div>
              <div><Ruler size={17} /><strong>{property.area ? `${property.area} m²` : "—"}</strong><span>Approx. area</span></div>
            </section>
            <section className="detail-features" aria-labelledby="features-title"><h2 id="features-title">Features and amenities</h2><ul>{property.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
            <p className="reference-note">Property reference: <strong>{property.reference}</strong>. All listings and images on this site are demo content; please confirm details and availability directly.</p>
          </article>
          <aside className="enquiry-card" aria-labelledby="enquiry-title">
            <p className="section-kicker">Start a conversation</p><h2 id="enquiry-title">Interested in this property?</h2><p>Send an enquiry to ask for more information and viewing availability. This does not book a viewing.</p>
            <a className="button-primary enquiry-whatsapp" href={whatsappEnquiry(message)} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={15} /></a>
            <a className="enquiry-contact" href={BUSINESS.callsTel}>Call {BUSINESS.callsDisplay} (calls only)</a>
            <a className="enquiry-contact" href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Property enquiry: ${property.title}`)}`}>Email the team</a>
            <Link className="enquiry-contact" href={`/contact?propertyReference=${encodeURIComponent(property.reference)}`}>Use the enquiry form</Link>
            <small>Demo content · availability and property information to be confirmed.</small>
          </aside>
        </div>
        {similar.length > 0 && <section className="similar-properties" aria-labelledby="similar-title"><div className="section-head"><div><p className="section-kicker">Keep exploring</p><h2 className="section-heading" id="similar-title">Similar property types</h2></div><Link className="text-link" href="/properties">View all <ArrowUpRight size={15} /></Link></div><div className="property-grid">{similar.map((item) => <PropertyCard key={item.id} property={item} />)}</div></section>}
      </div>
    </main>
  );
}
