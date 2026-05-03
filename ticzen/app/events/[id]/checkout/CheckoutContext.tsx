"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface TicketSelection {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface AttendeeInfo {
  ticketId: string;
  ticketIdx: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  postCode: string;
  ticketFor: "self" | "others" | "gift";
}

interface CheckoutState {
  selections: TicketSelection[];
  setSelections: (s: TicketSelection[]) => void;
  attendees: AttendeeInfo[];
  setAttendees: (a: AttendeeInfo[]) => void;
}

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<TicketSelection[]>([]);
  const [attendees, setAttendees] = useState<AttendeeInfo[]>([]);
  return (
    <CheckoutContext.Provider value={{ selections, setSelections, attendees, setAttendees }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
}
