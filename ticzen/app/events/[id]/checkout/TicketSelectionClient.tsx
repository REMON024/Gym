"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import CheckoutSteps from "@/components/CheckoutSteps";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "./CheckoutContext";
import type { Event } from "@/data/dummy";

export default function TicketSelectionClient({ event }: { event: Event }) {
  const router = useRouter();
  const { setSelections } = useCheckout();

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(event.tickets.map((t) => [t.id, 0]))
  );

  const change = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));
  };

  const totalQty = Object.values(quantities).reduce((s, q) => s + q, 0);

  const orderTickets = event.tickets
    .filter((t) => quantities[t.id] > 0)
    .map((t) => ({ name: t.name, qty: quantities[t.id], price: t.price }));

  const handleNext = () => {
    const sels = event.tickets
      .filter((t) => quantities[t.id] > 0)
      .map((t) => ({ id: t.id, name: t.name, price: t.price, qty: quantities[t.id] }));
    setSelections(sels);
    router.push(`/events/${event.id}/checkout/information`);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Event banner strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            {event.title} {event.titleBn && <span className="font-normal text-gray-500">{event.titleBn}</span>}
          </h2>
          <div className="flex flex-wrap gap-2">
            {event.tickets.map((t) => (
              <span key={t.id} className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600">
                {t.name}: <strong>৳{t.price}</strong>
              </span>
            ))}
            <span className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600">
              Total: <strong>৳{orderTickets.reduce((s, t) => s + t.qty * t.price, 0).toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutSteps current={0} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ticket list */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Choose your ticket</h2>
            <div className="space-y-4">
              {event.tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-base uppercase">{ticket.name}</span>
                        <span className="text-xl font-black text-gray-900">৳{ticket.price.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-500">{ticket.description}</p>
                    </div>
                    {/* Qty control */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => change(ticket.id, -1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
                        disabled={quantities[ticket.id] === 0}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">{quantities[ticket.id]}</span>
                      <button
                        onClick={() => change(ticket.id, 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next button */}
            <div className="mt-6">
              <button
                onClick={handleNext}
                disabled={totalQty === 0}
                className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <OrderSummary
              eventTitle={event.title}
              eventTitleBn={event.titleBn}
              eventImage={event.image}
              tickets={orderTickets.length ? orderTickets : event.tickets.map((t) => ({ name: t.name, qty: 0, price: t.price }))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
