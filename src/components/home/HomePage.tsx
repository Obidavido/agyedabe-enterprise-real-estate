import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  FileText,
  Hammer,
  Home,
  KeyRound,
  MapPin,
  Ruler,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PropertySearch from "@/components/home/PropertySearch";
import PropertyCard from "@/components/properties/PropertyCard";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { seedProperties } from "@/data/properties";
import { whatsappEnquiry } from "@/lib/contact";

const featuredProperties = seedProperties.filter((property) => property.featured && property.status !== "draft").slice(0, 4);

const categories = [
  { label: "Houses", detail: "Family homes and townhouses", href: "/properties?propertyType=house", icon: Home },
  { label: "Apartments", detail: "Apartments for sale or rent", href: "/properties?propertyType=apartment", icon: Building2 },
  { label: "Land", detail: "Explore residential plots", href: "/properties?propertyType=land", icon: Compass },
  { label: "Commercial properties", detail: "Workspaces and business premises", href: "/properties?propertyType=commercial", icon: KeyRound },
];

const services = [
  { title: "Property Sales", copy: "Explore sale listings and ask for the information you need to take the next step.", icon: Home },
  { title: "Property Rentals", copy: "Browse rental opportunities and contact the team about the details that matter to you.", icon: KeyRound },
  { title: "Building Consultancy", copy: "Discuss your building project and the consultancy support you may need.", icon: Ruler },
  { title: "Build and Sell", copy: "Talk through a build-and-sell project and the property goals behind it.", icon: Hammer },
  { title: "Build and Rent", copy: "Explore building with a rental purpose and enquire about a suitable approach.", icon: Building2 },
  { title: "Property Enquiries and Viewing Assistance", copy: "Send a property enquiry and ask about arranging a viewing.", icon: UsersRound },
];

const benefits = [
  { title: "Clear property information", copy: "See the main details, location and price information together." },
  { title: "Direct enquiry channels", copy: "Choose WhatsApp, calls or email according to your enquiry." },
  { title: "Viewing assistance", copy: "Ask the team about viewing availability for a property." },
  { title: "Support through enquiries", copy: "Get help with the next steps as you compare your options." },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Property · Building consultancy · Ghana</span>
              <h1>Find a Property That Feels Like Home.</h1>
              <p>Discover properties for sale and rent with AGYEDABE ENTERPRISE. Your trusted partner in property and building consultancy.</p>
              <div className="hero-actions">
                <Link className="button-light" href="/properties">Explore Properties <ArrowRight size={15} /></Link>
                <Link className="button-outline" href="/contact">Contact Our Team <ArrowUpRight size={15} /></Link>
              </div>
            </div>
            <div className="hero-media">
              <ImageWithFallback
                src="/manus-storage/async-images/7r3SfNtwQMeNrvpjiERAVU/image-1.webp"
                fallbackSrc="/images/exterior-evening-home.jpg"
                alt="Illustrative contemporary residence with tropical garden; not a specific listed property"
                loading="eager"
                fetchPriority="high"
              />
              <span className="hero-caption">Illustrative residence · Demo imagery</span>
            </div>
          </div>
        </section>

        <PropertySearch />

        <section className="trust-strip" aria-label="Our services">
          {[
            { label: "Property sales", icon: Home },
            { label: "Rental opportunities", icon: KeyRound },
            { label: "Building consultancy", icon: Ruler },
            { label: "Personalized assistance", icon: UsersRound },
          ].map(({ label, icon: Icon }) => (
            <div className="trust-item" key={label}>
              <span className="trust-icon"><Icon size={16} aria-hidden="true" /></span>{label}
            </div>
          ))}
        </section>

        <section className="section" aria-labelledby="featured-title">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">A place to begin</p>
                <h2 className="section-heading" id="featured-title">Featured property opportunities</h2>
                <p className="section-intro">Explore a selection of demonstration listings across Accra. Property availability and details should be confirmed with the team.</p>
              </div>
              <Link className="text-link" href="/properties">View all properties <ArrowRight size={15} /></Link>
            </div>
            <div className="property-grid">
              {featuredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
            </div>
          </div>
        </section>

        <section className="section section-soft" aria-labelledby="category-title">
          <div className="section-inner">
            <p className="section-kicker">Explore by property type</p>
            <h2 className="section-heading" id="category-title">Start with what you have in mind.</h2>
            <div className="category-grid">
              {categories.map(({ label, detail, href, icon: Icon }) => (
                <Link className="category-card" href={href} key={label}>
                  <Icon size={22} aria-hidden="true" />
                  <span>{detail}</span>
                  <strong>{label}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="about-title">
          <div className="section-inner about-grid">
            <div className="about-photo">
              <ImageWithFallback src="/images/interior-bright-lounge.jpg" alt="Illustrative bright residential interior" />
            </div>
            <div className="about-copy">
              <p className="section-kicker">About AGYEDABE ENTERPRISE</p>
              <h2 className="section-heading" id="about-title">Property Guidance Built Around Your Needs.</h2>
              <p>AGYEDABE ENTERPRISE provides building consultancy and supports people looking to buy, sell or rent property. Tell us what you are looking for and we can help you explore the next step.</p>
              <Link className="button-primary" href="/about">Learn About the Business <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section section-soft" aria-labelledby="services-title">
          <div className="section-inner">
            <p className="section-kicker">How we can help</p>
            <h2 className="section-heading" id="services-title">Property and building support, in one place.</h2>
            <p className="section-intro">Choose a service to learn more or send the team a direct enquiry.</p>
            <div className="service-grid">
              {services.map(({ title, copy, icon: Icon }) => (
                <article className="service-card" key={title}>
                  <span className="service-card-icon"><Icon size={19} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <Link href={`/services#${title.toLowerCase().replaceAll(" ", "-")}`}>Explore service <ArrowRight size={12} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="why-title">
          <div className="section-inner">
            <p className="section-kicker">A thoughtful way forward</p>
            <h2 className="section-heading" id="why-title">Practical support at every step.</h2>
            <p className="section-intro">Clear information and direct conversations help you make the next move with confidence.</p>
            <div className="benefit-grid">
              {benefits.map(({ title, copy }, index) => (
                <article className="benefit" key={title}>
                  {index === 0 ? <FileText size={19} /> : index === 1 ? <MapPin size={19} /> : index === 2 ? <ShieldCheck size={19} /> : <Check size={19} />}
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" aria-labelledby="process-title">
          <div className="section-inner">
            <p className="section-kicker">A simple process</p>
            <h2 className="section-heading" id="process-title">Three steps to get started.</h2>
            <div className="process-grid">
              {[
                ["01", "Explore Available Properties", "Browse listings and note the details that fit your plans."],
                ["02", "Enquire About a Property", "Send a question through your preferred contact channel."],
                ["03", "Arrange a Viewing", "Ask the team about viewing availability and next steps."],
              ].map(([number, title, copy]) => (
                <article className="process-step" key={number}>
                  <span className="process-number">{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-inner">
            <div>
              <h2>Ready to Find Your Next Property?</h2>
              <p>Browse the demo listings or ask our team a question.</p>
            </div>
            <div className="final-cta-actions">
              <Link className="button-light" href="/properties">Browse Properties <ArrowRight size={15} /></Link>
              <a className="button-outline" href={whatsappEnquiry("Hello AGYEDABE ENTERPRISE, I would like to ask about your property services.")} target="_blank" rel="noreferrer">Contact us on WhatsApp <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
