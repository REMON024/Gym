import { getEventById } from "@/lib/api";
import { notFound } from "next/navigation";
import PaymentClient from "./PaymentClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();
  return <PaymentClient event={event} />;
}
