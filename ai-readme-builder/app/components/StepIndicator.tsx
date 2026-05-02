'use client';

interface Props {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: Props) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < currentStep
                  ? "bg-violet-600 text-white"
                  : i === currentStep
                  ? "bg-violet-500 text-white ring-4 ring-violet-500/30"
                  : "bg-gray-800 text-gray-500 border border-gray-700"
              }`}
            >
              {i < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${i === currentStep ? "text-violet-400" : i < currentStep ? "text-violet-500" : "text-gray-600"}`}>
              {labels[i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-12 h-0.5 mb-5 mx-1 transition-all duration-300 ${i < currentStep ? "bg-violet-600" : "bg-gray-800"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
