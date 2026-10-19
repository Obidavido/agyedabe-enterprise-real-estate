import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="placeholder-page">
        <section className="placeholder-card" aria-labelledby="not-found-title">
          <span className="section-kicker">Page not found</span>
          <h1 id="not-found-title">We couldn’t find that page.</h1>
          <p>The link may be out of date. Return home or explore the property collection.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link className="button-primary" href="/">Return home</Link>
            <Link className="button-light" href="/properties">Explore properties</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
