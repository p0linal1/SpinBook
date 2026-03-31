export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          gig_id: string
          slot_id: string
          applicant_id: string
          applicant_name: string
          applicant_role: 'dj' | 'media'
          mix_link: string | null
          note: string | null
          status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gig_id: string
          slot_id: string
          applicant_id: string
          applicant_name: string
          applicant_role: 'dj' | 'media'
          mix_link?: string | null
          note?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gig_id?: string
          slot_id?: string
          applicant_id?: string
          applicant_name?: string
          applicant_role?: 'dj' | 'media'
          mix_link?: string | null
          note?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_gig_id_fkey"
            columns: ["gig_id"]
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_slot_id_fkey"
            columns: ["slot_id"]
            referencedRelation: "gig_slots"
            referencedColumns: ["id"]
          }
        ]
      }
      bookings: {
        Row: {
          id: string
          gig_id: string
          slot_id: string
          user_id: string
          promoter_id: string
          event_name: string
          venue_name: string
          slot_name: string
          date: string
          pay: number
          status: 'CONFIRMED' | 'PENDING CONTRACT' | 'PAID' | 'COMPLETED' | 'DISPUTED'
          contract_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          gig_id: string
          slot_id: string
          user_id: string
          promoter_id: string
          event_name: string
          venue_name: string
          slot_name: string
          date: string
          pay: number
          status?: 'CONFIRMED' | 'PENDING CONTRACT' | 'PAID' | 'COMPLETED' | 'DISPUTED'
          contract_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          gig_id?: string
          slot_id?: string
          user_id?: string
          promoter_id?: string
          event_name?: string
          venue_name?: string
          slot_name?: string
          date?: string
          pay?: number
          status?: 'CONFIRMED' | 'PENDING CONTRACT' | 'PAID' | 'COMPLETED' | 'DISPUTED'
          contract_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_gig_id_fkey"
            columns: ["gig_id"]
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_promoter_id_fkey"
            columns: ["promoter_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            referencedRelation: "gig_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      contracts: {
        Row: {
          id: string
          contract_number: string
          booking_id: string
          gig_id: string
          slot_id: string
          dj_id: string
          promoter_id: string
          event_name: string
          venue_name: string
          slot_name: string
          date: string
          pay: number
          payment_terms: string
          dj_signed: boolean
          promoter_signed: boolean
          status: 'pending' | 'signed' | 'escrow_funded' | 'completed' | 'disputed' | 'cancelled'
          stripe_payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contract_number?: string
          booking_id: string
          gig_id: string
          slot_id: string
          dj_id: string
          promoter_id: string
          event_name: string
          venue_name: string
          slot_name: string
          date: string
          pay: number
          payment_terms?: string
          dj_signed?: boolean
          promoter_signed?: boolean
          status?: 'pending' | 'signed' | 'escrow_funded' | 'completed' | 'disputed' | 'cancelled'
          stripe_payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contract_number?: string
          booking_id?: string
          gig_id?: string
          slot_id?: string
          dj_id?: string
          promoter_id?: string
          event_name?: string
          venue_name?: string
          slot_name?: string
          date?: string
          pay?: number
          payment_terms?: string
          dj_signed?: boolean
          promoter_signed?: boolean
          status?: 'pending' | 'signed' | 'escrow_funded' | 'completed' | 'disputed' | 'cancelled'
          stripe_payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_booking_id_fkey"
            columns: ["booking_id"]
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_dj_id_fkey"
            columns: ["dj_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_gig_id_fkey"
            columns: ["gig_id"]
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_promoter_id_fkey"
            columns: ["promoter_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_slot_id_fkey"
            columns: ["slot_id"]
            referencedRelation: "gig_slots"
            referencedColumns: ["id"]
          }
        ]
      }
      gig_slots: {
        Row: {
          id: string
          gig_id: string
          name: string
          start_time: string
          end_time: string
          pay: number
          status: 'open' | 'filled'
          assigned_user_id: string | null
          assigned_user_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          gig_id: string
          name: string
          start_time: string
          end_time: string
          pay?: number
          status?: 'open' | 'filled'
          assigned_user_id?: string | null
          assigned_user_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          gig_id?: string
          name?: string
          start_time?: string
          end_time?: string
          pay?: number
          status?: 'open' | 'filled'
          assigned_user_id?: string | null
          assigned_user_name?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_slots_assigned_user_id_fkey"
            columns: ["assigned_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gig_slots_gig_id_fkey"
            columns: ["gig_id"]
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          }
        ]
      }
      gigs: {
        Row: {
          id: string
          event_name: string
          venue_name: string
          city: string
          promoter_id: string
          date: string
          time_label: string
          address: string
          status: 'OPEN' | 'FILLED' | 'URGENT'
          genres: string[]
          tags: string[]
          description: string
          equipment: string
          promo_expectation: string
          created_at: string
        }
        Insert: {
          id?: string
          event_name: string
          venue_name: string
          city: string
          promoter_id: string
          date: string
          time_label?: string
          address?: string
          status?: 'OPEN' | 'FILLED' | 'URGENT'
          genres?: string[]
          tags?: string[]
          description?: string
          equipment?: string
          promo_expectation?: string
          created_at?: string
        }
        Update: {
          id?: string
          event_name?: string
          venue_name?: string
          city?: string
          promoter_id?: string
          date?: string
          time_label?: string
          address?: string
          status?: 'OPEN' | 'FILLED' | 'URGENT'
          genres?: string[]
          tags?: string[]
          description?: string
          equipment?: string
          promo_expectation?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigs_promoter_id_fkey"
            columns: ["promoter_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          display_name: string
          email: string
          role: 'dj' | 'promoter' | 'venue' | 'media'
          city: string
          bio: string
          genres: string[]
          equipment: string[]
          badges: string[]
          social_links: Json
          rating: number
          gigs_completed: number
          reliability: number
          member_since: string
          avatar_url: string | null
          stripe_account_id: string | null
          stripe_onboarded: boolean
          featured_mix: Json | null
          created_at: string
        }
        Insert: {
          id: string
          display_name: string
          email: string
          role: 'dj' | 'promoter' | 'venue' | 'media'
          city?: string
          bio?: string
          genres?: string[]
          equipment?: string[]
          badges?: string[]
          social_links?: Json
          rating?: number
          gigs_completed?: number
          reliability?: number
          member_since?: string
          avatar_url?: string | null
          stripe_account_id?: string | null
          stripe_onboarded?: boolean
          featured_mix?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          email?: string
          role?: 'dj' | 'promoter' | 'venue' | 'media'
          city?: string
          bio?: string
          genres?: string[]
          equipment?: string[]
          badges?: string[]
          social_links?: Json
          rating?: number
          gigs_completed?: number
          reliability?: number
          member_since?: string
          avatar_url?: string | null
          stripe_account_id?: string | null
          stripe_onboarded?: boolean
          featured_mix?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_application: {
        Args: {
          p_application_id: string
          p_promoter_id: string
        }
        Returns: {
          booking_id: string
          contract_id: string
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Type assertion helper functions
export function asTable<T extends keyof Database['public']['Tables']>(
  tableName: T,
  data: any
): Database['public']['Tables'][T]['Row'] {
  return data as Database['public']['Tables'][T]['Row'];
}

export function asTables<T extends keyof Database['public']['Tables']>(
  tableName: T,
  data: any[]
): Database['public']['Tables'][T]['Row'][] {
  return data as Database['public']['Tables'][T]['Row'][];
}
