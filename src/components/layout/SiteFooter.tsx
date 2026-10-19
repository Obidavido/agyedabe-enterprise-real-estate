import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import { BUSINESS } from "@/lib/contact";

const publicLinks = [
  ["Home", "/"],
  ["Properties", "/properties"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Contact", "/contact"],
];

const categories = [
  ["Houses", "/properties?propertyType=house"],
  ["Apartments", "/properties?propertyType=apartment"],
  ["Land", "/properties?propertyType=land"],
  ["Commercial", "/properties?propertyType=commercial"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <BrandLogo />
          <p>{BUSINESS.descriptor}. Practical property and building consultancy support in Ghana.</p>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          {publicLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="footer-column">
          <h3>Property types</h3>
          {categories.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp only: {BUSINESS.whatsappDisplay}</a>
          <a href={BUSINESS.callsTel}>Calls only: {BUSINESS.callsDisplay}</a>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AGYEDABE ENTERPRISE. All rights reserved.</span>
        <span>Building Consultants | Real Estate</span>
      </div>
    </footer>
  );
}
