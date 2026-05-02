import Link from "next/link";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Event } from "@/data/dummy";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
}

export default function EventCard({ event, variant = "default" }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: variant === "compact" ? 160 : 180 }}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
          {event.dateShort}
        </div>
        {/* Free badge */}
        {event.isFree && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
            FREE
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{event.time}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">{event.title}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Users size={11} className="flex-shrink-0" />
          <span>{event.attendees} Attendees</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm">
            {event.isFree ? "FREE" : `৳${event.price.toLocaleString()}`}
          </span>
          <Link
            href={`/events/${event.id}`}
            className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-black transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
