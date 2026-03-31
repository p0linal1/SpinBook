export type UserRole = "dj" | "promoter" | "venue" | "media";

export interface FeaturedMix {
  title: string;
  duration: string;
  description: string;
}

export interface PastGig {
  eventName: string;
  venue: string;
  date: string;
  slotType: string;
  fee: number;
}

export interface Review {
  author: string;
  eventName: string;
  rating: number;
  body: string;
}

export interface PlatformUser {
  id: string;
  displayName: string;
  role: UserRole;
  city: string;
  genres: string[];
  rating: number;
  gigsCompleted: number;
  reliability: number;
  memberSince: string;
  bio: string;
  badges: string[];
  equipment: string[];
  featuredMix: FeaturedMix;
  socialLinks: { label: string; url: string }[];
  pastGigs: PastGig[];
  reviews: Review[];
  email?: string;
  avatar_url?: string;
  stripe_account_id?: string;
  stripe_onboarded?: boolean;
  created_at?: string;
}
