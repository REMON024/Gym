"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, CreditCard, Smartphone, Building2, MoreHorizontal, Edit2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CheckoutSteps from "@/components/CheckoutSteps";
import OrderSummary from "@/components/OrderSummary";
import { useCheckout } from "../CheckoutContext";
import type { Event } from "@/data/dummy";

type PayMethod = "card" | "mobile" | "net" | "more";
type MobilePlatform = "bkash" | "nagad" | "visa" | "gpay";

const mobilePlatforms = [
  { id: "bkash", label: "bKash", color: "#E2136E" },
  { id: "nagad", label: "Nagad", color: "#F7941D" },
  { id: "visa", label: "VISA", color: "#1A1F71" },
  { id: "gpay", label: "GPay", color: "#4285F4" },
];

export default function PaymentClient({ event }: { event: Event }) {
  const router = useRouter();
  const { selections, attendees } = useCheckout();

  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [mobilePlatform, setMobilePlatform] = useState<MobilePlatform>("bkash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const [rememberCard, setRememberCard] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!selections.length) {
    router.replace(`/events/${event.id}/checkout`);
    return null;
  }

  const orderTickets = selections.map((s) => ({ name: s.name, qty: s.qty, price: s.price }));
  const total = orderTickets.reduce((s, t) => s + t.qty * t.price, 0) + 10;

  const orderId = `#BL-2025-${Math.floor(1000 + Math.random() * 9000)}`;

  const formatCard = (val: string) => {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  };

  const flatTickets = selections.flatMap((s, si) =>
    Array.from({ length: s.qty }, (_, qi) => ({
      sel: s,
      attendee: attendees[selections.slice(0, si).reduce((a, x) => a + x.qty, 0) + qi],
      idx: selections.slice(0, si).reduce((a, x) => a + x.qty, 0) + qi,
    }))
  );

  const handlePay = async () => {
    if (!agreeTerms) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setShowModal(true);
  };

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
        <CheckoutSteps current={2} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Confirm your order</h2>

            {/* Ticket summaries */}
            {flatTickets.map(({ sel, attendee, idx }) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Ticket No - ({idx + 1})</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md uppercase ${
                      sel.id === "vip" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-600"
                    }`}>{sel.name}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><Edit2 size={14} /></button>
                </div>
                {attendee ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm">
                    {[
                      ["First Name:", attendee.firstName || "—"],
                      ["Last Name:", attendee.lastName || "—"],
                      ["Email:", attendee.email || "—"],
                      ["Mobile Number:", attendee.mobile || "—"],
                      ["Address:", attendee.address || "—"],
                      ["Post Code:", attendee.postCode || "—"],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <span className="text-gray-400 text-xs">{label}</span>
                        <p className="text-gray-800 text-xs font-medium">{val}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No attendee info provided</p>
                )}
              </div>
            ))}

            {/* Add More Tickets */}
            <Link
              href={`/events/${event.id}/checkout`}
              className="block w-full text-center border border-dashed border-gray-300 rounded-2xl py-3 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              + Add More Tickets
            </Link>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { id: "card", icon: CreditCard, label: "Card" },
                  { id: "mobile", icon: Smartphone, label: "Mobile Banking" },
                  { id: "net", icon: Building2, label: "Net Banking" },
                  { id: "more", icon: MoreHorizontal, label: "More" },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setPayMethod(id as PayMethod)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors ${
                      payMethod === id ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <Icon size={20} className={payMethod === id ? "text-gray-900" : "text-gray-400"} />
                    <span className="text-xs font-medium text-gray-600">{label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Banking platforms */}
              {payMethod === "mobile" && (
                <div className="mb-5">
                  <p className="text-sm font-medium text-gray-700 mb-3">Mobile Banking</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mobilePlatforms.map((plat) => (
                      <button
                        key={plat.id}
                        onClick={() => setMobilePlatform(plat.id as MobilePlatform)}
                        className={`px-4 py-2 rounded-xl border text-sm font-bold transition-colors ${
                          mobilePlatform === plat.id ? "border-gray-900 shadow-sm" : "border-gray-100 hover:border-gray-200"
                        }`}
                        style={{ color: plat.color }}
                      >
                        {plat.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Enter your {mobilePlatforms.find(p => p.id === mobilePlatform)?.label} number to proceed with payment.</p>
                  <input className="mt-3 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400" placeholder="01XXXXXXXXX" />
                </div>
              )}

              {/* Card form */}
              {payMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Cardholder Name *</label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Card Number *</label>
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Expiry *</label>
                      <input
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">CVV *</label>
                      <div className="relative">
                        <input
                          type={showCvv ? "text" : "password"}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 pr-10"
                          placeholder="•••"
                        />
                        <button onClick={() => setShowCvv(!showCvv)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card logos */}
                  <div className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-blue-700 border border-blue-200 px-2 py-0.5 rounded">VISA</span>
                    <span className="text-xs font-bold text-red-600 border border-red-200 px-2 py-0.5 rounded">MC</span>
                    <span className="text-xs font-bold text-blue-500 border border-blue-200 px-2 py-0.5 rounded">AMEX</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms & checkboxes */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberCard} onChange={() => setRememberCard(!rememberCard)} className="rounded" />
                <span className="text-sm text-gray-600">Remember my card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} className="rounded" />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="#" className="text-gray-900 underline font-medium">terms and conditions</Link>{" "}
                  of TicZen
                </span>
              </label>
            </div>

            <button
              onClick={handlePay}
              disabled={!agreeTerms || loading}
              className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Pay ৳${total.toLocaleString()}`}
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

      {/* ── Congratulations Modal ──────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => router.push("/")}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Confetti effect using emoji */}
            <div className="text-4xl mb-2">🎊 🎉 🎊</div>

            {/* Green check */}
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-white" />
            </div>

            <h2 className="text-xl font-black text-gray-900 mb-2">Congratulations! 🎉</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your order has been successfully confirmed. Please download your ticket now.
            </p>

            <div className="bg-gray-50 rounded-xl p-3 flex justify-between text-sm mb-6">
              <div>
                <p className="text-xs text-gray-400">Order Id</p>
                <p className="font-bold text-gray-900">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Amount</p>
                <p className="font-bold text-gray-900">৳{total.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Now
              </button>
              <Link
                href="/events"
                className="block w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Purchase More
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
