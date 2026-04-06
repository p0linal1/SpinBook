-- SpinBook Phase 1 MVP Schema

-- Contract number sequence
CREATE SEQUENCE IF NOT EXISTS contract_number_seq START WITH 3000;

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('dj', 'promoter', 'venue', 'media')),
  city text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  genres text[] NOT NULL DEFAULT '{}',
  equipment text[] NOT NULL DEFAULT '{}',
  badges text[] NOT NULL DEFAULT '{}',
  social_links jsonb NOT NULL DEFAULT '[]',
  rating numeric NOT NULL DEFAULT 0,
  gigs_completed integer NOT NULL DEFAULT 0,
  reliability integer NOT NULL DEFAULT 100,
  member_since text NOT NULL DEFAULT to_char(now(), 'YYYY'),
  avatar_url text,
  stripe_account_id text,
  stripe_onboarded boolean NOT NULL DEFAULT false,
  featured_mix jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email, role, city)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'dj'),
    COALESCE(NEW.raw_user_meta_data->>'city', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Gigs
CREATE TABLE public.gigs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  venue_name text NOT NULL,
  city text NOT NULL,
  promoter_id uuid NOT NULL REFERENCES public.profiles(id),
  date timestamptz NOT NULL,
  time_label text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'FILLED', 'URGENT')),
  genres text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  equipment text NOT NULL DEFAULT '',
  promo_expectation text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gigs are viewable by everyone"
  ON public.gigs FOR SELECT USING (true);

CREATE POLICY "Promoters can insert own gigs"
  ON public.gigs FOR INSERT WITH CHECK (auth.uid() = promoter_id);

CREATE POLICY "Promoters can update own gigs"
  ON public.gigs FOR UPDATE USING (auth.uid() = promoter_id);

-- Gig Slots
CREATE TABLE public.gig_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id uuid NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  pay numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'filled')),
  assigned_user_id uuid REFERENCES public.profiles(id),
  assigned_user_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gig_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gig slots are viewable by everyone"
  ON public.gig_slots FOR SELECT USING (true);

CREATE POLICY "Promoters can insert slots for own gigs"
  ON public.gig_slots FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.gigs WHERE id = gig_id AND promoter_id = auth.uid())
  );

CREATE POLICY "Promoters can update slots for own gigs"
  ON public.gig_slots FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.gigs WHERE id = gig_id AND promoter_id = auth.uid())
  );

-- Applications
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id uuid NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
  slot_id uuid NOT NULL REFERENCES public.gig_slots(id) ON DELETE CASCADE,
  applicant_id uuid NOT NULL REFERENCES public.profiles(id),
  applicant_name text NOT NULL,
  applicant_role text NOT NULL CHECK (applicant_role IN ('dj', 'media')),
  mix_link text,
  note text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slot_id, applicant_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON public.applications FOR SELECT USING (
    auth.uid() = applicant_id
    OR EXISTS (SELECT 1 FROM public.gigs WHERE id = gig_id AND promoter_id = auth.uid())
  );

CREATE POLICY "Authenticated users can insert applications"
  ON public.applications FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Application owners can update own applications"
  ON public.applications FOR UPDATE USING (
    auth.uid() = applicant_id
    OR EXISTS (SELECT 1 FROM public.gigs WHERE id = gig_id AND promoter_id = auth.uid())
  );

-- Bookings
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id uuid NOT NULL REFERENCES public.gigs(id),
  slot_id uuid NOT NULL REFERENCES public.gig_slots(id),
  user_id uuid NOT NULL REFERENCES public.profiles(id),
  promoter_id uuid NOT NULL REFERENCES public.profiles(id),
  event_name text NOT NULL,
  venue_name text NOT NULL,
  slot_name text NOT NULL,
  date timestamptz NOT NULL,
  pay numeric NOT NULL,
  status text NOT NULL DEFAULT 'PENDING CONTRACT' CHECK (status IN ('CONFIRMED', 'PENDING CONTRACT', 'PAID', 'COMPLETED', 'DISPUTED')),
  contract_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT USING (
    auth.uid() = user_id OR auth.uid() = promoter_id
  );

CREATE POLICY "System can insert bookings"
  ON public.bookings FOR INSERT WITH CHECK (
    auth.uid() = promoter_id
  );

CREATE POLICY "Involved parties can update bookings"
  ON public.bookings FOR UPDATE USING (
    auth.uid() = user_id OR auth.uid() = promoter_id
  );

