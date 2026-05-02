import Image from "next/image";

interface TicketLine {
  name: string;
  qty: number;
  price: number;
}

interface OrderSummaryProps {
  eventTitle: string;
  eventTitleBn?: string;
  eventImage: string;
  tickets: TicketLine[];
  transactionFee?: number;
}

export default function OrderSummary({ eventTitle, eventTitleBn, eventImage, tickets, transactionFee = 10 }: OrderSummaryProps) {
  const subtotal = tickets.reduce((s, t) => s + t.qty * t.price, 0);
  const total = subtotal + transactionFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
      {/* Banner */}
      <div className="relative h-32">
        <Image src={eventImage} alt={eventTitle} fill className="object-cover" sizes="400px" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
          <p className="text-white font-bold text-sm leading-tight">{eventTitle}</p>
          {eventTitleBn && <p className="text-white text-xs opacity-80">{eventTitleBn}</p>}
        </div>
      </div>

      {/* Breakdown */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3 uppercase tracking-wide">ORDER SUMMARY</h3>
        <div className="space-y-2 text-sm">
          {tickets.map((t, i) => (
            <div key={i} className="flex justify-between text-gray-600">
              <span>{t.qty} x {t.name}</span>
              <span>৳{(t.qty * t.price).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-gray-600">
            <span>Transaction Charge</span>
            <span>৳{transactionFee}</span>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>৳{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
