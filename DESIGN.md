---
name: The Twin Identity Portfolio
description: Dual developer and photographer portfolio of Madhav Tiwari
colors:
  primary: "#00ff88"
  neutral-bg: "#040806"
  neutral-surface: "#0c120f"
  text-primary: "#e2ede8"
  text-muted: "#92a89e"
  accent-green: "#1f6f5f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  serif:
    fontFamily: "Libre Baskerville, serif"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 1rem"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.primary}"
---

# Design System: The Twin Identity Portfolio

## 1. Overview

**Creative North Star: "The Darkroom Compiler"**

The Darkroom Compiler is a design system that fuses raw, logical code structure with the precision focus of event photography. Just as compiling code demands structural integrity, developing photos in a darkroom requires careful attention to framing and contrast. The layout is optimized to display clean technical achievements and rich visual captures side-by-side. 

Restraint is the voice of this system. Rather than using generic, overly-flashy templates, it focuses on high typographic contrast, solid dark backgrounds, and purposeful choreographies on scroll. It rejects SaaS-cream defaults and over-rounded containers in favor of a sharp, modern developer-meets-artist aesthetic.

**Key Characteristics:**
- Deep dark forest-green backgrounds paired with a single vibrant neon accent.
- An elegant mix of modern grotesque type and classic warm editorial serifs.
- Solid structural container cards with translation transitions rather than drop shadows.
- Playful scroll parallax and spring-like micro-interactions.

## 2. Colors

A committed dark-theme strategy where deep abyssal forest tones are contrasted against a tactical neon mint highlight.

### Primary
- **Tactical Mint** (#00ff88): Used sparingly (≤10%) for highlight elements, hover border states, primary text emphasis, and cursor interactive highlights.

### Neutral
- **Abyssal Forest** (#040806): The root body background color. Keeps the page dark and un-distracting.
- **Deep Emerald Surface** (#0c120f): Used for cards, inputs, and container backgrounds to add layering.
- **Pale Mint Ink** (#e2ede8): Primary body and header text. High contrast (≥7:1) for optimal dark mode legibility.
- **Muted Sage** (#92a89e): Secondary description text, subtitles, and metadata labels.

### Named Rules
**The 10% Mint Rule.** Tactical Mint is a high-intensity color. It must only cover ≤10% of any viewport to ensure its rarity drives focus.

## 3. Typography

**Display Font:** 'Bricolage Grotesque' (with sans-serif fallback)
**Body Font:** 'Hanken Grotesk' (with sans-serif fallback)
**Serif Font:** 'Libre Baskerville' (with serif fallback)

**Character:** A sharp grotesque face for technical display headings is contrasted against an elegant editorial serif for narrative expressions, anchored by a highly readable body sans-serif.

### Hierarchy
- **Display** (800, clamp(3.2rem, 7.5vw, 6.5rem), 1.05): Used for the main hero header. Letter-spacing floor of -0.03em.
- **Headline** (700, clamp(2rem, 3.5vw, 3rem), 1.15): Section titles, featuring italic serif highlights.
- **Title** (700, 1.05rem, 1.3): Project card titles and timeline headings.
- **Body** (400, 1rem, 1.6): Standard prose and descriptions. Max line-length of 75ch.
- **Label** (600, 0.75rem, uppercase): Metadata chips and dates.

## 4. Elevation

Depth is conveyed through subtle container borders and structural dark shadows rather than soft atmospheric blurs or SaaS-like glowing drop shadows.

### Shadow Vocabulary
- **Restrained Dark** (`box-shadow: 0 10px 30px rgba(0,0,0,0.6)`): Ambient darkness below panels, giving cards clean separation against the abyssal background.

### Named Rules
**The Restrained Depth Rule.** Shadows are dark, ambient, and low-opacity. Never use neon-colored glowing drop shadows or light blurs.

## 5. Components

### Buttons
- **Shape:** Rounded-sm (8px radius)
- **Primary:** Background (#00ff88), text (#040806), bold weight.
- **Hover:** Scales up slightly with a rotation hover on the cursor emoji, and border glows green.

### Cards / Containers
- **Corner Style:** Rounded-md (12px)
- **Background:** Deep Emerald Surface (#0c120f)
- **Border:** 1px solid (#00ff88 0.12 opacity) at rest.
- **Hover:** Translates up (`translateY(-4px)`) and highlights border to solid Tactical Mint (#00ff88).

### Navigation
- **Style:** Sticky top, blurred background overlay, thin border-bottom, minimal links.
- **Hover:** Green slide line animation under links.

## 6. Do's and Don'ts

### Do:
- **Do** maintain high contrast (pale mint text on abyssal forest background).
- **Do** use Bricolage Grotesque for bold technical numbers and names, and Libre Baskerville italic for creative storytelling.
- **Do** limit card rounded corners to a maximum of 12px.

### Don't:
- **Don't** use gradient text under any circumstances.
- **Don't** add colored eyebrows above section headings.
- **Don't** use a 1px border combined with a soft, glowing drop shadow of over 16px blur on cards.
- **Don't** use cluttered or overly-flashy animations that distract the user from reading.
