import { Search } from "lucide-react";

export default function PropertySearch() {
  return (
    <div className="search-wrap">
      <form className="property-search" action="/properties" method="get">
        <label className="search-field">
          <span className="field-label">Location or keyword</span>
          <input className="field-control" type="search" name="q" placeholder="e.g. East Legon" />
        </label>
        <label className="search-field">
          <span className="field-label">Listing type</span>
          <select className="field-control" name="listingType" defaultValue="">
            <option value="">Any listing</option>
            <option value="sale">For sale</option>
            <option value="rent">For rent</option>
          </select>
        </label>
        <label className="search-field">
          <span className="field-label">Property type</span>
          <select className="field-control" name="propertyType" defaultValue="">
            <option value="">Any type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
        <label className="search-field">
          <span className="field-label">Min price</span>
          <input className="field-control" type="number" name="minPrice" min="0" inputMode="numeric" placeholder="No minimum" />
        </label>
        <label className="search-field">
          <span className="field-label">Max price</span>
          <input className="field-control" type="number" name="maxPrice" min="0" inputMode="numeric" placeholder="No maximum" />
        </label>
        <button className="search-button" type="submit"><Search size={15} aria-hidden="true" /> Search</button>
      </form>
    </div>
  );
}
