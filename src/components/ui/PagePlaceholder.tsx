import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

type PagePlaceholderProps = { title: string; description: string };

export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <>
      <SiteHeader />
      <main className="placeholder-page">
        <section className="placeholder-card" aria-labelledby="placeholder-title">
          <span className="demo-note">Presentation demo</span>
          <h1 id="placeholder-title">{title}</h1>
          <p>{description}</p>
          <Link className="button-primary" href="/">Return to home</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
