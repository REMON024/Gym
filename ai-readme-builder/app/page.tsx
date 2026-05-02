'use client';

import { useState } from "react";
import StepIndicator from "./components/StepIndicator";
import TechStackSelector from "./components/TechStackSelector";
import MarkdownPreview from "./components/MarkdownPreview";

const STEP_LABELS = ["Basics", "Tech", "Details", "Preview"];

interface FormData {
  projectName: string;
  description: string;
  authorName: string;
  github: string;
  demo: string;
  techStack: string[];
  features: string;
  installation: string;
  usage: string;
  license: string;
}

const LICENSES = ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3-Clause", "ISC", "Unlicensed"];

function InputField({
  label, name, value, onChange, placeholder, required, hint,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
      />
      {hint && <p className="text-xs text-gray-600 mt-1">{hint}</p>}
    </div>
  );
}

function TextareaField({
  label, value, onChange, placeholder, rows = 4, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-y font-mono text-sm"
      />
      {hint && <p className="text-xs text-gray-600 mt-1">{hint}</p>}
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [readme, setReadme] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");

  const [form, setForm] = useState<FormData>({
    projectName: "",
    description: "",
    authorName: "",
    github: "",
    demo: "",
    techStack: [],
    features: "",
    installation: "",
    usage: "",
    license: "MIT",
  });

  const set = (key: keyof FormData) => (value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0) return form.projectName.trim() && form.description.trim();
    if (step === 1) return form.techStack.length > 0;
    return true;
  };

  const generate = async () => {
    setGenerating(true);
    setError("");
    setReadme("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setReadme(data.readme);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.projectName.replace(/\s+/g, "-").toLowerCase() || "README"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setStep(0);
    setReadme("");
    setError("");
    setForm({
      projectName: "", description: "", authorName: "", github: "", demo: "",
      techStack: [], features: "", installation: "", usage: "", license: "MIT",
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #030712 0%, #0f0720 50%, #030712 100%)" }}>
      {/* Header */}
      <header className="border-b border-gray-800/50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white">README Builder</h1>
              <p className="text-xs text-gray-500">Powered by Claude AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-violet-900/40 text-violet-300 border border-violet-800/50 px-2.5 py-1 rounded-full">
              Free to use
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {step < 3 ? (
          <div>
            {/* Hero text */}
            {step === 0 && (
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Generate a <span className="text-violet-400">professional README</span>
                </h2>
                <p className="text-gray-400">Fill in your project details and let AI write a complete README in seconds.</p>
              </div>
            )}

            <StepIndicator currentStep={step} totalSteps={3} labels={STEP_LABELS.slice(0, 3)} />

            {/* Card */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">

              {/* Step 0: Basics */}
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-white mb-6">Project Basics</h3>
                  <InputField
                    label="Project Name" name="projectName" value={form.projectName}
                    onChange={set("projectName")} placeholder="e.g. Task Manager Pro" required
                  />
                  <TextareaField
                    label="Project Description" value={form.description}
                    onChange={set("description")} rows={3}
                    placeholder="Describe what your project does and why it's useful..."
                  />
                  <InputField
                    label="Author Name" name="authorName" value={form.authorName}
                    onChange={set("authorName")} placeholder="e.g. John Doe"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="GitHub URL" name="github" value={form.github}
                      onChange={set("github")} placeholder="https://github.com/..."
                    />
                    <InputField
                      label="Demo URL" name="demo" value={form.demo}
                      onChange={set("demo")} placeholder="https://your-demo.com"
                    />
                  </div>
                </div>
              )}

              {/* Step 1: Tech Stack */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-white mb-6">Tech Stack</h3>
                  <p className="text-sm text-gray-400 -mt-2">Select all technologies used in your project.</p>
                  <TechStackSelector
                    selected={form.techStack}
                    onChange={set("techStack") as (v: string[]) => void}
                  />
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-white mb-6">Project Details</h3>
                  <TextareaField
                    label="Key Features"
                    value={form.features}
                    onChange={set("features")}
                    rows={3}
                    placeholder={"- User authentication\n- Real-time updates\n- Dark mode support"}
                    hint="List the main features, one per line"
                  />
                  <TextareaField
                    label="Installation Steps"
                    value={form.installation}
                    onChange={set("installation")}
                    rows={3}
                    placeholder={"npm install\nnpm run dev"}
                    hint="Commands to install and run the project"
                  />
                  <TextareaField
                    label="Usage / Examples"
                    value={form.usage}
                    onChange={set("usage")}
                    rows={3}
                    placeholder="How to use the project after installing..."
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">License</label>
                    <div className="flex flex-wrap gap-2">
                      {LICENSES.map((lic) => (
                        <button
                          key={lic}
                          type="button"
                          onClick={() => set("license")(lic)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                            form.license === lic
                              ? "bg-violet-600 border-violet-600 text-white"
                              : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          {lic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Back
              </button>

              {step < 2 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={generate}
                  disabled={generating}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {generating ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "✨ Generate README"
                  )}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Step 3: Result */
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-green-900/40 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Your README is ready!</h2>
              <p className="text-gray-400 text-sm mt-1">Copy or download your professionally generated README</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-5 justify-center">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
              >
                {copied ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy Markdown</>
                )}
              </button>
              <button
                onClick={download}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download .md
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Start Over
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-900/60 border border-gray-800 rounded-xl p-1 mb-4">
              {(["preview", "raw"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-violet-600 text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab === "preview" ? "📄 Preview" : "⌨️ Raw Markdown"}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
              {activeTab === "preview" ? (
                <MarkdownPreview content={readme} />
              ) : (
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">{readme}</pre>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-700 text-xs">
        Built with Claude AI · Generate unlimited READMEs for free
      </footer>
    </div>
  );
}
