import { notFound } from "next/navigation";
import { getAllPlaybooks, getPlaybook } from "@/content/playbooks";
import { PlaybookView } from "@/components/playbook/playbook-page";

export function generateStaticParams() {
  return getAllPlaybooks().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = getPlaybook(slug);
  if (!playbook) return {};
  return {
    title: `${playbook.title} — API Playbook`,
    description: playbook.description,
  };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = getPlaybook(slug);
  if (!playbook) notFound();

  return <PlaybookView playbook={playbook} />;
}
