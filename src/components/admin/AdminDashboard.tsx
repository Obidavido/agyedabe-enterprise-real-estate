"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, ExternalLink, LayoutDashboard, ListChecks, Plus, RotateCcw } from "lucide-react";
import PropertyEditor from "@/components/admin/PropertyEditor";
import PropertyTable from "@/components/admin/PropertyTable";
import { usePropertyStore } from "@/components/admin/PropertyStoreProvider";
import { formatPropertyPrice } from "@/lib/property-utils";
import type { Property } from "@/types/property";

type Section = "overview" | "properties" | "add";

function MetricCard({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <article className="admin-metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

export default function AdminDashboard() {
  const { properties, loaded, storageWarning, setProperties, resetDemoData } = usePropertyStore();
  const [section, setSection] = useState<Section>("overview");
  const [editing, setEditing] = useState<Property | null>(null);
  const [toast, setToast] = useState("");

  const metrics = useMemo(() => ({
    total: properties.length,
    sale: properties.filter((property) => property.listingType === "sale").length,
    rent: properties.filter((property) => property.listingType === "rent").length,
    featured: properties.filter((property) => property.featured).length,
    draftUnavailable: properties.filter((property) => property.status === "draft" || property.status === "unavailable").length,
    recentAdditions: properties.filter((property) => Date.parse(property.createdAt) >= Date.now() - 30 * 24 * 60 * 60 * 1000).length,
  }), [properties]);
  const recent = useMemo(() => [...properties].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 5), [properties]);

  function saveProperty(property: Property) {
    if (editing) setProperties((current) => current.map((item) => item.id === editing.id ? property : item));
    else setProperties((current) => [property, ...current]);
    setEditing(null);
    setSection("properties");
    setToast(editing ? "Demo property updated in this browser." : "Demo property added in this browser.");
    window.setTimeout(() => setToast(""), 3500);
  }

  function deleteProperty(property: Property) {
    const confirmed = window.confirm(`Delete “${property.title}” from this browser’s demo data? This cannot be undone here.`);
    if (!confirmed) return;
    setProperties((current) => current.filter((item) => item.id !== property.id));
    setToast("Demo property deleted from this browser.");
    window.setTimeout(() => setToast(""), 3500);
  }

  function reset() {
    const confirmed = window.confirm("Reset all browser-local demo properties to the original sample data? Your local edits will be removed.");
    if (!confirmed) return;
    resetDemoData();
    setEditing(null);
    setSection("overview");
    setToast("Original demo property data restored.");
    window.setTimeout(() => setToast(""), 3500);
  }

  const activeLabel = section === "overview" ? "Overview" : section === "properties" ? "Properties" : editing ? "Edit Property" : "Add Property";

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><Link href="/" className="brand-link" aria-label="AGYEDABE ENTERPRISE demo admin"><img className="brand-logo" src="/brand/01_primary-logo.png" alt="AGYEDABE ENTERPRISE" /></Link><span className="admin-brand-caption">Presentation demo</span></div>
        <p className="admin-nav-label">Workspace</p>
        <nav className="admin-nav" aria-label="Admin sections">
          <button type="button" className={section === "overview" ? "is-active" : ""} onClick={() => { setSection("overview"); setEditing(null); }}><LayoutDashboard size={17} /> Overview</button>
          <button type="button" className={section === "properties" ? "is-active" : ""} onClick={() => { setSection("properties"); setEditing(null); }}><ListChecks size={17} /> Properties</button>
          <button type="button" className={section === "add" && !editing ? "is-active" : ""} onClick={() => { setEditing(null); setSection("add"); }}><Plus size={17} /> Add Property</button>
        </nav>
        <div className="admin-sidebar-bottom"><Link href="/" className="admin-view-site"><ExternalLink size={15} /> View Website</Link><p>Demo data lives in localStorage in this browser only.</p></div>
      </aside>
      <section className="admin-workspace">
        <header className="admin-topbar"><div><span className="admin-mobile-mark"><Building2 size={17} /> AGYEDABE</span><p className="admin-breadcrumb">Admin workspace <span>/</span> {activeLabel}</p></div><span className="admin-demo-tag">DEMO</span></header>
        <div className="admin-content">
          <div className="admin-demo-notice" role="note"><strong>Presentation Demo — Data is stored locally in this browser. Authentication and production database integration are not enabled.</strong><span>This dashboard is not secured and must not be used with private customer or production data.</span></div>
          {storageWarning && <div className="admin-warning" role="alert">{storageWarning}</div>}
          {!loaded && <p className="admin-loading" role="status">Loading this browser’s demo data…</p>}
          {toast && <p className="admin-toast" role="status" aria-live="polite">{toast}</p>}

          {section === "overview" && (
            <div className="admin-overview">
              <div className="admin-page-heading"><div><p className="section-kicker">A snapshot of your demo data</p><h1>Overview</h1><p>Counts below are calculated from the current browser-local property collection.</p></div><button className="admin-button admin-button-primary" type="button" onClick={() => { setEditing(null); setSection("add"); }}><Plus size={15} /> Add Property</button></div>
              <div className="admin-metrics-grid">
                <MetricCard label="Total properties" value={metrics.total} detail="All local demo records" />
                <MetricCard label="For sale" value={metrics.sale} detail="Sale listings" />
                <MetricCard label="For rent" value={metrics.rent} detail="Rental listings" />
                <MetricCard label="Featured" value={metrics.featured} detail="Homepage selection" />
                <MetricCard label="Draft / unavailable" value={metrics.draftUnavailable} detail="Not shown publicly" />
                <MetricCard label="Recent additions" value={metrics.recentAdditions} detail="Created in the past 30 days" />
              </div>
              <section className="admin-panel admin-recent-panel"><div className="admin-panel-heading"><div><p className="section-kicker">Most recently added</p><h2>Recent demo properties</h2></div><button className="admin-button admin-button-secondary" type="button" onClick={() => setSection("properties")}>Manage all properties</button></div>
                {recent.length === 0 ? <p className="admin-empty-message">No demo properties are in the current collection.</p> : <div className="admin-recent-list">{recent.map((property) => <div className="admin-recent-row" key={property.id}><div><strong>{property.title}</strong><span>{property.location} · {property.reference}</span></div><span className="admin-recent-price">{formatPropertyPrice(property)}</span><span className={`admin-status-badge status-${property.status}`}>{property.status}</span></div>)}</div>}
              </section>
            </div>
          )}

          {section === "properties" && <PropertyTable properties={properties} onAdd={() => { setEditing(null); setSection("add"); }} onEdit={(property) => { setEditing(property); setSection("add"); }} onDelete={deleteProperty} onUpdate={(updated) => setProperties((current) => current.map((item) => item.id === updated.id ? updated : item))} onReset={reset} />}
          {section === "add" && <PropertyEditor properties={properties} initial={editing} onSave={saveProperty} onCancel={() => { setEditing(null); setSection("properties"); }} />}
          <footer className="admin-footer"><span>{properties.length} local demo properties · {loaded ? "Browser data loaded" : "Loading"}</span><button type="button" onClick={reset}><RotateCcw size={13} /> Reset Demo Data</button></footer>
        </div>
      </section>
    </main>
  );
}
