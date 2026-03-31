import { notFound } from "next/navigation";
import { RatingStars } from "@/components/rating-stars";
import { GenreTag } from "@/components/genre-tag";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

interface PublicProfilePageProps {
  params: Promise<{ id: string }>;
}

interface ProfileData {
  id: string;
  display_name: string;
  role: string;
  city: string;
  genres: string[];
  rating: number | null;
  gigs_completed: number | null;
  reliability: number | null;
  member_since: string | null;
  bio: string | null;
  badges: string[];
  equipment: string[];
  featured_mix: { title: string; duration: string; description: string } | null;
  social_links: { label: string; url: string }[] | null;
  avatar_url?: string;
}

interface BookingData {
  event_name: string;
  venue_name: string;
  date: string;
  slot_name: string;
  pay: number;
}

interface PlatformUser {
  id: string;
  displayName: string;
  role: "dj" | "promoter" | "venue" | "media";
  city: string;
  genres: string[];
  rating: number;
  gigsCompleted: number;
  reliability: number;
  memberSince: string;
  bio: string;
  badges: string[];
  equipment: string[];
  featuredMix: { title: string; duration: string; description: string };
  socialLinks: { label: string; url: string }[];
  pastGigs: {
    eventName: string;
    venue: string;
    date: string;
    slotType: string;
    fee: number;
  }[];
  reviews: any[];
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) {
    notFound();
  }

  const profileData = profile as unknown as ProfileData;

  const { data: completedBookings } = await supabase
    .from("bookings")
    .select("event_name, venue_name, slot_name, date, pay")
    .eq("user_id", id)
    .eq("status", "COMPLETED");

  const bookings = completedBookings as unknown as BookingData[] || [];

  const user: PlatformUser = {
    id: profileData.id,
    displayName: profileData.display_name,
    role: profileData.role as "dj" | "promoter" | "venue" | "media",
    city: profileData.city || "",
    genres: profileData.genres || [],
    rating: Number(profileData.rating) || 0,
    gigsCompleted: profileData.gigs_completed || 0,
    reliability: profileData.reliability || 100,
    memberSince: profileData.member_since || "2024",
    bio: profileData.bio || "",
    badges: profileData.badges || [],
    equipment: profileData.equipment || [],
    featuredMix: profileData.featured_mix || { title: "", duration: "", description: "" },
    socialLinks: profileData.social_links || [],
    pastGigs: bookings.map((b) => ({
      eventName: b.event_name,
      venue: b.venue_name,
      date: b.date,
      slotType: b.slot_name,
      fee: Number(b.pay),
    })),
    reviews: [],
  };

  return (
    <main className="max-w-[1440px] mx-auto px-6 pt-8 pb-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
        <div className="md:col-span-3">
          <div className="relative group">
            <div className="w-full aspect-square rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 bg-surface-container-high flex items-center justify-center">
              <span className="font-headline text-6xl font-bold text-primary/30">{user.displayName.charAt(0)}</span>
            </div>
            {user.badges.includes("Verified") && (
              <div className="absolute -bottom-4 -right-4 bg-primary-container p-3 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container font-bold">verified</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {user.genres.map((genre) => (
              <span key={genre} className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-mono rounded-full uppercase tracking-tighter">
                {genre}
              </span>
            ))}
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-on-surface mb-2">
            {user.displayName.toUpperCase()}
          </h1>
          <div className="flex items-center gap-2 text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-primary">location_on</span>
            {user.city.toUpperCase()}
          </div>
        </div>
        
        <div className="md:col-span-3 flex flex-col gap-4">
          <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(0,255,135,0.2)] hover:shadow-[0_0_40px_rgba(0,255,135,0.4)] transition-all active:scale-95">
            BOOK THIS {user.role.toUpperCase()}
          </button>
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-surface-bright transition-colors">
              MESSAGE
            </button>
            <button className="p-3 bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Ledger Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 rounded-xl overflow-hidden mb-12 border border-outline-variant/10">
        <div className="bg-surface-container-low p-6 flex flex-col gap-1">
          <span className="text-on-surface-variant font-mono text-[10px] uppercase tracking-[0.2em]">Gigs Completed</span>
          <span className="text-3xl font-mono text-primary">{user.gigsCompleted}</span>
        </div>
        <div className="bg-surface-container-low p-6 flex flex-col gap-1">
          <span className="text-on-surface-variant font-mono text-[10px] uppercase tracking-[0.2em]">Avg Rating</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-mono text-tertiary">{user.rating.toFixed(1)}</span>
            <span className="material-symbols-outlined text-tertiary text-sm">star</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 flex flex-col gap-1">
          <span className="text-on-surface-variant font-mono text-[10px] uppercase tracking-[0.2em]">Reliability</span>
          <span className="text-3xl font-mono text-on-surface">{user.reliability}%</span>
        </div>
        <div className="bg-surface-container-low p-6 flex flex-col gap-1">
          <span className="text-on-surface-variant font-mono text-[10px] uppercase tracking-[0.2em]">Member Since</span>
          <span className="text-3xl font-mono text-on-surface">{user.memberSince}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Bio & Past Performances */}
        <div className="md:col-span-8 space-y-12">
          {user.featuredMix?.title && (
            <div className="bg-surface-container-high rounded-xl p-8 border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-primary-container rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-on-primary-container text-4xl">play_arrow</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold">{user.featuredMix.title}</h3>
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
                    {user.featuredMix.description} / {user.featuredMix.duration}
                  </p>
                </div>
              </div>
              
              {/* Waveform Placeholder */}
              <div className="h-16 flex items-end gap-1 mb-4 opacity-60">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 ${i < 9 ? 'bg-primary' : 'bg-outline-variant'} rounded-full`}
                    style={{ height: `${Math.random() * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          <section>
            <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary"></span>
              BIOGRAPHY
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              {user.bio}
            </p>
          </section>

          {/* Past Gigs Table */}
          {user.pastGigs.length > 0 && (
            <section>
              <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span>
                PAST PERFORMANCES
              </h2>
              <div className="bg-surface-container-low rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container border-b border-outline-variant/10">
                    <tr>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Venue</th>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Date</th>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Set Time</th>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant text-right">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {user.pastGigs.map((gig) => (
                      <tr key={`${gig.eventName}-${gig.date}`} className="hover:bg-surface-container-high transition-colors">
                        <td className="p-4 font-medium">{gig.eventName}</td>
                        <td className="p-4 font-mono text-sm">{formatDate(gig.date)}</td>
                        <td className="p-4 font-mono text-sm text-secondary">{gig.slotType}</td>
                        <td className="p-4 font-mono text-sm text-right text-primary">${gig.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="md:col-span-4 space-y-8">
          {/* Badges Card */}
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6">Credentials</h3>
            <div className="space-y-4">
              {user.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary">verified</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{badge}</p>
                    <p className="text-xs text-on-surface-variant">Verified professional</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment List */}
          {user.equipment.length > 0 && (
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6">Equipment List</h3>
              <ul className="space-y-3">
                {user.equipment.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Icons */}
          {user.socialLinks.length > 0 && (
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6">Connect</h3>
              <div className="grid grid-cols-4 gap-4">
                {user.socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url}
                    className="aspect-square bg-surface-container-highest rounded-lg flex items-center justify-center hover:text-primary transition-colors border border-outline-variant/20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Live Ticker Divider */}
      <div className="ticker-wrap w-full bg-surface-container-highest border-y border-outline-variant/10 py-3 mt-12">
        <div className="ticker flex gap-12 items-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            AVAILABLE FOR BOOKINGS
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">MEMBER SINCE: {user.memberSince}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">NEXT PERFORMANCE: COMING SOON</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">AVERAGE SET DURATION: 180 MIN</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            AVAILABLE FOR BOOKINGS
          </span>
        </div>
      </div>
    </main>
  );
}
