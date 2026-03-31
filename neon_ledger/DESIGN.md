```markdown
# Design System Strategy: The Kinetic Ledger

## 1. Overview & Creative North Star
**The Creative North Star: "The Kinetic Ledger"**
This design system sits at the high-tension intersection of precise financial utility and the raw, atmospheric energy of a midnight set. We are moving away from the "SaaS template" look. Instead of static grids, we embrace a layout that feels like a live data stream—fluid, dark, and high-contrast. 

The aesthetic is **"Fintech meets Nightlife."** We use the structural discipline of *Stripe* (clean lines, sophisticated type scales) and infuse it with the sensory grit of *Resident Advisor* (deep blacks, neon accents, and high-density information). This system breaks the "template" through intentional asymmetry, where data points are treated as editorial elements and cards pulse with "glow" states rather than heavy shadows.

---

## 2. Colors: Depth in the Void
We do not use true black (#000000) for surfaces; we use a curated obsidian palette to allow for depth perception in the dark.

### The Palette
- **Background & Surface:** Base is `#0e0e0e`. Depth is built through the `surface-container` tiers.
- **Primary (Electric Green):** `#00FF87` (mapped to `primary_container`). This is our "action" color. It should feel radioactive against the dark background.
- **Secondary (Midnight Purple):** `#be82ff`. Reserved for genre categorization and artistic metadata.
- **Tertiary (Neon Orange):** `#ffa44c`. Used exclusively for ratings, warnings, and high-priority alerts.

### The Rules of Engagement
- **The "No-Line" Rule:** Prohibit the use of 1px solid borders for sectioning. Boundaries must be defined through background color shifts. A `surface-container-low` section sitting on a `surface` background is the only way to divide the "dance floor" from the "VIP area."
- **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of tinted acrylic. Use `surface-container-lowest` for the main background and `surface-container-high` for interactive cards. Each inner container must be a step higher in the tier to define importance.
- **The "Glass & Gradient" Rule:** Use Glassmorphism for floating overlays. Apply a `surface-variant` color at 40% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** Main CTAs should not be flat. Use a subtle linear gradient from `primary` (#a4ffb9) to `primary_container` (#00fd86) at a 135-degree angle to give buttons a "lit from within" glow.

---

## 3. Typography: Editorial Precision
The typography is a dialogue between the "Human" (Sans-Serif) and the "Machine" (Monospace).

- **Headlines (Space Grotesk):** Bold, geometric, and loud. Use `display-lg` for hero statements. These should feel like a festival poster—aggressive and authoritative.
- **Data & Money (Monospace/Inter):** While the system defaults to Inter for readability, all financial figures, timestamps, and BPM data must utilize a Monospace stylistic set. This reinforces the "Ledger" aspect of the brand.
- **Hierarchy:**
    - **Display/Headline:** Space Grotesk. High tracking (letter-spacing: -0.02em) to feel compact and premium.
    - **Body/Title:** Inter. Use for descriptions and labels. 
    - **Labels:** `label-sm` in all-caps with +0.05em tracking for a "technical spec" feel.

---

## 4. Elevation & Depth: Tonal Layering
In a dark theme, traditional drop shadows are often invisible or "muddy." We use light, not shadow, to create height.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a "recessed" look. To "lift" a card, use `surface-container-highest`.
- **Ambient Glows:** When a card is hovered, do not use a black shadow. Use a 4% opacity glow of the `primary` (#00FF87) color with a `40px` blur. This mimics the neon light of a club environment.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at 15% opacity. It should be felt, not seen.
- **Glassmorphism:** Use for navigation bars and sidebars. It allows the "energy" of the content colors to bleed through as the user scrolls, keeping the experience immersive.

---

## 5. Components: The Industrial Kit
Everything is icon and data-driven. Zero stock photography.

- **Buttons:**
    - **Primary:** High-gloss gradient (`primary` to `primary_container`). 12px corner radius (`md`). 
    - **Secondary:** `surface-container-highest` background with a `primary` ghost border.
- **Cards:** Forbid divider lines. Use `16px` (`lg`) corner radius. On hover, the border-opacity of the "Ghost Border" increases from 15% to 40%, and the internal `primary` glow activates.
- **Genre Chips:** Use `secondary_container` (Purple) with `on_secondary` text. Roundedness: `full`.
- **Rating Chips:** Use `tertiary_container` (Orange). Use a monospace font for the numerical value to emphasize the "score."
- **Input Fields:** `surface-container-low` backgrounds. No borders until focused. On focus, the border turns `primary` (Electric Green) with a 2px outer "neon" glow.
- **The "Live Ticker":** A custom component for this system. A scrolling horizontal bar of data (prices, dates, genres) using `label-sm` monospace type, acting as a divider between major sections.

---

## 6. Do’s and Don’ts

### Do:
- **Use Asymmetry:** Align text to the left but place data/prices in the far-right corner of cards to create tension.
- **Embrace High Density:** This is for power users. Information should be compact, using the `1.5` to `3` spacing tokens.
- **Iconography:** Use sharp, 2px stroke weight icons. Match icon color to the context (e.g., green for growth/success, orange for alerts).

### Don’t:
- **No Stock Photos:** Use data visualizations, waveforms, or abstract generative shapes if a visual is needed.
- **No Divider Lines:** If you feel the need to add a line, add `1rem` (16px) of vertical space instead.
- **No Pure Grey:** Every "neutral" in this system is slightly tinted with a cool obsidian blue to keep the dark theme from feeling "dead."
- **No Soft Corners:** Avoid `xl` (24px) or `full` roundedness on cards; keep them at `lg` (16px) to maintain a tech-focused, architectural edge.