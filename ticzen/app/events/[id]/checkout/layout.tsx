import { getEventById } from "@/lib/api";
import { notFound } from "next/navigation";
import { CheckoutProvider } from "./CheckoutContext";

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function CheckoutLayout({ children, params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <CheckoutProvider>
      {children}
    </CheckoutProvider>
  );
}
