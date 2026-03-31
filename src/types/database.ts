import type { Booking } from "@/types/booking";
import type { Gig } from "@/types/gig";
import type { PlatformUser } from "@/types/user";

export interface Database {
  public: {
    Tables: {
      gigs: {
        Row: Gig;
      };
      bookings: {
        Row: Booking;
      };
      profiles: {
        Row: PlatformUser;
      };
    };
  };
}
