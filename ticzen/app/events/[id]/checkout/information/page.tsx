import { getEventById } from "@/lib/api";
import { notFound } from "next/navigation";
import InformationClient from "./InformationClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InformationPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();
  return <InformationClient event={event} />;
}
