import Link from "next/link";
import { ArrowRight, Building2, Home, KeyRound, Ruler } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export const metadata = { title: "About", description: "Learn about AGYEDABE ENTERPRISE's property and building consultancy services." };

const capabilities = [
  { title: "Building consultancy", detail: "Discuss building questions and the consultancy support you may need.", icon: Ruler },
  { title: "Properties for sale", detail: "Explore sale listings and ask for clear property information.", icon: Home },
  { title: "Properties for rent", detail: "Browse rental opportunities and enquire about their details.", icon: KeyRound },
  { title: "Build and sell or rent", detail: "Talk through a project with a sale or rental purpose.", icon: Building2 },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-intro">
          <div className="page-intro-inner">
            <p className="section-kicker">About the business</p>
            <h1>Property guidance built around your needs.</h1>
            <p>AGYEDABE ENTERPRISE brings building consultancy and property support together for people looking to buy, sell, rent or plan a building project.</p>
            <span className="demo-note">Building Consultants | Real Estate</span>
          </div>
        </section>
        <section className="section">
          <div className="section-inner about-grid">
            <div className="about-photo"><ImageWithFallback src="/images/interior-warm-living.jpg" alt="Illustrative residential interior representing the property services in this demo" /></div>
            <div className="about-copy">
              <p className="section-kicker">A practical approach</p>
              <h2 className="section-heading">Clear information. A helpful next step.</h2>
              <p>AGYEDABE ENTERPRISE provides building consultancy and assists customers with properties for sale and rent. The business also supports build-and-sell and build-and-rent enquiries.</p>
              <p>Our focus is to help people explore property information, ask direct questions and understand the next step in their enquiry. Property examples on this presentation site are demonstrations and should be verified.</p>
              <Link className="button-primary" href="/properties">Explore properties <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
        <section className="section section-soft">
          <div className="section-inner">
            <p className="section-kicker">What we do</p>
            <h2 className="section-heading">Support for property and building plans.</h2>
            <div className="service-grid">
              {capabilities.map(({ title, detail, icon: Icon }) => <article className="service-card" key={title}><span className="service-card-icon"><Icon size={19} /></span><h3>{title}</h3><p>{detail}</p><Link href="/services">Learn about services <ArrowRight size={12} /></Link></article>)}
            </div>
          </div>
        </section>
        <section className="final-cta"><div className="final-cta-inner"><div><h2>Let’s talk about what you need.</h2><p>Send a question about a property or building consultancy.</p></div><div className="final-cta-actions"><Link className="button-light" href="/contact">Contact the team <ArrowRight size={15} /></Link><Link className="button-outline" href="/properties">Browse properties</Link></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
