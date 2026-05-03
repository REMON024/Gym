import Image from "next/image";

interface TicketLine { name: string; qty: number; price: number; }

interface Props {
  eventTitle: string;
  eventTitleBn?: string;
  eventImage: string;
  tickets: TicketLine[];
  transactionFee?: number;
}

export default function OrderSummary({ eventTitle, eventTitleBn, eventImage, tickets, transactionFee = 10 }: Props) {
  const subtotal = tickets.reduce((s, t) => s + t.qty * t.price, 0);
  const total = subtotal + transactionFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
      {/* Event banner */}
      <div className="relative h-28">
        <Image src={eventImage} alt={eventTitle} fill className="object-cover" sizes="360px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
          <div>
            <p className="text-white font-bold text-[12px] leading-tight line-clamp-1">{eventTitle}</p>
            {eventTitleBn && <p className="text-white/70 text-[11px]">{eventTitleBn}</p>}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">ORDER SUMMARY</h3>
        <div className="space-y-2">
          {tickets.filter(t => t.qty > 0).map((t, i) => (
            <div key={i} className="flex justify-between text-[13px] text-gray-600">
              <span>{t.qty} x {t.name}</span>
              <span>৳{(t.qty * t.price).toLocaleString()}</span>
            </div>
          ))}
          {tickets.every(t => t.qty === 0) && (
            <>
              {tickets.map((t, i) => (
                <div key={i} className="flex justify-between text-[13px] text-gray-400">
                  <span>1 x {t.name}</span>
                  <span>৳{t.price.toLocaleString()}</span>
                </div>
              ))}
            </>
          )}
          <div className="flex justify-between text-[13px] text-gray-400">
            <span>Transaction Charge</span>
            <span>৳{transactionFee}</span>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900 text-[14px]">
          <span>Total</span>
          <span>৳{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
