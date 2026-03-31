import type { Booking } from "@/types/booking";
import type { Gig } from "@/types/gig";
import type { PlatformUser } from "@/types/user";

export const gigFeedStats = [
  { label: "Open Gigs", value: "142", detail: "18 added this week", tone: "primary" },
  { label: "Avg. Pay / Night", value: "$640", detail: "Open format median", tone: "secondary" },
  { label: "Fill Rate", value: "94%", detail: "Strong weekend demand", tone: "tertiary" },
  { label: "Your Applications", value: "12", detail: "3 under review", tone: "neutral" },
] as const;

export const bookingStats = [
  { label: "Total Earned", value: "$18,420", detail: "Lifetime booked through Spinbook", tone: "primary" },
  { label: "Gigs Completed", value: "38", detail: "14 in the last 12 months", tone: "neutral" },
  { label: "Avg. Rating", value: "4.9", detail: "Promoter reviews", tone: "tertiary" },
  { label: "Reliability", value: "99%", detail: "No-show safe", tone: "secondary" },
] as const;

export const featuredGigs: Gig[] = [
  {
    id: "solstice-radio",
    eventName: "Solstice Radio",
    venueName: "Club Meridian",
    city: "Los Angeles, CA",
    promoterName: "Noir House Collective",
    promoter_id: "promoter-noir-house",
    date: "2026-04-18T22:00:00.000Z",
    timeLabel: "10:00 PM - 2:00 AM",
    address: "721 E 4th St, Los Angeles, CA 90013",
    status: "OPEN",
    genres: ["House", "Disco"],
    tags: ["Equipment provided", "Promo expected"],
    description:
      "A rooftop house session with a warm crowd, sharp production, and a promoter who books fast-moving, vocal-forward sets.",
    equipment: "Full CDJ setup, four channels, booth monitors, wired mic",
    promoExpectation: "Two story posts and one feed mention during announcement week.",
    applicantCount: 9,
    remainingSlots: 1,
    slots: [
      { id: "slot-1", name: "Opener", start: "10:00 PM", end: "11:00 PM", pay: 250, status: "filled", djName: "Mina Flux" },
      { id: "slot-2", name: "Main Room", start: "11:00 PM", end: "1:00 AM", pay: 700, status: "open" },
      { id: "slot-3", name: "Closer", start: "1:00 AM", end: "2:00 AM", pay: 350, status: "filled", djName: "Ash Orbit" },
    ],
  },
  {
    id: "after-hours-ledger",
    eventName: "After Hours Ledger",
    venueName: "Vault 89",
    city: "Chicago, IL",
    promoterName: "Circuit Works",
    promoter_id: "promoter-circuit",
    date: "2026-04-25T23:00:00.000Z",
    timeLabel: "11:00 PM - 3:00 AM",
    address: "144 W Hubbard St, Chicago, IL 60654",
    status: "URGENT",
    genres: ["Techno", "Industrial"],
    tags: ["Bring own controller", "Urgent fill"],
    description:
      "Warehouse-style event with a late opening slot after a last-minute cancellation. Heavy drums, high stamina, and clean transitions needed.",
    equipment: "Mixer and booth monitors provided. DJs bring USBs and controller if preferred.",
    promoExpectation: "No promo requirement. Focus is on a tight handoff and reliable arrival.",
    applicantCount: 17,
    remainingSlots: 1,
    slots: [
      { id: "slot-4", name: "Warm Up", start: "11:00 PM", end: "12:00 AM", pay: 300, status: "filled", djName: "Dahlia Cut" },
      { id: "slot-5", name: "Peak Slot", start: "12:00 AM", end: "1:30 AM", pay: 850, status: "open" },
      { id: "slot-6", name: "Closer", start: "1:30 AM", end: "3:00 AM", pay: 500, status: "filled", djName: "Core Memory" },
    ],
  },
  {
    id: "neon-market",
    eventName: "Neon Market",
    venueName: "The Echo Loft",
    city: "New York, NY",
    promoterName: "Midnight Bureau",
    promoter_id: "promoter-midnight",
    date: "2026-05-02T21:00:00.000Z",
    timeLabel: "9:00 PM - 1:00 AM",
    address: "118 Orchard St, New York, NY 10002",
    status: "OPEN",
    genres: ["Open Format", "Hip-Hop", "R&B"],
    tags: ["Equipment provided", "No promo required"],
    description:
      "High-energy cross-genre night with an audience that moves between throwbacks, edits, and current records all night.",
    equipment: "CDJs, Serato-ready mixer, wireless mic for host moments.",
    promoExpectation: "Optional promo support for DJs with strong local followings.",
    applicantCount: 6,
    remainingSlots: 2,
    slots: [
      { id: "slot-7", name: "Opening Set", start: "9:00 PM", end: "10:00 PM", pay: 225, status: "open" },
      { id: "slot-8", name: "Prime Set", start: "10:00 PM", end: "12:00 AM", pay: 650, status: "open" },
      { id: "slot-9", name: "Host Close", start: "12:00 AM", end: "1:00 AM", pay: 180, status: "filled", djName: "Jules FM" },
    ],
  },
];

