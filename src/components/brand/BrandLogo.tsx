import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link className="brand-link" href="/" aria-label="AGYEDABE ENTERPRISE home">
      <img
        className="brand-logo"
        src="/brand/agyedabe-horizontal.svg"
        alt="AGYEDABE ENTERPRISE — Building Consultants | Real Estate"
        width="460"
        height="112"
      />
      <img
        className="brand-icon"
        src="/brand/agyedabe-icon.svg"
        alt=""
        aria-hidden="true"
        width="88"
        height="88"
      />
    </Link>
  );
}
