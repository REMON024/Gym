import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Share2, Ticket, Users } from "lucide-react";
import StarRating from "@/components/StarRating";
import EventCard from "@/components/EventCard";
import { getEventById, getSimilarEvents } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const [event, similar] = await Promise.all([
    getEventById(id),
    getSimilarEvents(id),
  ]);

  if (!event) notFound();

  const minPrice = Math.min(...event.tickets.map((t) => t.price));

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-72 lg:h-96 bg-gray-900">
        <Image src={event.banner} alt={event.title} fill className="object-cover opacity-70" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-white/70">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/events" className="hover:text-white">Events</Link>
          <span>/</span>
          <span className="text-white">{event.title}</span>
        </div>

        {/* Event title */}
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-3">{event.category}</span>
          <h1 className="text-white text-2xl lg:text-4xl font-black leading-tight">
            {event.title} {event.titleBn && <span>{event.titleBn}</span>}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Main ────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meta info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  <span>{event.date}</span>
                </div>
                {event.endDate && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-orange-500" />
                    <span>{event.endDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-orange-500" />
                  <span>{event.attendees} Attendees</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                  <Share2 size={15} /> Share
                </button>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">Privacy Policy</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">About this Event</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Ticket Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Ticket Details</h2>
              <div className="flex flex-wrap gap-3">
                {event.tickets.map((t) => (
                  <div key={t.id} className="border border-gray-200 rounded-xl p-4 flex-1 min-w-36">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{t.name}</p>
                    <p className="text-xl font-black text-gray-900">
                      {t.price === 0 ? "FREE" : `৳${t.price.toLocaleString()}`}
                    </p>
                    <Link
                      href={`/events/${event.id}/checkout`}
                      className="mt-3 block w-full text-center bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-black transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Location</h2>
              <div className="rounded-xl overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={32} className="mx-auto mb-2 text-orange-500" />
                  <p className="font-semibold text-sm">{event.venue}</p>
                  <p className="text-xs">{event.city}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {event.reviews.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Reviews</h2>
                <div className="space-y-5">
                  {event.reviews.map((rev) => (
                    <div key={rev.id} className="flex gap-3">
                      <Image src={rev.avatar} alt={rev.author} width={36} height={36} className="rounded-full object-cover flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{rev.author}</span>
                          <StarRating rating={rev.rating} size={12} />
                        </div>
                        <p className="text-sm text-gray-600">{rev.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* People Also Viewed */}
            {similar.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">People Also Viewed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similar.slice(0, 4).map((evt) => (
                    <EventCard key={evt.id} event={evt} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
              {/* Event thumbnail */}
              <div className="relative h-40">
                <Image src={event.image} alt={event.title} fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                  <span className="text-white text-sm font-bold line-clamp-2">{event.title} {event.titleBn}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1">Choose your ticket</h3>
                <div className="space-y-3 mb-5">
                  {event.tickets.map((t) => (
                    <div key={t.id} className="flex justify-between items-center py-2 border-b border-gray-50">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 uppercase">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.description}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 ml-2">
                        {t.price === 0 ? "FREE" : `৳${t.price}`}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/events/${event.id}/checkout`}
                  className="block w-full text-center bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors"
                >
                  Get Tickets
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Share Event</h3>
              <div className="flex gap-2">
                {["f", "in", "tw", "wa"].map((icon) => (
                  <button key={icon} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors uppercase">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
