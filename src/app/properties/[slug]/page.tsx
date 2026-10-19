import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PropertyDetailClient from "@/components/properties/PropertyDetailClient";
import { seedProperties } from "@/data/properties";

type PropertyDetailPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = seedProperties.find((item) => item.slug === slug);
  return {
    title: property?.title ?? "Property details",
    description: property?.description ?? "Explore property details with AGYEDABE ENTERPRISE.",
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  return (
    <>
      <SiteHeader />
      <PropertyDetailClient slug={slug} />
      <SiteFooter />
    </>
  );
}
