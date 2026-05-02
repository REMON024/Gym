import { getEventById } from "@/lib/api";
import { notFound } from "next/navigation";
import TicketSelectionClient from "./TicketSelectionClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TicketSelectionPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  return <TicketSelectionClient event={event} />;
}
