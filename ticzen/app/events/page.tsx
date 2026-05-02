import { getEvents } from "@/lib/api";
import EventsClient from "./EventsClient";

export default async function AllEventsPage() {
  const events = await getEvents();

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventsClient events={events} />
      </div>
    </main>
  );
}
