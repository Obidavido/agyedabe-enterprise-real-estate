"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPropertyPrice, getStatusLabel } from "@/lib/property-utils";
import type { Property, PropertyStatus } from "@/types/property";

type PropertyTableProps = {
  properties: Property[];
  onAdd: () => void;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
  onUpdate: (property: Property) => void;
  onReset: () => void;
};

export default function PropertyTable({ properties, onAdd, onEdit, onDelete, onUpdate, onReset }: PropertyTableProps) {
  const [query, setQuery] = useState("");
  const [listingFilter, setListingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return properties.filter((property) => {
      const matchesQuery = !normalized || `${property.title} ${property.location} ${property.reference} ${property.slug}`.toLocaleLowerCase().includes(normalized);
      const matchesListing = listingFilter === "all" || property.listingType === listingFilter;
      const matchesStatus = statusFilter === "all" || property.status === statusFilter;
      return matchesQuery && matchesListing && matchesStatus;
    });
  }, [properties, query, listingFilter, statusFilter]);

  return (
    <section className="admin-panel" aria-labelledby="properties-panel-title">
      <div className="admin-panel-heading"><div><p className="section-kicker">Catalogue management</p><h2 id="properties-panel-title">Properties <span className="admin-count">{properties.length}</span></h2><p>Manage this browser’s local demo records. Changes are not published to a live database.</p></div><button className="admin-button admin-button-primary" type="button" onClick={onAdd}><Plus size={15} /> Add Property</button></div>
      <div className="admin-table-controls">
        <label className="admin-search"><Search size={15} aria-hidden="true" /><input aria-label="Search properties" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, location or reference" /></label>
        <select className="admin-select" aria-label="Filter by listing type" value={listingFilter} onChange={(event) => setListingFilter(event.target.value)}><option value="all">Sale and rent</option><option value="sale">For sale</option><option value="rent">For rent</option></select>
        <select className="admin-select" aria-label="Filter by property status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="demo">Demo listing</option><option value="available">Availability to confirm</option><option value="draft">Draft</option><option value="unavailable">Unavailable</option></select>
        <button className="admin-button admin-button-reset" type="button" onClick={onReset}><RotateCcw size={14} /> Reset Demo Data</button>
      </div>
      <div className="admin-table-scroll">
        <table className="admin-property-table">
          <thead><tr><th scope="col">Property</th><th scope="col">Price</th><th scope="col">Listing</th><th scope="col">Status</th><th scope="col">Featured</th><th scope="col">Actions</th></tr></thead>
          <tbody>
            {filtered.map((property) => (
              <tr key={property.id}>
                <td><div className="admin-property-cell"><ImageWithFallback src={property.images[0]?.src ?? "/images/exterior-modern-home.jpg"} alt="" /><div><strong>{property.title}</strong><span>{property.location}</span><small>{property.reference}</small></div></div></td>
                <td><strong className="admin-price">{formatPropertyPrice(property)}</strong><small className="admin-muted">{property.currency}</small></td>
                <td><span className="admin-type-pill">{property.listingType === "sale" ? "Sale" : "Rent"}</span></td>
                <td><label className="sr-only" htmlFor={`status-${property.id}`}>Status for {property.title}</label><select id={`status-${property.id}`} className="admin-status-select" value={property.status} onChange={(event) => onUpdate({ ...property, status: event.target.value as PropertyStatus })}><option value="demo">Demo</option><option value="available">To confirm</option><option value="draft">Draft</option><option value="unavailable">Unavailable</option></select><small className="admin-status-help">{getStatusLabel(property.status)}</small></td>
                <td><label className="admin-featured-toggle"><input type="checkbox" checked={property.featured} onChange={(event) => onUpdate({ ...property, featured: event.target.checked })} /><span>{property.featured ? "Yes" : "No"}</span></label></td>
                <td><div className="admin-row-actions"><Link className="admin-icon-action" href={`/properties/${property.slug}`} aria-label={`View ${property.title} on public site`} title="View on public site"><ExternalLink size={15} /></Link><button className="admin-icon-action" type="button" onClick={() => onEdit(property)} aria-label={`Edit ${property.title}`} title="Edit"><Pencil size={15} /></button><button className="admin-icon-action admin-delete-action" type="button" onClick={() => onDelete(property)} aria-label={`Delete ${property.title}`} title="Delete"><Trash2 size={15} /></button></div></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td className="admin-empty-cell" colSpan={6}><strong>No properties match these filters.</strong><span>Try a different search, or add a new demo listing.</span><button className="admin-button admin-button-secondary" type="button" onClick={onAdd}><Plus size={14} /> Add Property</button></td></tr>}
          </tbody>
        </table>
      </div>
      <p className="admin-table-footnote">Showing {filtered.length} of {properties.length} browser-local demo properties · “Available” means availability still needs confirmation.</p>
    </section>
  );
}
