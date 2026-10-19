import PagePlaceholder from "@/components/ui/PagePlaceholder";

type PropertyDetailPageProps = { params: Promise<{ slug: string }> };

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  return <PagePlaceholder title="Property details" description={`The detail page for “${slug}” will be available in the next delivery phase.`} />;
}
