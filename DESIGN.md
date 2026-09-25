---
name: Estationic (marketing site)
description: A quiet monochrome blueprint where one red box does the work.
colors:
  ground: "#fcfcfc"
  surface: "#ffffff"
  ink: "#151515"
  ink-2: "#2a2a2a"
  body: "#5f5f5f"
  muted: "#767676"
  faint: "#8a8a8a"
  line: "#ebebeb"
  line-2: "#dedede"
  tag-fill: "#f0f0f0"
  signal-red: "#e2332a"
typography:
  display:
    fontFamily: "Space Grotesk Variable, Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.3rem + 4.6vw, 4.4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Space Grotesk Variable, Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.25rem + 3vw, 3.45rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.034em"
  numeral:
    fontFamily: "Space Grotesk Variable, Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "54px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.045em"
    fontFeature: "tnum"
  title:
    fontFamily: "Space Grotesk Variable, Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.006em"
  tag:
    fontFamily: "Inter Variable, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  card: "3px"
  tag: "4px"
  button: "5px"
spacing:
  gap-tight: "8px"
  gap-grid: "12px"
  head-gap: "20px"
  gutter: "30px"
  gutter-compact: "18px"
  split-gap: "56px"
  head-bottom: "64px"
  section: "128px"
  section-compact: "84px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#2d2d2d"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.ink}"
  tab-active:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "18px 20px 20px"
  accordion-item:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "22px 24px"
  tag-plan:
    backgroundColor: "{colors.tag-fill}"
    textColor: "#3a3a3a"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "0 9px"
    height: "24px"
  tag-popular:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.surface}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "0 9px"
    height: "24px"
  nav:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.body}"
    height: "76px"
---

# Design System: Estationic (marketing site)

Scope: the standalone Vite + React marketing site in `website/`. The Next.js console has its own, different system in `D:\estationic\DESIGN.md` and `design-system/estationic-console/`. Neither inherits from the other; in particular the console's one near-black card per group is not a device on this site.

## Overview

**Creative North Star: "The Blueprint With One Red Box"**

The page is a technical drawing on near-white stock. Two full-height hairline rails bound the content column, and every full-width rule that crosses them is pinned with a small plus crosshair, the way a draughtsman marks registration. Inside that frame everything is ink, grey and hairline. The imagery is a family of isometric line-art machines built from one toolkit (`src/lib/iso.tsx`, `src/lib/parts.tsx`), so line weight, shading and corner language never vary. The only chromatic colour on the page is signal red, and it lives on the E box and on whatever is live: packets riding wires, the walking lead token, timer bars, pulse rings.

Density is marketing-generous: 128px between sections, a centred two-line heading with one short body sentence, one idea per band, and a scene under or beside it that acts the idea out. Motion has one entrance grammar (words sharpening out of blur) plus looping machine motion that pauses off screen and never starts under reduced motion.

The page runs as a single story, in this order (`src/App.tsx`), each band separated by a crosshaired rule:

