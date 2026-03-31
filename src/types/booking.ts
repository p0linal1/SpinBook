export type BookingStatus =
  | "CONFIRMED"
  | "PENDING CONTRACT"
  | "PAID"
  | "COMPLETED"
  | "DISPUTED";

export interface BookingTimelineItem {
  label: string;
  date: string;
  complete: boolean;
}

export interface Booking {
  id: string;
  gigId: string;
  eventName: string;
  venueName: string;
  slotType: string;
  date: string;
  pay: number;
  status: BookingStatus;
  promoterName: string;
  contractId: string;
  reviewPending?: boolean;
  timeline: BookingTimelineItem[];
}