export const bookings: Booking[] = [
  {
    id: "booking-1",
    gigId: "solstice-radio",
    eventName: "Solstice Radio",
    venueName: "Club Meridian",
    slotType: "Main Room",
    date: "2026-04-18T22:00:00.000Z",
    pay: 700,
    status: "PENDING CONTRACT",
    promoterName: "Noir House Collective",
    contractId: "SB-2048",
    reviewPending: false,
    timeline: [
      { label: "Application accepted", date: "2026-03-28", complete: true },
      { label: "Contract generated", date: "2026-03-29", complete: true },
      { label: "DJ signature", date: "2026-03-30", complete: false },
      { label: "Escrow release", date: "2026-04-19", complete: false },
    ],
  },
  {
    id: "booking-2",
    gigId: "neon-market",
    eventName: "Neon Market",
    venueName: "The Echo Loft",
    slotType: "Prime Set",
    date: "2026-05-02T21:00:00.000Z",
    pay: 650,
    status: "CONFIRMED",
    promoterName: "Midnight Bureau",
    contractId: "SB-2051",
    timeline: [
      { label: "Application accepted", date: "2026-03-24", complete: true },
      { label: "Contract signed", date: "2026-03-26", complete: true },
      { label: "Escrow funded", date: "2026-03-27", complete: true },
      { label: "Show night", date: "2026-05-02", complete: false },
    ],
  },
  {
    id: "booking-3",
    gigId: "warehouse-signal",
    eventName: "Warehouse Signal",
    venueName: "Pier Loop",
    slotType: "Closer",
    date: "2026-03-14T23:00:00.000Z",
    pay: 900,
    status: "PAID",
    promoterName: "Circuit Works",
    contractId: "SB-2033",
    reviewPending: true,
    timeline: [
      { label: "Contract signed", date: "2026-02-22", complete: true },
      { label: "Escrow funded", date: "2026-02-23", complete: true },
      { label: "Performance completed", date: "2026-03-14", complete: true },
      { label: "Funds released", date: "2026-03-15", complete: true },
    ],
  },
];

export const currentUser: PlatformUser = {
  id: "dj-nova",
  displayName: "Nova Vale",
  role: "dj",
  city: "Los Angeles, CA",
  genres: ["House", "Open Format", "Disco"],
  rating: 4.9,
  gigsCompleted: 38,
  reliability: 99,
  memberSince: "2022",
  bio:
    "Nova Vale plays emotionally precise, high-conversion club sets that move from warm-up texture into peak-time release without losing the room.",
  badges: ["Verified", "Trusted", "Elite"],
  equipment: ["Pioneer XDJ-RX3", "Shure in-ear monitors", "Wireless mic", "USB / Rekordbox prep"],
  featuredMix: {
    title: "Floor Language Vol. 12",
    duration: "58 min",
    description: "A sleek house and disco blend recorded live after a sold-out Friday at Club Meridian.",
  },
  socialLinks: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "SoundCloud", url: "https://soundcloud.com" },
    { label: "Mixcloud", url: "https://mixcloud.com" },
    { label: "Spotify", url: "https://spotify.com" },
  ],
  pastGigs: [
    { eventName: "Warehouse Signal", venue: "Pier Loop", date: "2026-03-14", slotType: "Closer", fee: 900 },
    { eventName: "No Vacancy Sundays", venue: "Hotel Pacific", date: "2026-02-22", slotType: "Prime Set", fee: 600 },
    { eventName: "Mirror Room", venue: "Aster Hall", date: "2026-02-08", slotType: "Opener", fee: 300 },
  ],
  reviews: [
    {
      author: "Jade Morrow",
      eventName: "Warehouse Signal",
      rating: 5,
      body: "Showed up early, understood the room instantly, and handled a delayed schedule with zero stress.",
    },
    {
      author: "Noir House Collective",
      eventName: "Sunset Ledger",
      rating: 5,
      body: "Sharp transitions, excellent communication, and a set that kept the dance floor warm from open to close.",
    },
  ],
};

export const promoterProfile: PlatformUser = {
  ...currentUser,
  id: "promoter-noir-house",
  displayName: "Noir House Collective",
  role: "promoter",
  city: "Los Angeles, CA",
  genres: ["House", "Disco", "Open Format"],
  bio:
    "Independent promoter collective focused on dependable, design-forward nightlife. We book DJs who are punctual, collaborative, and great with diverse rooms.",
  badges: ["Verified", "Trusted"],
};

export const inboxThreads = [
  {
    id: "thread-1",
    name: "Noir House Collective",
    preview: "Contract is ready whenever you are.",
    time: "5m",
    unread: 2,
  },
  {
    id: "thread-2",
    name: "Midnight Bureau",
    preview: "Can you share your clean intro mix?",
    time: "42m",
    unread: 0,
  },
  {
    id: "thread-3",
    name: "Circuit Works",
    preview: "Thanks again for the set last Friday.",
    time: "1d",
    unread: 0,
  },
] as const;

export const walletActivity = [
  {
    id: "wallet-1",
    label: "Escrow released",
    eventName: "Warehouse Signal",
    amount: 900,
    date: "2026-03-15",
    status: "Settled",
  },
  {
    id: "wallet-2",
    label: "Escrow funded",
    eventName: "Neon Market",
    amount: 650,
    date: "2026-03-27",
    status: "Held",
  },
  {
    id: "wallet-3",
    label: "Platform payout",
    eventName: "No Vacancy Sundays",
    amount: 600,
    date: "2026-02-23",
    status: "Settled",
  },
] as const;
