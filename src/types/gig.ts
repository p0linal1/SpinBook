export type GigStatus = "OPEN" | "FILLED" | "URGENT";
export type SlotStatus = "open" | "filled";

export interface GigSlot {
  id: string;
  name: string;
  start: string;
  end: string;
  pay: number;
  status: SlotStatus;
  djName?: string;
  dj_id?: string;
}

export interface Gig {
  id: string;
  eventName: string;
  venueName: string;
  city: string;
  promoterName: string;
  promoter_id: string;
  date: string;
  timeLabel: string;
  address: string;
  status: GigStatus;
  genres: string[];
  tags: string[];
  description: string;
  equipment: string;
  promoExpectation: string;
  applicantCount: number;
  remainingSlots: number;
  slots: GigSlot[];
  created_at?: string;
}
