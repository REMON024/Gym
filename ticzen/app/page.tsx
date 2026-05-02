import { Search, ChevronRight, ChevronLeft, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import StarRating from "@/components/StarRating";
import FAQAccordion from "./FAQAccordion";
import {
  getFeaturedEvents,
  getCategories,
  getTrips,
  getCustomerReviews,
  getFAQs,
} from "@/lib/api";

export default async function HomePage() {
  const [featuredEvents, categories, trips, reviews, faqs] = await Promise.all([
    getFeaturedEvents(),
    getCategories(),
    getTrips(),
    getCustomerReviews(),
    getFAQs(),
  ]);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
                <span className="text-white">One Platform for</span>
                <br />
                <span className="text-white">Every </span>
                <span className="text-orange-400">Event</span>
              </h1>
              <p className="text-gray-400 text-base mb-8 max-w-md">
                A smarter way to organize, select, and secure tickets in seconds.
              </p>
              <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg max-w-md">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none"
                />
                <Link
                  href="/events"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold text-sm flex items-center gap-1 transition-colors"
                >
                  <Search size={16} />
                  Search
                </Link>
              </div>
            </div>

            {/* Right – event showcase grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {featuredEvents.slice(0, 4).map((evt, i) => (
                <div key={evt.id} className={`relative rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 h-44" : "h-32"}`}>
                  <Image src={evt.image} alt={evt.title} fill className="object-cover" sizes="400px" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                    <span className="text-white text-xs font-semibold line-clamp-1">{evt.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore Categories ────────────────────────────────────── */}
      <section className="bg-white pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore Categories</h2>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/events?category=${cat.id}`} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Discover Live Events ──────────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">Powered by</p>
              <h2 className="text-2xl font-bold text-gray-900">
                Discover <span className="text-orange-400">Live</span> Events
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="bg-gray-900 text-white text-xs font-medium px-4 py-1.5 rounded-full">All Events</button>
              <button className="border border-gray-200 text-gray-600 text-xs font-medium px-4 py-1.5 rounded-full hover:border-gray-400 transition-colors">Today</button>
              <button className="border border-gray-200 text-gray-600 text-xs font-medium px-4 py-1.5 rounded-full hover:border-gray-400 transition-colors">This Weekend</button>
              <div className="relative ml-2">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input placeholder="Search..." className="border border-gray-200 rounded-full pl-7 pr-3 py-1.5 text-xs outline-none focus:border-gray-400 w-32" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/events" className="bg-gray-900 text-white font-medium px-8 py-3 rounded-full hover:bg-black transition-colors">
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* ── Book your Trip ───────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Start your Journey</p>
              <h2 className="text-2xl font-bold text-gray-900">
                Book your <span className="text-orange-400">Trip</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {trips.map((trip) => (
              <div key={trip.id} className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer">
                <Image src={trip.image} alt={trip.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-bold">{trip.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ─────────────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Testimony</p>
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Image src={rev.avatar} alt={rev.name} width={44} height={44} className="rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{rev.name}</p>
                    <StarRating rating={rev.rating} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Support Guide</p>
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked <span className="text-orange-400">Question</span>
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Never Miss an</p>
          <h2 className="text-3xl font-black mb-3">
            Never Miss an <span className="text-orange-400">Event!</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Stay ahead with quick booking, exclusive items, and tickets. Sign up for event notifications, discover the most exciting happenings.{" "}
            <span className="text-orange-400 font-semibold">SUBSCRIBE NOW</span>
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="flex-1 flex items-center bg-white/10 border border-white/20 rounded-full px-4">
              <Bell size={14} className="text-gray-400 mr-2 flex-shrink-0" />
              <input placeholder="Put your email here" className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none py-3" />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
        <div className="absolute -left-20 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 bottom-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>
    </main>
  );
}