1. **Hero.** Centred two-line H1, lede, black "Book a demo" and outline "See how it works". Below, a full-width conveyor carries channel tiles (Meta, Instagram, Google, WhatsApp, portals) into a black machine topped by the red E box, which emits three pads rising right: Lead qualified, Site visit booked, Unit booked (the last one inked, with a red progress line).
2. **Logos.** A 42s marquee of customer wordmarks under a one-line label.
3. **Marketing** (`#marketing`). A vertical list of four timed tabs beside a cross-fading scene: Create (a render and a price go into the engine and come out as story, feed post and banner), Publish (formats go through the engine to four platform chips, three live and one paused), Budget (four campaign budgets, spend flowing from the weaker to the stronger along a red dashed line), Capture (six sources flow into one queue, newest row marked).
4. **Sales** (`#sales`). A rising walkway of six stations (handset, qualification card beside your team's desk, WhatsApp stack, site pin with the day-before location card, signed agreement and key, sprout for nurturing) and a red lead token that walks to the active station, which inks and pulses. A six-column hairline stepper sits beneath as its tablist.
5. **Autopilot** (`#autopilot`). A wide scene of three routes leaving the engine (to a pad of calls, WhatsApp and reminders that run on their own; to an approval gate holding a post; to your team's desk), then a three-lane hairline table with the same three columns in the same order.
6. **Compliance** (`#compliance`). A timed accordion of six checks beside a framed hub scene whose six satellites are the six checks; the open check inks its satellite and sends a red packet to it.
7. **Stats.** A heading that inks in letter by letter on scroll, then four hairline-divided counters.
8. **Integrations** (`#integrations`). The engine in a glass case on a black plinth, Meta's family on one side and Google plus the CRM on the other, wired in with red packets.
9. **Pricing** (`#pricing`). Three hairline-divided plans; only the popular one carries a black button and the red tag.
10. **FAQ** (`#faq`). A sticky intro beside stacked white accordion items.
11. **CTA.** A two-line closing title over a fading square grid, beside a tower that rises floor by floor and is capped with the E.
12. **Footer.** Brand blurb, two link columns, and a talk-to-us block.

Refused by the direction and absent from the build: skyline or building photography heroes, gradient SaaS blobs, glass panels, colour-coded feature icons, "Coming soon" tags.

**Key Characteristics:**
- Near-white ground (#fcfcfc) as the page; pure white only for raised surfaces.
- Two page-height hairline rails with plus crosshairs where rules meet them.
- Space Grotesk display at weight 500 with tight negative tracking; Inter for everything read.
- Two-tone headings: first line ink, second line grey.
- Isometric ink line-art is the only imagery; red is the only colour in it.
- Barely rounded geometry (3px surfaces, 4px tags, 5px buttons); no pills in the interface.
- Every timed or looping element pauses off screen, on hover and on focus, and shows its final state under reduced motion.

## Colors

A monochrome ink-on-paper scale with a single signal red; no secondary or tertiary accent exists.

### Primary
- **Signal Red** (#e2332a): the E box (logo mark, every isometric E box and E cube, the red cube in the Integrations case), motion packets, the Sales lead token, the 2px timer bars under the active Marketing tab, Sales step and Compliance row (and the active step's numeral), pulse rings over the active station or satellite, and the "Most popular" plan tag. Inside a scene it may also mark the one live item of that scene: the blinking lamp on the hero machine, the progress line on the booked pad, the live-platform dots, the budget flow line, the newest queue row, the held post's seal at the approval gate. Outside the art it is text selection, the caret and the footer email underline on hover. Isometric red faces shade to #c82a22 (left) and #a3201a (right); those are material shades, not UI colours.

### Neutral
- **Blueprint Ground** (#fcfcfc): page background, nav, mobile sheet, framed art panels.
- **Raised White** (#ffffff): the active tab, FAQ items, the outline button, the mobile menu toggle. White on #fcfcfc is a lift you feel more than see; borders do the separating.
- **Ink** (#151515): headings, primary buttons, the focus ring. Isometric strokes use #1a1a1a and ink blocks shade #232323 / #161616 / #0b0b0b.
- **Ink Two** (#2a2a2a): outline-button text, crosshair strokes, hover target for grey titles.
- **Body Grey** (#5f5f5f): body copy, ledes, nav links, labels under numbers, open accordion text.
- **Muted Grey** (#767676): inactive tab and step body text.
- **Faint Grey** (#8a8a8a): the second line of two-tone headings, and inactive tab, step and check titles (18px and up). Step numerals are the one smaller use, at 13px weight 600.
- **Hairline** (#ebebeb): rails, rules, borders, stat, plan, lane and step dividers.
- **Hairline Two** (#dedede): outline-button border, menu-toggle border, hover border on FAQ items.
- **Tag Fill** (#f0f0f0): plan tags ("2 months free").

List rows in lanes and plans are divided by 1px dashed #e3e3e3 and set in #474747, with their leading icons in #9a9a9a (lanes) or #8a8a8a (plans).

### Named Rules
**The One Red Box Rule.** Red marks the E box and whatever is live right now: moving, counting down, pulsing, or the single active item in a scene. The one static red surface in the interface is the "Most popular" tag. It never fills a section, a card, a heading, a list, a resting link or an icon. If two unrelated things on screen are red and neither is moving, counting or the E, one is wrong.

**The Grey Lanes Rule.** The Autopilot lanes carry no red: grey arrows, dashed dividers, ink headings. The scene above them already carries the red packets; the table under it reads, it does not signal.

## Typography

**Display Font:** Space Grotesk Variable (with Space Grotesk, ui-sans-serif, system-ui)
**Body Font:** Inter Variable (with Inter, ui-sans-serif, system-ui)

**Character:** Space Grotesk's squared, slightly mechanical forms carry every heading, number, title and in-scene label at weight 500 (600 for the logo word, step numerals and the short pad labels) with tight tracking, matching the drafted illustrations; Inter carries every sentence a reader actually reads. Both are self-hosted through Fontsource. Space Grotesk was pinned by the user's reference site.

### Hierarchy
- **Display** (500, clamp(2.5rem, 1.3rem + 4.6vw, 4.4rem), 1.02, -0.038em): the hero H1 only, centred, two lines, balanced. On short laptops it drops to clamp(2.5rem, 1.2rem + 4vw, 4rem); under 640px to clamp(2.05rem, 1.2rem + 4.4vw, 2.6rem). The closing CTA title is a sibling at clamp(2.4rem, 1.3rem + 3.6vw, 4.1rem), -0.04em.
- **Headline** (500, clamp(2.1rem, 1.25rem + 3vw, 3.45rem), 1.05, -0.034em): every section H2, two lines with the second in Faint Grey. The Stats heading is one line that inks in instead.
- **Numeral** (500, 54px for prices; clamp(2.6rem, 1.8rem + 2.2vw, 3.6rem) for stats; 1, -0.045em, tabular): big figures.
- **Title** (500, 18 to 24px, -0.012em to -0.02em): lane heads and check rows (21px), tab titles (19px), step titles (18px), FAQ questions (18px), plan names (24px), footer column heads (19px), mobile sheet links (22px).
- **Lede** (400, 18px, 1.55, max 38em, balanced): the hero sub only; 17px under 640px.
- **Body** (400, 17px, 1.6, max 36em, pretty): section intros. Tab, step, check, lane and plan text runs 14.5 to 15.5px at 1.45 to 1.6.
- **Label** (500, 15px, 1): buttons, nav links, footer links.
- **Tag** (600, 11px, 0.06em, uppercase): plan tags only.

### Named Rules
**The Two-Tone Heading Rule.** Section headings are two lines: the claim in Ink, the qualifier in Faint Grey, each line its own block so the break survives the word-by-word entrance. No italic, no accent colour, no underline inside a heading.

**The Indian Money Rule.** Money on this site is written the Indian way (Rs 39,999, Rs 1,29,999), never in dollars.

**The Any-State Rule.** Copy says "RERA" and never names one state's authority; state rules are added over time and the page must not age with them.

## Layout

A single centred column, `min(1224px, 100vw - 24px)` wide with 30px inner gutters, hung between two 1px Hairline rails that run the full height of the page. Bands are separated by full-width rules carrying a plus crosshair (11px, #2a2a2a) exactly where they cross each rail; the nav's bottom border, the rule under the pricing head and the rule under the stats head carry the same pair.

Rhythm: 128px vertical padding per section (84px under 640px); section heads stack heading and body 20px apart with 64px below (44px under 640px). Scene-led sections tighten that gap so the scene belongs to the heading: 36px (Sales), 20px (Autopilot), 24px (Integrations). Heads come in three shapes: centred (Marketing, Sales, Autopilot, Integrations), left-stacked (Compliance), and split, heading left and body right on the baseline (Pricing). Two-column content runs 1fr/1fr (Marketing) or 5fr/7fr (Compliance, FAQ) with a 56px gap. Hairline tables replace card grids: the Sales stepper is six columns, the Autopilot lanes three, stats four and plans three, all divided by 1px Hairline with no gap and no fill.

A dashed isometric lattice (30 degree diagonals, #e3e3e3, 3 on 4 dashes, 55.43 by 32px tile) sits behind the hero, Sales, Autopilot and Integrations scenes, masked to an elliptical fade (a softer, lower mask on the last three). It is the only background texture; the CTA's fading square grid is its one sibling.

Breakpoints:
- **1080px:** every two-column split goes to one column and its scene moves above its tabs or rows (`order: -1`), so a tab change is seen; the stepper goes to three columns, the lanes stack, and the FAQ intro unsticks.
- **900px:** nav links give way to a 44px bordered menu toggle and a full-width sheet; plans stack; stats go two by two; the CTA stacks; split heads stack.
- **640px:** the frame narrows to `100vw - 16px` with 18px gutters. Hero buttons stack at a 340px max width. Integrations and Autopilot switch to their compact scene layouts (`useNarrow`), which rearrange the same objects down the column rather than shrinking the wide picture until its marks print ten pixels tall. The hero scene is drawn at 172% width, offset -66%, masked in from the left (transparent to 24%) so the belt enters from off screen, and its pads show short labels ("Qualified", "Visit booked", "Booked") instead of title and detail. The Sales journey is cropped at 175% width, offset -38%, with a 12% edge fade on both sides. The stepper, tabs and footer go to one column.
- **Short laptops** (901px and wider, 840px tall or less): the hero lifts to 52px top padding with tighter gaps so the finished pads clear the fold.

## Elevation & Depth

Flat by default, separated by hairlines. Shadows exist, but they are soft, low-opacity and diffuse, and they appear on buttons, the active tab, the open FAQ item and the mobile sheet. Real depth is carried by the isometric drawings, whose faces are shaded by normal (top lightest, right darkest) and whose ground shadows are flat 5.5% black offsets.

### Shadow Vocabulary
- **Ink button** (`inset 0 1px 0 rgb(255 255 255 / 0.14), 0 1px 2px rgb(0 0 0 / 0.18), 0 6px 14px -8px rgb(0 0 0 / 0.4)`): the black CTA, a pressed-metal highlight and a short drop.
- **Outline button** (`0 1px 2px rgb(0 0 0 / 0.04)`): barely there.
- **Active tab** (`0 1px 2px rgb(0 0 0 / 0.04), 0 14px 30px -20px rgb(0 0 0 / 0.22)`): the one selected Marketing tab.
- **Open lift** (`0 16px 34px -26px rgb(0 0 0 / 0.3)`): an open FAQ item.
- **Sheet** (`0 24px 40px -28px rgb(0 0 0 / 0.25)`): the mobile menu sheet under the nav.

### Named Rules
**The Hairline First Rule.** A surface is separated by a 1px #ebebeb border before it is separated by a shadow. A shadow at rest belongs only to buttons and the active tab; everything else lifts only in response to state.

**The No Ink Card Rule.** There is no near-black card on this site. Dark mass lives in the drawings (ink blocks, the inked finished tile, the plinth) and in the primary button. Autopilot is a scene over a hairline table, not a dark panel.

## Shapes

Barely rounded rectangles. Tabs, FAQ items and accordion buttons take 3px; plan tags 4px; buttons 5px; the focus ring and the menu toggle 6 to 8px. Nothing in the interface is a pill. Inside the art, round forms are limited to dots, packets, badges and pulse rings. The logo mark is a 64 unit square at 13 unit radius with a white E. Isometric blocks are rounded prisms (radius about 0.1 to 0.45 world units) or chamfered octagons, outlined in a 1.1 to 1.3px ink stroke with round joins, with a hard front edge drawn on sharp boxes. Plus crosshairs on rules and four corner crosses on the framed Compliance panel are the recurring registration marks.

## Components

### Buttons
Rectangular, confident, black.
- **Shape:** gently squared (5px), 44px tall (40px in the nav), 20px side padding, 8px icon gap.
- **Primary:** Ink fill, white label, the Ink button shadow; carries a trailing arrow that slides 3px right on hover.
- **Hover / Focus:** hover lightens to #2d2d2d; active presses down 1px; focus is a 2px Ink outline at 3px offset.
- **Secondary (outline):** Raised White fill, 1px Hairline Two border, Ink Two label, optional leading icon (the hero's down arrow); hover darkens the border to #c4c4c4 and the label to Ink.
- One primary per cluster. In pricing only the popular plan's button is black; the others are outline, full width.

### Tags
- **Plan tag:** 24px, 4px radius, Tag Fill, #3a3a3a, uppercase 11px 600 at 0.06em. Used for the billing note ("2 months free").
- **Most popular:** the same tag in Signal Red with white text, beside the popular plan's name.

### Timed tabs, steps and rows
One pattern in three dresses, driven by `useCycle`: Marketing tabs (5.6s each), the Sales stepper (5.0s) and the Compliance accordion (6.2s). The active item is Ink; inactive titles are Faint Grey and darken to Ink Two on hover. A 2px Signal Red bar fills left to right along the active item as its timer runs (under the tab, along the top of the step, along the top of the check). The cycle runs only while 35% of the block is in view, holds while a pointer rests on it or focus is inside it, and does not run at all under reduced motion, where the bar is not rendered. Tabs and steps are real tablists with arrow-key movement and roving tabindex; checks are disclosure buttons with `aria-expanded`.
- **Tab:** 3px, transparent until active, then Raised White with a Hairline border and the Active tab shadow.
- **Step:** unboxed, divided by Hairline, a 13px tabular numeral ("01") above an 18px title; the active numeral turns red.
- **Check:** a 21px Space Grotesk row on a Hairline; the open one expands its body over 0.55s.

### Lanes (Autopilot)
Three columns on a Hairline top border, divided by Hairlines, each a 21px title over a list of rows split by dashed #e3e3e3, each row led by a 15px grey arrow. No fill, no shadow, no red.

### Accordion (FAQ)
Raised White 3px items with a Hairline border, stacked 12px apart. The question is an 18px Space Grotesk button; a plus icon rotates 45 degrees to a cross when open, and the open item takes the Open lift shadow. Hover darkens the border to Hairline Two.

### Stats and plans
Hairline-divided columns with no card fill. Stats: a counting numeral (en-IN formatting, once, 1.8s) over a Body Grey label. Plans: head (name, tag, blurb), price block (54px numeral, period, note, full-width button), then a list of features under a title, each row with a grey circle-check.

### Navigation
Sticky, 76px, Blueprint Ground with a Hairline bottom border and crosshairs at the rails. Three-column grid: logo left, 15px Body Grey links centred (30px apart, Ink on hover), sign-in link and a 40px primary button right. Under 900px it is 64px with a 44px bordered menu toggle opening a full-width sheet of 22px Space Grotesk links on Hairline dividers and stacked full-width buttons.

### Isometric Scene (signature component)
Every illustration is a `Scene` from `src/lib/iso.tsx`: true isometric projection, `Prism` blocks with rounded-rect or octagon outlines, five materials (white, paper, ink, red, ghost) plus the INKED finished tile (white top, black sides), content mapped onto a face with `OnFace`, flat ground shadows, ink wires with junction dots, and red `Packet`s that ride the wires. Shared pieces (`EBox`, the E cube, cards) live in `src/lib/parts.tsx`. Marks on tiles are Lucide line icons or Simple Icons brand paths, drawn in the face's own coordinates in ink or white.
- **Labelled:** `role="img"` with an `aria-label` sentence that tells the scene's story.
- **Paused off screen:** an IntersectionObserver with a 120px margin pauses both CSS animation (`.is-paused`) and SMIL (`pauseAnimations`).
- **Reduced motion:** packets are not rendered, pulse rings and blinking are dropped, the lead token jumps to its station, and the tower renders finished.
- **Auto-framed:** with `fit`, a scene measures its own bounds and sets its viewBox to them at the declared aspect ratio. Packets (`.pk`) are excluded from that measurement, because a packet sits at the origin until its motion starts.
- **Two layouts where needed:** Integrations and Autopilot draw a wide layout and a compact one for phones, keyed so the viewBox re-measures when the layout changes.

### Motion grammar
One easing everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`. Headings and body enter word by word from 10px blur and a 0.28em drop (0.9s, 55ms stagger for headings, 12 to 18ms for body); blocks rise 12 to 40px from 8px blur (1.1s). Marketing scenes cross-fade through blur and a 0.97 to 1.02 scale (0.7s). The stats heading inks in letter by letter from #c4c4c4 to Ink as it scrolls through. Smooth scrolling (Lenis) is off under reduced motion, and every entrance, loop, marquee, counter and tower rise resolves to its final state.

## Do's and Don'ts

### Do:
- **Do** keep the page Blueprint Ground (#fcfcfc) and let Raised White (#ffffff) mark the only lifted surfaces.
- **Do** separate with 1px #ebebeb hairlines, and pin every full-width rule to the rails with plus crosshairs.
- **Do** write section headings as two lines, the second in Faint Grey (#8a8a8a).
- **Do** build new imagery from the isometric toolkit, and keep red to the E box and what is live: packets, the lead token, timer bars, pulse rings, the one active item in a scene.
- **Do** give every scene an `aria-label` sentence, and exclude packets (`.pk`) from any auto-framed bounds.
- **Do** pause every looping or timed element off screen, on hover and on focus, and render its final state under prefers-reduced-motion.
- **Do** draw a compact layout for a scene whose marks would fall below legible size under 640px, rather than shrinking the wide one.
- **Do** write money as Rs 35,000 or Rs 1.25 Cr, and say "RERA" without naming a state.

### Don't:
- **Don't** use red as a fill for sections, cards, headings, lists, icons or resting links (The One Red Box Rule); the Autopilot lanes stay grey.
- **Don't** add a second accent colour, a gradient wash, or colour-coded icons.
- **Don't** add a near-black card or panel; dark mass belongs to the drawings and the primary button.
- **Don't** use skyline or building photography, or AI-drawn buildings, as imagery.
- **Don't** round surfaces past 3px or turn buttons or tags into pills.
- **Don't** put a shadow on a surface at rest other than a button or the active tab.
- **Don't** add "Coming soon" tags; the page presents the whole product.
- **Don't** use an em dash or en dash anywhere in the copy; recast the sentence.
