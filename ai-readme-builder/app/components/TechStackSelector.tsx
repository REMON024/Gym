'use client';

const TECH_OPTIONS = [
  "React", "Next.js", "Vue.js", "Angular", "Svelte",
  "Node.js", "Express", "FastAPI", "Django", "Laravel",
  "TypeScript", "JavaScript", "Python", "Go", "Rust", "Java",
  "PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite",
  "Docker", "Kubernetes", "AWS", "Vercel", "Tailwind CSS",
  "GraphQL", "REST API", "tRPC", "Prisma", "Supabase",
];

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function TechStackSelector({ selected, onChange }: Props) {
  const toggle = (tech: string) => {
    if (selected.includes(tech)) {
      onChange(selected.filter((t) => t !== tech));
    } else {
      onChange([...selected, tech]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TECH_OPTIONS.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => toggle(tech)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${
              selected.includes(tech)
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-violet-400 mt-3">
          {selected.length} selected: {selected.join(", ")}
        </p>
      )}
    </div>
  );
}
