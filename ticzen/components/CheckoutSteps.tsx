import { Ticket, Info, CreditCard } from "lucide-react";

const steps = [
  { label: "Select Tickets", icon: Ticket },
  { label: "Info & Payment", icon: Info },
  { label: "Check Out", icon: CreditCard },
];

export default function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = step.icon;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                done || active
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "bg-white border-gray-200 text-gray-400"
              }`}>
                <Icon size={17} />
              </div>
              <span className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${
                active ? "text-gray-900" : done ? "text-gray-500" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[2px] w-16 sm:w-24 mx-2 mb-5 rounded-full transition-colors ${
                i < current ? "bg-gray-900" : "bg-gray-200"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
