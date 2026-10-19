"use client";

import { FormEvent, useState } from "react";
import type { Currency, ListingType, Property, PropertyStatus, PropertyType } from "@/types/property";

type PropertyEditorProps = {
  properties: Property[];
  initial?: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
};

type DraftForm = {
  title: string; slug: string; description: string; location: string; city: string;
  listingType: ListingType; propertyType: PropertyType; price: string; currency: Currency;
  secondaryPrice: string; bedrooms: string; bathrooms: string; parkingSpaces: string;
  area: string; features: string; images: string; status: PropertyStatus;
  featured: boolean; reference: string; negotiability: string; verificationNote: string;
};

function slugify(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function makeDraft(property?: Property | null): DraftForm {
  if (!property) return {
    title: "", slug: "", description: "", location: "", city: "Accra", listingType: "sale", propertyType: "house",
    price: "", currency: "GHS", secondaryPrice: "", bedrooms: "0", bathrooms: "0", parkingSpaces: "0", area: "",
    features: "", images: "", status: "demo", featured: false, reference: "", negotiability: "", verificationNote: "",
  };
  return {
    title: property.title, slug: property.slug, description: property.description, location: property.location, city: property.city,
    listingType: property.listingType, propertyType: property.propertyType, price: String(property.price), currency: property.currency,
    secondaryPrice: property.secondaryPrice === undefined ? "" : String(property.secondaryPrice), bedrooms: String(property.bedrooms),
    bathrooms: String(property.bathrooms), parkingSpaces: String(property.parkingSpaces), area: String(property.area),
    features: property.features.join("\n"), images: property.images.map((image) => image.src).join("\n"),
    status: property.status, featured: property.featured, reference: property.reference,
    negotiability: property.negotiability ?? "", verificationNote: property.verificationNote ?? "",
  };
}

export default function PropertyEditor({ properties, initial, onSave, onCancel }: PropertyEditorProps) {
  const [draft, setDraft] = useState<DraftForm>(() => makeDraft(initial));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [error, setError] = useState("");

  function change<K extends keyof DraftForm>(key: K, value: DraftForm[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!event.currentTarget.reportValidity()) return;
    const slug = slugify(draft.slug || draft.title);
    const conflict = properties.some((property) => property.slug.toLocaleLowerCase() === slug && property.id !== initial?.id);
    if (conflict) {
      setError("That slug is already used. Choose a unique property slug.");
      return;
    }
    const title = draft.title.trim();
    const imageLines = draft.images.split(/\n+/).map((item) => item.trim()).filter(Boolean);
    const images = imageLines.map((src) => ({ src, alt: `Illustrative demo image for ${title}` }));
    const id = initial?.id ?? `prop-demo-${Date.now().toString(36)}`;
    const reference = draft.reference.trim() || initial?.reference || `AGE-DEMO-${Date.now().toString().slice(-6)}`;
    const nextProperty: Property = {
      id,
      slug,
      title,
      description: draft.description.trim(),
      location: draft.location.trim(),
      city: draft.city.trim(),
      listingType: draft.listingType,
      propertyType: draft.propertyType,
      price: Number(draft.price),
      currency: draft.currency,
      ...(draft.secondaryPrice.trim() ? { secondaryPrice: Number(draft.secondaryPrice) } : {}),
      bedrooms: Number(draft.bedrooms),
      bathrooms: Number(draft.bathrooms),
      parkingSpaces: Number(draft.parkingSpaces),
      area: Number(draft.area || 0),
      features: draft.features.split(/\n+/).map((item) => item.trim()).filter(Boolean),
      images,
      status: draft.status,
      featured: draft.featured,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
      reference,
      ...(draft.negotiability.trim() ? { negotiability: draft.negotiability.trim() } : {}),
      ...(draft.verificationNote.trim() ? { verificationNote: draft.verificationNote.trim() } : {}),
    };
    onSave(nextProperty);
  }

  const textField = (label: string, key: keyof DraftForm, required = false, type = "text", placeholder = "") => (
    <label className="admin-field" key={key}><span>{label}{required && <b aria-hidden="true"> *</b>}</span><input className="field-control" type={type} value={String(draft[key])} required={required} min={type === "number" ? "0" : undefined} onChange={(event) => {
      const value = event.target.value;
      if (key === "title") {
        setDraft((current) => ({ ...current, title: value, slug: slugTouched ? current.slug : slugify(value) }));
      } else {
        change(key, value as DraftForm[typeof key]);
      }
    }} placeholder={placeholder} /></label>
  );

  return (
    <form className="admin-editor" onSubmit={submit}>
      <div className="admin-editor-heading"><div><p className="section-kicker">{initial ? "Update listing" : "New listing"}</p><h2>{initial ? "Edit property" : "Add a property"}</h2></div><span className="admin-demo-tag">DEMO DATA</span></div>
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      <div className="admin-form-grid">
        {textField("Property title", "title", true, "text", "e.g. Two-bedroom apartment in Accra")}
        <label className="admin-field"><span>Slug <b aria-hidden="true">*</b></span><input className="field-control" value={draft.slug} required onChange={(event) => { setSlugTouched(true); change("slug", event.target.value); }} placeholder="property-title-location" /><small>Unique lowercase URL path.</small></label>
        {textField("Location", "location", true, "text", "Neighbourhood, City, Ghana")}
        {textField("City", "city", true, "text", "Accra")}
        <label className="admin-field"><span>Listing type <b aria-hidden="true">*</b></span><select className="field-control" value={draft.listingType} onChange={(event) => change("listingType", event.target.value as ListingType)}><option value="sale">For sale</option><option value="rent">For rent</option></select></label>
        <label className="admin-field"><span>Property type <b aria-hidden="true">*</b></span><select className="field-control" value={draft.propertyType} onChange={(event) => change("propertyType", event.target.value as PropertyType)}><option value="house">House</option><option value="apartment">Apartment</option><option value="land">Land</option><option value="commercial">Commercial</option></select></label>
        {textField("Price", "price", true, "number", "0")}
        <label className="admin-field"><span>Currency <b aria-hidden="true">*</b></span><select className="field-control" value={draft.currency} onChange={(event) => change("currency", event.target.value as Currency)}><option value="GHS">GHS (Ghanaian cedi)</option><option value="USD">USD (US dollar)</option></select></label>
        {textField("Secondary GHS display (optional)", "secondaryPrice", false, "number", "Leave blank if not supplied")}
        {textField("Bedrooms", "bedrooms", true, "number", "0")}
        {textField("Bathrooms", "bathrooms", true, "number", "0")}
        {textField("Parking spaces", "parkingSpaces", true, "number", "0")}
        {textField("Area in m²", "area", true, "number", "0")}
        {textField("Property reference", "reference", false, "text", "Auto-generated when blank")}
        {textField("Negotiability (optional)", "negotiability", false, "text", "e.g. Slightly negotiable")}
        <label className="admin-field"><span>Status <b aria-hidden="true">*</b></span><select className="field-control" value={draft.status} onChange={(event) => change("status", event.target.value as PropertyStatus)}><option value="demo">Demo listing</option><option value="available">Availability to confirm</option><option value="draft">Draft</option><option value="unavailable">Unavailable</option></select></label>
        <label className="admin-field admin-field-wide"><span>Description <b aria-hidden="true">*</b></span><textarea className="field-control" rows={4} required value={draft.description} onChange={(event) => change("description", event.target.value)} /></label>
        <label className="admin-field"><span>Features (one per line)</span><textarea className="field-control" rows={5} value={draft.features} onChange={(event) => change("features", event.target.value)} placeholder="Fitted kitchen&#10;Secure parking" /></label>
        <label className="admin-field"><span>Image URLs (one per line)</span><textarea className="field-control" rows={5} value={draft.images} onChange={(event) => change("images", event.target.value)} placeholder="/images/exterior-modern-home.jpg" /><small>Use local asset paths or full image URLs. Empty uses the local fallback.</small></label>
        <label className="admin-field admin-field-wide"><span>Verification note (optional)</span><textarea className="field-control" rows={2} value={draft.verificationNote} onChange={(event) => change("verificationNote", event.target.value)} /></label>
        <label className="admin-checkbox"><input type="checkbox" checked={draft.featured} onChange={(event) => change("featured", event.target.checked)} /><span>Feature this demo property on the public homepage</span></label>
      </div>
      <div className="admin-editor-actions"><button className="admin-button admin-button-primary" type="submit">{initial ? "Save changes" : "Add demo property"}</button><button className="admin-button admin-button-secondary" type="button" onClick={onCancel}>Cancel</button></div>
      <p className="admin-editor-note">Changes persist only in localStorage in this browser. They are not shared across devices or saved to a production database.</p>
    </form>
  );
}