-- Contracts
CREATE TABLE public.contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number text NOT NULL UNIQUE DEFAULT ('SB-' || nextval('contract_number_seq')::text),
  booking_id uuid NOT NULL REFERENCES public.bookings(id),
  gig_id uuid NOT NULL REFERENCES public.gigs(id),
  slot_id uuid NOT NULL REFERENCES public.gig_slots(id),
  dj_id uuid NOT NULL REFERENCES public.profiles(id),
  promoter_id uuid NOT NULL REFERENCES public.profiles(id),
  event_name text NOT NULL,
  venue_name text NOT NULL,
  slot_name text NOT NULL,
  date timestamptz NOT NULL,
  pay numeric NOT NULL,
  payment_terms text NOT NULL DEFAULT 'Funds held in escrow and released within 24 hours of completion.',
  dj_signed boolean NOT NULL DEFAULT false,
  promoter_signed boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'escrow_funded', 'completed', 'disputed', 'cancelled')),
  stripe_payment_intent_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Involved parties can view contracts"
  ON public.contracts FOR SELECT USING (
    auth.uid() = dj_id OR auth.uid() = promoter_id
  );

CREATE POLICY "System can insert contracts"
  ON public.contracts FOR INSERT WITH CHECK (
    auth.uid() = promoter_id
  );

CREATE POLICY "Involved parties can update contracts"
  ON public.contracts FOR UPDATE USING (
    auth.uid() = dj_id OR auth.uid() = promoter_id
  );

-- Add FK from bookings.contract_id -> contracts (must be after contracts table is created)
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_contract_id_fkey
  FOREIGN KEY (contract_id) REFERENCES public.contracts(id);

-- RPC: Accept application atomically
CREATE OR REPLACE FUNCTION public.accept_application(
  p_application_id uuid,
  p_promoter_id uuid
)
RETURNS jsonb AS $$
DECLARE
  v_app record;
  v_gig record;
  v_slot record;
  v_booking_id uuid;
  v_contract_id uuid;
BEGIN
  -- Get application
  SELECT * INTO v_app FROM public.applications WHERE id = p_application_id AND status = 'pending';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or not pending';
  END IF;

  -- Get gig and verify promoter
  SELECT * INTO v_gig FROM public.gigs WHERE id = v_app.gig_id AND promoter_id = p_promoter_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Not authorized to accept this application';
  END IF;

  -- Get slot and verify it's open
  SELECT * INTO v_slot FROM public.gig_slots WHERE id = v_app.slot_id AND status = 'open';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Slot is no longer open';
  END IF;

  -- Update slot to filled
  UPDATE public.gig_slots
  SET status = 'filled', assigned_user_id = v_app.applicant_id, assigned_user_name = v_app.applicant_name
  WHERE id = v_app.slot_id;

  -- Accept this application
  UPDATE public.applications SET status = 'accepted', updated_at = now() WHERE id = p_application_id;

  -- Reject other pending applications for this slot
  UPDATE public.applications SET status = 'rejected', updated_at = now()
  WHERE slot_id = v_app.slot_id AND id != p_application_id AND status = 'pending';

  -- Create booking
  INSERT INTO public.bookings (gig_id, slot_id, user_id, promoter_id, event_name, venue_name, slot_name, date, pay, status)
  VALUES (v_gig.id, v_slot.id, v_app.applicant_id, p_promoter_id, v_gig.event_name, v_gig.venue_name, v_slot.name, v_gig.date, v_slot.pay, 'PENDING CONTRACT')
  RETURNING id INTO v_booking_id;

  -- Create contract
  INSERT INTO public.contracts (booking_id, gig_id, slot_id, dj_id, promoter_id, event_name, venue_name, slot_name, date, pay)
  VALUES (v_booking_id, v_gig.id, v_slot.id, v_app.applicant_id, p_promoter_id, v_gig.event_name, v_gig.venue_name, v_slot.name, v_gig.date, v_slot.pay)
  RETURNING id INTO v_contract_id;

  -- Link contract to booking
  UPDATE public.bookings SET contract_id = v_contract_id WHERE id = v_booking_id;

  -- Check if all slots filled, update gig status
  IF NOT EXISTS (SELECT 1 FROM public.gig_slots WHERE gig_id = v_gig.id AND status = 'open') THEN
    UPDATE public.gigs SET status = 'FILLED' WHERE id = v_gig.id;
  END IF;

  RETURN jsonb_build_object('booking_id', v_booking_id, 'contract_id', v_contract_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
