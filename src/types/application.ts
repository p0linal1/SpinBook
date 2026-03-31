export type ApplicationStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export interface Application {
  id: string;
  gig_id: string;
  slot_id: string;
  applicant_id: string;
  applicant_name: string;
  applicant_role: "dj" | "media";
  mix_link?: string;
  note?: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}
