"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQ } from "@/data/dummy";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
          >
            <span className="text-sm font-medium text-gray-800">{faq.question}</span>
            {open === faq.id ? <Minus size={16} className="text-gray-400 flex-shrink-0" /> : <Plus size={16} className="text-gray-400 flex-shrink-0" />}
          </button>
          {open === faq.id && (
            <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
