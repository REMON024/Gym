import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import EventCard from "@/components/EventCard";
import StarRating from "@/components/StarRating";
import FAQAccordion from "./FAQAccordion";
import { getFeaturedEvents, getCategories, getTrips, getCustomerReviews, getFAQs } from "@/lib/api";

export default async function HomePage() {
  const [events, categories, trips, reviews, faqs] = await Promise.all([
    getFeaturedEvents(),
    getCategories(),
    getTrips(),
    getCustomerReviews(),
    getFAQs(),
  ]);

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-gray-950 min-h-[520px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <h1 className="text-[36px] lg:text-[48px] font-bold text-white leading-tight mb-4">
                <span className="block">One Platform <em className="not-italic text-orange-400">for</em></span>
                <span className="block">Every Event</span>
              </h1>
              <p className="text-gray-400 text-[14px] leading-relaxed mb-8 max-w-sm">
                A smarter way to organize, select, and secure tickets in seconds.
              </p>

              {/* Search */}
              <div className="flex max-w-md overflow-hidden rounded-xl shadow-lg">
                <input
                  type="text"
                  placeholder="Search events, venue, city..."
                  className="flex-1 px-4 py-3 text-sm text-gray-800 bg-white outline-none"
                />
                <Link href="/events"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap">
                  <Search size={15} />
                  Search
                </Link>
              </div>
            </div>

            {/* Right – event thumbnails grid */}
            <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-2 h-[280px]">
              {events.slice(0, 5).map((evt, i) => (
                <div key={evt.id}
                  className={`relative rounded-xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <Image src={evt.image} alt={evt.title} fill className="object-cover" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {i === 0 && (
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white text-xs font-semibold line-clamp-1">{evt.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"
          style={{ borderRadius: "60% 60% 0 0 / 100% 100% 0 0" }} />
      </section>

      {/* ── EXPLORE CATEGORIES ────────────────────────────────────── */}
      <section className="bg-white pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[22px] font-bold text-gray-900 mb-8">Explore Categories</h2>
          <div className="flex items-start justify-between gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/events?category=${cat.id}`}
                className="flex flex-col items-center gap-2 min-w-[64px] group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl
                  group-hover:border-orange-300 group-hover:bg-orange-50 transition-all shadow-sm">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium text-gray-600 text-center whitespace-nowrap group-hover:text-orange-500 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOVER LIVE EVENTS ──────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            <div>
              <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-widest mb-1">Powered by</p>
              <h2 className="text-[22px] font-bold text-gray-900">
                Discover <span className="text-orange-400">Live</span> Events
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="bg-gray-900 text-white text-[12px] font-semibold px-4 py-1.5 rounded-full">
                All Events
              </button>
              <button className="border border-gray-300 text-gray-600 text-[12px] font-medium px-4 py-1.5 rounded-full hover:border-gray-500 transition-colors">
                Today
              </button>
              <button className="border border-gray-300 text-gray-600 text-[12px] font-medium px-4 py-1.5 rounded-full hover:border-gray-500 transition-colors">
                This Weekend
              </button>
              {/* Search */}
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input placeholder="Search..." className="border border-gray-200 rounded-full pl-8 pr-3 py-1.5 text-[12px] outline-none focus:border-gray-400 w-32 bg-white" />
              </div>
              <button className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-gray-400">
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {events.map((evt) => <EventCard key={evt.id} event={evt} />)}
          </div>

          {/* Explore More */}
          <div className="flex justify-center mt-10">
            <Link href="/events"
              className="bg-gray-900 text-white font-semibold text-sm px-10 py-3 rounded-full hover:bg-black transition-colors">
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR TRIP ───────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="text-[11px] text-gray-400 font-medium mb-1">Start your Journey</p>
              <h2 className="text-[22px] font-bold text-gray-900">
                Book your <span className="text-orange-400">Trip</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trips.map((trip) => (
              <div key={trip.id} className="relative rounded-2xl overflow-hidden h-52 cursor-pointer group">
                <Image src={trip.image} alt={trip.name} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-[10px]">📍</span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{trip.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ─────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Testimony</p>
            <h2 className="text-[22px] font-bold text-gray-900">Customer Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Image src={rev.avatar} alt={rev.name} width={44} height={44} className="rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{rev.name}</p>
                    <StarRating rating={rev.rating} size={13} />
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Support Guide</p>
            <h2 className="text-[22px] font-bold text-gray-900">
              Frequently Asked <span className="text-orange-400">Question</span>
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="bg-gray-900 py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10 text-6xl pointer-events-none select-none">📡</div>
        <div className="absolute right-12 bottom-8 opacity-10 text-5xl pointer-events-none select-none">🎫</div>

        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Stay Updated</p>
          <h2 className="text-[28px] font-bold text-white leading-tight mb-3">
            Never Miss an <span className="text-orange-400">Event!</span>
          </h2>
          <p className="text-[13px] text-gray-400 leading-relaxed mb-8">
            Stay ahead with quick booking, exclusive items, and tickets. Sign up for event notifications,
            discover the most exciting happenings.{" "}
            <span className="text-orange-400 font-semibold">SUBSCRIBE NOW</span>
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="flex-1 flex items-center bg-white/10 border border-white/15 rounded-full px-4">
              <Bell size={13} className="text-gray-400 mr-2 flex-shrink-0" />
              <input placeholder="Put your email here"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none py-3" />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        <div className="absolute -left-24 top-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-24 bottom-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>
    </main>
  );
}
