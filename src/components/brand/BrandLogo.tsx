import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link className="brand-link" href="/" aria-label="AGYEDABE ENTERPRISE home">
      <img
        className="brand-logo"
        src="/brand/01_primary-logo.png"
        alt="AGYEDABE ENTERPRISE — Building Consultants | Real Estate"
        width="1071"
        height="398"
      />
      <img
        className="brand-icon"
        src="/brand/06_icon-only.png"
        alt=""
        aria-hidden="true"
        width="238"
        height="198"
      />
    </Link>
  );
}
