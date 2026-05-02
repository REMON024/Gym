import { ShoppingCart, Info, CreditCard } from "lucide-react";

const steps = [
  { label: "Select Tickets", icon: ShoppingCart },
  { label: "Information", icon: Info },
  { label: "Checkout & Pay", icon: CreditCard },
];

interface CheckoutStepsProps {
  current: 0 | 1 | 2;
}

export default function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = step.icon;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  done || active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                <Icon size={18} />
              </div>
              <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${active ? "text-gray-900" : done ? "text-gray-600" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mx-1 mb-5 ${i < current ? "bg-gray-900" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
