"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit2 } from "lucide-react";
import CheckoutSteps from "@/components/CheckoutSteps";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "../CheckoutContext";
import type { Event } from "@/data/dummy";

type TicketFor = "self" | "others" | "gift";

interface AttendeeForm {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  postCode: string;
  ticketFor: TicketFor;
}

function defaultForm(): AttendeeForm {
  return { firstName: "", lastName: "", email: "", mobile: "", address: "", postCode: "", ticketFor: "self" };
}

export default function InformationClient({ event }: { event: Event }) {
  const router = useRouter();
  const { selections, setAttendees } = useCheckout();

  // Build flat list of individual tickets from selections
  const flatTickets = selections.flatMap((s) =>
    Array.from({ length: s.qty }, (_, i) => ({ ...s, idx: i }))
  );

  const [forms, setForms] = useState<AttendeeForm[]>(() =>
    flatTickets.map(() => defaultForm())
  );
  const [notifyEmail, setNotifyEmail] = useState(false);

  const update = (i: number, field: keyof AttendeeForm, value: string) => {
    setForms((prev) => prev.map((f, idx) => (idx === i ? { ...f, [field]: value } : f)));
  };

  const handleNext = () => {
    const attendees = flatTickets.map((t, i) => ({
      ticketId: t.id,
      ticketIdx: i,
      ...forms[i],
    }));
    setAttendees(attendees);
    router.push(`/events/${event.id}/checkout/payment`);
  };

  if (!selections.length) {
    router.replace(`/events/${event.id}/checkout`);
    return null;
  }

  const orderTickets = selections.map((s) => ({ name: s.name, qty: s.qty, price: s.price }));
  let ticketCounter = 0;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Banner strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {event.title} {event.titleBn && <span className="font-normal text-gray-500">{event.titleBn}</span>}
          </h2>
          <p className="text-sm text-gray-500">{event.date}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutSteps current={1} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-900">Who are the ticket holders?</h2>
              <p className="text-sm text-gray-500 mt-1">Please fill in the details of all attendees. You can use the same information for multiple tickets.</p>
            </div>

            {selections.map((sel) =>
              Array.from({ length: sel.qty }, (_, qi) => {
                const formIdx = ticketCounter++;
                return (
                  <div key={`${sel.id}-${qi}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">
                          TICKET NO - ({formIdx + 1})
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md uppercase ${
                          sel.id === "vip" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-600"
                        }`}>{sel.name}</span>
                        <span className="font-bold text-gray-900">৳{sel.price}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit2 size={14} />
                      </button>
                    </div>

                    {/* Ticket for */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Ticket for:</p>
                      <div className="flex gap-2">
                        {(["self", "others", "gift"] as TicketFor[]).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => update(formIdx, "ticketFor", opt)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors capitalize ${
                              forms[formIdx].ticketFor === opt
                                ? "bg-gray-900 text-white border-gray-900"
                                : "border-gray-200 text-gray-600 hover:border-gray-400"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Attendee Information</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">First Name *</label>
                        <input
                          value={forms[formIdx].firstName}
                          onChange={(e) => update(formIdx, "firstName", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Last Name *</label>
                        <input
                          value={forms[formIdx].lastName}
                          onChange={(e) => update(formIdx, "lastName", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                          placeholder="Last Name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Email *</label>
                        <input
                          type="email"
                          value={forms[formIdx].email}
                          onChange={(e) => update(formIdx, "email", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Mobile Number *</label>
                        <input
                          type="tel"
                          value={forms[formIdx].mobile}
                          onChange={(e) => update(formIdx, "mobile", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                          placeholder="+88 01700000000"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Address *</label>
                        <input
                          value={forms[formIdx].address}
                          onChange={(e) => update(formIdx, "address", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Post Code</label>
                        <input
                          value={forms[formIdx].postCode}
                          onChange={(e) => update(formIdx, "postCode", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                          placeholder="1212"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Notify email toggle */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Do you want to notify the recipient by email?</p>
                  <p className="text-xs text-gray-500 mt-0.5">If you turn this on, a notification will be sent to email.</p>
                </div>
                <button
                  onClick={() => setNotifyEmail(!notifyEmail)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${notifyEmail ? "bg-gray-900" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifyEmail ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              Next →
            </button>
          </div>

          {/* Order summary */}
          <div>
            <OrderSummary
              eventTitle={event.title}
              eventTitleBn={event.titleBn}
              eventImage={event.image}
              tickets={orderTickets}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
