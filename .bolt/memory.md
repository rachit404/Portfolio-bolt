# Project memory

## Product intent & audience

- Personal portfolio website built with Vite + React
- Goal: transform into a scrollable, timeline-driven, frame-based animated experience using Spider-Man imagery and frames
- Audience: portfolio visitors (likely recruiters/clients)

## Brand personality & voice

- Spider-Man themed visual narrative
- Story/timeline-driven presentation; scroll as the primary interaction metaphor

## Visual design & UX direction

- Scroll-scrubbed photo sequences used instead of video (stock libraries return stills)
- Experience section pattern: sticky/pinned photo panel on left, job cards scroll on right; photo, counter, and company name swap per job entry
- Timeline line and markers fill progressively with scroll
- Existing card styling preserved for consistency across the site
- Remaining sections (Hero, Projects, Education) not yet converted to frame-by-frame scroll story
- Images currently from stock libraries (Pexels) — city/web themed, not actual Spider-Man artwork

## Decisions, constraints & rationale

- Framework: Vite + React
- Chose scroll-scrubbed photo sequence over video because Pexels only provides still photos
- Kept existing component styles intact to maintain visual consistency
- Only Experience section converted so far; other sections intentionally left unchanged
- Actual Spider-Man artwork not used — stock substitutes used instead (likely licensing/availability constraint)
- Build passes successfully after Experience section rewrite

## Open questions & assumptions

- Whether to extend frame-by-frame scroll effect to Hero, Projects, and Education (user hasn't confirmed)
- Whether to source/replace stock images with actual Spider-Man artwork or approved assets
- Scroll effect not yet previewed in a browser — visual behavior unverified
- Licensing implications of using Spider-Man imagery not discussed