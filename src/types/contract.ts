export type ContractStatus =
  | "pending"
  | "signed"
  | "escrow_funded"
  | "completed"
  | "disputed"
  | "cancelled";

export interface Contract {
  id: string;
  contract_number: string;
  booking_id: string;
  gig_id: string;
  slot_id: string;
  dj_id: string;
  promoter_id: string;
  event_name: string;
  venue_name: string;
  slot_name: string;
  date: string;
  pay: number;
  payment_terms: string;
  dj_signed: boolean;
  promoter_signed: boolean;
  status: ContractStatus;
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}
