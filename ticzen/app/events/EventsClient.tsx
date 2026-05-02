"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/EventCard";
import type { Event } from "@/data/dummy";

const categoryOptions = ["Music", "Drama", "Night life", "Learning", "Conference", "Tours", "Sport", "Festival", "Exhibition"];
const dateOptions = ["Today", "Tomorrow", "This Weekend", "This Month", "Next Month"];
const formatOptions = ["In-Person", "Online", "Hybrid", "Corporate Engagement", "Outdoor", "Educational", "Festival & Culture", "Sports & Fitness", "Private & Social", "Fashion & Arts"];

interface Props {
  events: Event[];
}

export default function EventsClient({ events }: Props) {
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showMoreCat, setShowMoreCat] = useState(false);
  const [showMoreDate, setShowMoreDate] = useState(false);
  const [showMoreFormat, setShowMoreFormat] = useState(false);
  const [tab, setTab] = useState("all");

  const toggleSet = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = events;
    if (priceFilter === "free") result = result.filter((e) => e.isFree);
    if (priceFilter === "paid") result = result.filter((e) => !e.isFree);
    if (selectedCategories.length) result = result.filter((e) => selectedCategories.includes(e.category));
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    }
    return result;
  }, [events, priceFilter, selectedCategories, query]);

  const visibleCats = showMoreCat ? categoryOptions : categoryOptions.slice(0, 4);
  const visibleDates = showMoreDate ? dateOptions : dateOptions.slice(0, 3);
  const visibleFormats = showMoreFormat ? formatOptions : formatOptions.slice(0, 4);

  return (
    <div className="flex gap-6">
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-20 space-y-6">
          {/* Price */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Filters</h3>
            <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Price</h4>
            <div className="space-y-2">
              {[{ val: "free", label: "Free" }, { val: "paid", label: "Paid" }].map(({ val, label }) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={priceFilter === val}
                    onChange={() => setPriceFilter(priceFilter === val ? "all" : val as "free" | "paid")}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Category</h4>
            <div className="space-y-2">
              {visibleCats.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleSet(selectedCategories, setSelectedCategories, cat)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setShowMoreCat(!showMoreCat)} className="text-xs text-orange-500 mt-2 font-medium">
              {showMoreCat ? "Show Less" : "More"}
            </button>
          </div>

          {/* Date */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Date</h4>
            <div className="space-y-2">
              {visibleDates.map((d) => (
                <label key={d} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDates.includes(d)}
                    onChange={() => toggleSet(selectedDates, setSelectedDates, d)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{d}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setShowMoreDate(!showMoreDate)} className="text-xs text-orange-500 mt-2 font-medium">
              {showMoreDate ? "Show Less" : "More"}
            </button>
          </div>

          {/* Format */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Format</h4>
            <div className="space-y-2">
              {visibleFormats.map((f) => (
                <label key={f} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{f}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setShowMoreFormat(!showMoreFormat)} className="text-xs text-orange-500 mt-2 font-medium">
              {showMoreFormat ? "Show Less" : "More"}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            {["all", "today", "this weekend"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-colors capitalize ${
                  tab === t ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {t === "all" ? "All Events" : t === "today" ? "Today" : "This Weekend"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events..."
                className="border border-gray-200 rounded-full pl-7 pr-3 py-1.5 text-xs outline-none focus:border-gray-400 w-40"
              />
            </div>
            <select className="border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600 outline-none">
              <option>Newest Date</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Section header */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">Discover</p>
          <h2 className="text-xl font-bold text-gray-900">Featured</h2>
        </div>

        {/* Event grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium mb-1">No events found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
