// ─────────────────────────────────────────────────────────────────────────────
// API service layer
//
// Every function here currently returns dummy data.
// To connect to a real backend, replace the import and return statements:
//
//   BEFORE:  return events;
//   AFTER:   const res = await fetch(`${BASE_URL}/events`); return res.json();
//
// The BASE_URL can be set via NEXT_PUBLIC_API_URL in .env.local
// ─────────────────────────────────────────────────────────────────────────────

import {
  events,
  categories,
  trips,
  customerReviews,
  faqs,
  type Event,
  type Category,
  type TripDestination,
  type CustomerReview,
  type FAQ,
} from "@/data/dummy";

// Uncomment and set in .env.local to use a real API:
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getEvents(filters?: {
  category?: string;
  isFree?: boolean;
  query?: string;
}): Promise<Event[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/events`); return res.json();
  let result = [...events];
  if (filters?.category) result = result.filter((e) => e.category === filters.category);
  if (filters?.isFree !== undefined) result = result.filter((e) => e.isFree === filters.isFree);
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
  }
  return result;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  // Replace with: const res = await fetch(`${BASE_URL}/events/${id}`); return res.json();
  return events.find((e) => e.id === id);
}

export async function getFeaturedEvents(): Promise<Event[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/events/featured`); return res.json();
  return events.slice(0, 6);
}

export async function getCategories(): Promise<Category[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/categories`); return res.json();
  return categories;
}

export async function getTrips(): Promise<TripDestination[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/trips`); return res.json();
  return trips;
}

export async function getCustomerReviews(): Promise<CustomerReview[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/reviews`); return res.json();
  return customerReviews;
}

export async function getFAQs(): Promise<FAQ[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/faqs`); return res.json();
  return faqs;
}

export async function getSimilarEvents(id: string): Promise<Event[]> {
  // Replace with: const res = await fetch(`${BASE_URL}/events/${id}/similar`); return res.json();
  return events.filter((e) => e.id !== id).slice(0, 4);
}
