import Link from "next/link";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Event } from "@/data/dummy";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
}

export default function EventCard({ event, variant = "default" }: EventCardProps) {
  const imgH = variant === "compact" ? 150 : 170;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: imgH }}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Date badge */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          {event.dateShort}
        </span>
        {/* Free badge */}
        {event.isFree && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            FREE
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-[11px] text-gray-400 mb-1 font-medium">{event.time}</p>
        <h3 className="font-semibold text-gray-900 text-[13px] leading-snug mb-2 line-clamp-2">{event.title}</h3>

        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <MapPin size={11} className="flex-shrink-0 text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Users size={11} className="flex-shrink-0 text-gray-400" />
            <span>{event.attendees} Attendees</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="font-bold text-gray-900 text-sm">
            {event.isFree ? "FREE" : `৳${event.price.toLocaleString()}`}
          </span>
          <Link
            href={`/events/${event.id}`}
            className="text-[11px] font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-black transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
