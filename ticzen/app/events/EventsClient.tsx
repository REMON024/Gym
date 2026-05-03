"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import EventCard from "@/components/EventCard";
import type { Event } from "@/data/dummy";

const categoryOptions = ["Music", "Drama", "Night life", "Learning", "Conference", "Tours", "Sport", "Festival", "Exhibition"];
const dateOptions = ["Today", "Tomorrow", "This Weekend", "This Month", "Next Month"];
const formatOptions = ["In-Person", "Online", "Hybrid", "Corporate Engagement", "Outdoor", "Educational", "Festival & Culture", "Sports & Fitness", "Private & Social", "Fashion & Arts"];

export default function EventsClient({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<Record<string, boolean>>({ free: false, paid: false });
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [showMoreCat, setShowMoreCat] = useState(false);
  const [showMoreDate, setShowMoreDate] = useState(false);
  const [showMoreFmt, setShowMoreFmt] = useState(false);
  const [tab, setTab] = useState<"all" | "today" | "weekend">("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCat = (cat: string) =>
    setSelectedCats((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);

  const filtered = useMemo(() => {
    let r = [...events];
    if (priceFilter.free && !priceFilter.paid) r = r.filter((e) => e.isFree);
    if (priceFilter.paid && !priceFilter.free) r = r.filter((e) => !e.isFree);
    if (selectedCats.length) r = r.filter((e) => selectedCats.includes(e.category));
    if (query) {
      const q = query.toLowerCase();
      r = r.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    }
    return r;
  }, [events, priceFilter, selectedCats, query]);

  const SidebarContent = () => (
    <div className="space-y-7">
      <h3 className="font-bold text-gray-900 text-[15px]">Filters</h3>

      {/* Price */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Price</h4>
        <div className="space-y-2.5">
          {[["free", "Free"], ["paid", "Paid"]].map(([val, label]) => (
            <label key={val} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={!!priceFilter[val]}
                onChange={() => setPriceFilter((p) => ({ ...p, [val]: !p[val] }))}
                className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
              <span className="text-[13px] text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Category</h4>
        <div className="space-y-2.5">
          {(showMoreCat ? categoryOptions : categoryOptions.slice(0, 4)).map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={selectedCats.includes(cat)}
                onChange={() => toggleCat(cat)}
                className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
              <span className="text-[13px] text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
        <button onClick={() => setShowMoreCat(!showMoreCat)}
          className="text-[12px] text-orange-500 font-medium mt-2 hover:text-orange-600">
          {showMoreCat ? "Show Less" : "More"}
        </button>
      </div>

      {/* Date */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Date</h4>
        <div className="space-y-2.5">
          {(showMoreDate ? dateOptions : dateOptions.slice(0, 3)).map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
              <span className="text-[13px] text-gray-700">{d}</span>
            </label>
          ))}
        </div>
        <button onClick={() => setShowMoreDate(!showMoreDate)}
          className="text-[12px] text-orange-500 font-medium mt-2 hover:text-orange-600">
          {showMoreDate ? "Show Less" : "More"}
        </button>
      </div>

      {/* Format */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Format</h4>
        <div className="space-y-2.5">
          {(showMoreFmt ? formatOptions : formatOptions.slice(0, 4)).map((f) => (
            <label key={f} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
              <span className="text-[13px] text-gray-700">{f}</span>
            </label>
          ))}
        </div>
        <button onClick={() => setShowMoreFmt(!showMoreFmt)}
          className="text-[12px] text-orange-500 font-medium mt-2 hover:text-orange-600">
          {showMoreFmt ? "Show Less" : "More"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8">
      {/* ── Sidebar desktop ──────────────────────────────────────── */}
      <aside className="hidden lg:block w-52 flex-shrink-0">
        <div className="sticky top-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SidebarContent />
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {[["all", "All Events"], ["today", "Today"], ["weekend", "This Weekend"]].map(([val, label]) => (
              <button key={val} onClick={() => setTab(val as typeof tab)}
                className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                  tab === val ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 text-gray-600 hover:border-gray-500"
                }`}>
                {label}
              </button>
            ))}
            <button className="lg:hidden flex items-center gap-1.5 border border-gray-300 text-gray-600 text-[12px] font-medium px-3 py-1.5 rounded-full"
              onClick={() => setShowMobileFilters(!showMobileFilters)}>
              <SlidersHorizontal size={13} /> Filters
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events..."
                className="border border-gray-200 bg-white rounded-full pl-8 pr-3 py-1.5 text-[12px] outline-none focus:border-gray-400 w-40" />
            </div>
            <select className="border border-gray-200 bg-white rounded-full px-3 py-1.5 text-[12px] text-gray-600 outline-none">
              <option>Newest Date</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile filters */}
        {showMobileFilters && (
          <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
            <SidebarContent />
          </div>
        )}

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-widest mb-1">Discover</p>
          <h2 className="text-[20px] font-bold text-gray-900">Featured</h2>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((evt) => <EventCard key={evt.id} event={evt} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-[15px] font-medium">No events found</p>
            <p className="text-[13px] mt-1">Try different filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
