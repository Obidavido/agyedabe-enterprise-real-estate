"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Grid2X2, List, Search, X } from "lucide-react";
import PropertyCard from "@/components/properties/PropertyCard";
import { usePropertyStore } from "@/components/admin/PropertyStoreProvider";
import {
  defaultPropertyFilters,
  filterAndSortProperties,
  parsePropertyFilters,
  serializePropertyFilters,
  type PropertyFilters,
} from "@/lib/property-search";

const PAGE_SIZE = 6;

export default function PropertyBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const { properties } = usePropertyStore();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [filters, setFilters] = useState<PropertyFilters>(() => parsePropertyFilters(new URLSearchParams(queryString)));
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const locations = useMemo(() => Array.from(new Set(properties.map((property) => property.location))).sort(), [properties]);

  useEffect(() => {
    setFilters(parsePropertyFilters(new URLSearchParams(queryString)));
  }, [queryString]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const filtered = useMemo(() => filterAndSortProperties(properties, filters), [properties, filters]);
  const visible = filtered.slice(0, visibleCount);
  const update = (key: keyof PropertyFilters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = serializePropertyFilters(filters).toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    setFilters(defaultPropertyFilters);
    router.push(pathname, { scroll: false });
  }

  function removeFilter(key: keyof PropertyFilters) {
    const next = { ...filters, [key]: key === "listingType" || key === "propertyType" || key === "currency" ? "all" : key === "sort" ? "newest" : "" } as PropertyFilters;
    setFilters(next);
    const query = serializePropertyFilters(next).toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const activeFilters: { key: keyof PropertyFilters; label: string }[] = [];
  if (filters.q) activeFilters.push({ key: "q", label: `Search: ${filters.q}` });
  if (filters.location) activeFilters.push({ key: "location", label: filters.location });
  if (filters.listingType !== "all") activeFilters.push({ key: "listingType", label: filters.listingType === "sale" ? "For sale" : "For rent" });
  if (filters.propertyType !== "all") activeFilters.push({ key: "propertyType", label: filters.propertyType });
  if (filters.currency !== "all") activeFilters.push({ key: "currency", label: filters.currency === "GHS" ? "Ghanaian cedis" : "US dollars" });
  if (filters.minPrice) activeFilters.push({ key: "minPrice", label: `Min ${filters.minPrice}` });
  if (filters.maxPrice) activeFilters.push({ key: "maxPrice", label: `Max ${filters.maxPrice}` });
  if (filters.bedrooms) activeFilters.push({ key: "bedrooms", label: `${filters.bedrooms}+ bedrooms` });

  return (
    <div className="property-browser">
      <form className="filter-panel" onSubmit={applyFilters}>
        <div className="filter-fields">
          <label className="filter-field filter-search">
            <span className="field-label">Search properties</span>
            <input className="field-control" type="search" value={filters.q} onChange={(event) => update("q", event.target.value)} placeholder="Title, reference or keyword" />
          </label>
          <label className="filter-field">
            <span className="field-label">Location</span>
            <select className="field-control" value={filters.location} onChange={(event) => update("location", event.target.value)}>
              <option value="">Any location</option>
              {locations.map((location) => <option key={location} value={location}>{location}</option>)}
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Listing type</span>
            <select className="field-control" value={filters.listingType} onChange={(event) => update("listingType", event.target.value)}>
              <option value="all">Sale or rent</option><option value="sale">For sale</option><option value="rent">For rent</option>
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Property type</span>
            <select className="field-control" value={filters.propertyType} onChange={(event) => update("propertyType", event.target.value)}>
              <option value="all">Any property type</option><option value="house">House</option><option value="apartment">Apartment</option><option value="land">Land</option><option value="commercial">Commercial</option>
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Currency</span>
            <select className="field-control" value={filters.currency} onChange={(event) => update("currency", event.target.value)}>
              <option value="all">All currencies</option><option value="GHS">Ghanaian cedis</option><option value="USD">US dollars</option>
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Min price</span>
            <input className="field-control" type="number" min="0" value={filters.minPrice} onChange={(event) => update("minPrice", event.target.value)} placeholder="No minimum" />
          </label>
          <label className="filter-field">
            <span className="field-label">Max price</span>
            <input className="field-control" type="number" min="0" value={filters.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} placeholder="No maximum" />
          </label>
          <label className="filter-field">
            <span className="field-label">Bedrooms</span>
            <select className="field-control" value={filters.bedrooms} onChange={(event) => update("bedrooms", event.target.value)}>
              <option value="">Any</option><option value="1">1+ bedrooms</option><option value="2">2+ bedrooms</option><option value="3">3+ bedrooms</option><option value="4">4+ bedrooms</option>
            </select>
          </label>
        </div>
        <div className="filter-actions">
          <button className="button-primary" type="submit"><Search size={15} aria-hidden="true" /> Apply filters</button>
          <button className="clear-filters" type="button" onClick={clearFilters}>Clear all filters</button>
        </div>
      </form>

      <div className="results-toolbar">
        <div>
          <p className="results-count"><strong>{filtered.length}</strong> {filtered.length === 1 ? "property" : "properties"} match your search</p>
          {activeFilters.length > 0 && (
            <div className="active-filters" aria-label="Active filters">
              {activeFilters.map(({ key, label }) => <button className="filter-chip" type="button" key={key} onClick={() => removeFilter(key)}>{label}<X size={12} aria-hidden="true" /></button>)}
            </div>
          )}
        </div>
        <div className="results-options">
          <label className="sort-control"><span className="field-label">Sort by</span>
            <select className="field-control" value={filters.sort} onChange={(event) => update("sort", event.target.value)}>
              <option value="newest">Newest first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
            </select>
          </label>
          <div className="view-toggle" role="group" aria-label="Property view">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}><Grid2X2 size={17} /></button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}><List size={17} /></button>
          </div>
        </div>
      </div>
      <p className="currency-sort-note">Price ranges use the listing’s original currency. Choose a currency above for like-for-like price comparisons.</p>

      {filtered.length === 0 ? (
        <div className="empty-results">
          <span className="empty-icon"><Search size={21} /></span>
          <h2>No matching properties</h2>
          <p>Try a different location or remove one or more filters.</p>
          <button className="button-primary" type="button" onClick={clearFilters}>Clear all filters</button>
        </div>
      ) : (
        <>
          <div className={`property-grid property-grid-${view}`}>
            {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
          {visibleCount < filtered.length && (
            <div className="load-more-wrap"><button className="button-outline-green" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Load more properties</button></div>
          )}
        </>
      )}
    </div>
  );
}
