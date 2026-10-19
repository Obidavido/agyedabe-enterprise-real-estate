import { Suspense } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PropertyBrowser from "@/components/properties/PropertyBrowser";

export const metadata = { title: "Properties", description: "Explore sale and rental property demo listings with AGYEDABE ENTERPRISE." };

export default function PropertiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-intro">
          <div className="page-intro-inner">
            <p className="section-kicker">Explore the collection</p>
            <h1>Find a place for what comes next.</h1>
            <p>Browse demonstration properties across Accra. Listings and availability shown here are sample content and should be confirmed with the team.</p>
            <span className="demo-note">Presentation demo · availability to confirm</span>
          </div>
        </section>
        <section className="section property-listing-section">
          <div className="section-inner">
            <Suspense fallback={<div className="loading-state" role="status">Loading properties…</div>}>
              <PropertyBrowser />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
