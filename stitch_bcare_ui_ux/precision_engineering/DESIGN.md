---
name: Precision Engineering
colors:
  surface: '#fbf9fb'
  surface-dim: '#dbd9db'
  surface-bright: '#fbf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedef'
  surface-container-high: '#e9e7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1c1d'
  on-surface-variant: '#44474c'
  inverse-surface: '#303032'
  inverse-on-surface: '#f2f0f2'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4e6077'
  primary: '#00050e'
  on-primary: '#ffffff'
  primary-container: '#0b1f33'
  on-primary-container: '#7587a0'
  inverse-primary: '#b5c8e3'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#00050e'
  on-tertiary: '#ffffff'
  tertiary-container: '#101f2f'
  on-tertiary-container: '#78879b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b5c8e3'
  on-primary-fixed: '#081d30'
  on-primary-fixed-variant: '#36485e'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#d4e4fa'
  tertiary-fixed-dim: '#b9c8de'
  on-tertiary-fixed: '#0d1c2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#fbf9fb'
  on-background: '#1b1c1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
The design system is engineered to evoke the precision, durability, and reliability of high-end industrial kitchen equipment. It targets B2B procurement officers and professional chefs who prioritize equipment performance and longevity. 

The visual style is **Corporate / Modern** with a strong **Minimalist** foundation. It leverages high-contrast typography and a structured grid to mimic technical blueprints and architectural precision. The aesthetic avoids unnecessary flourishes, focusing instead on clarity, hierarchy, and a "built-to-last" sentiment. Surfaces are clean, using a combination of "Stainless Steel" neutrals and deep industrial blues to establish immediate professional authority.

## Colors
The palette is rooted in industrial materials. **Deep Navy Blue** serves as the primary brand anchor, used for headers, navigation, and core branding elements to project stability. **Industrial Charcoal** and **Stainless Steel Grey** provide the tonal range for secondary interfaces, borders, and metadata.

**Industrial Orange** is used exclusively as a functional accent. It is reserved for primary Calls to Action (CTAs), critical alerts, and status indicators that require immediate attention. This high-contrast application ensures that despite the premium, sober palette, user pathways remain unmistakable. Use the **Secondary Background** to differentiate content sections from the main page canvas.

## Typography
The typography strategy pairs the geometric strength of **Plus Jakarta Sans** for headings with the utilitarian clarity of **Inter** for body text. 

Headlines utilize heavy weights (700-800) and tight letter-spacing to create a "bold, industrial" impact, reminiscent of heavy-duty equipment labeling. Body text is optimized for technical readability, using standard weights with generous line heights. Labels and badges use uppercase Inter with increased letter-spacing to evoke the feel of engraved serial plates or technical documentation headers.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain a controlled, premium presentation, transitioning to a fluid model for mobile devices. 

A strict 4px baseline grid ensures technical alignment across all components. 
- **Desktop:** 12-column grid with 24px gutters and 40px outer margins.
- **Tablet:** 8-column grid with 24px gutters and 32px outer margins.
- **Mobile:** 4-column grid with 16px gutters and 16px outer margins.

Spacing between functional groups (sections) should be aggressive (64px+) to allow the design to "breathe" and highlight the high-quality equipment imagery.

## Elevation & Depth
In this design system, depth is used sparingly to maintain a modern, engineering-focused look. We primarily use **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Base):** White (#FFFFFF) for primary content areas.
- **Level 1 (Cards/Surface):** White background with a 1px border in Stainless Steel Grey (#94A3B8) at 30% opacity.
- **Level 2 (Interactive):** When hovered, cards or buttons should use a soft, ultra-diffused shadow (0px 10px 20px rgba(11, 31, 51, 0.05)) to suggest a slight lift without appearing "puffy" or skeuomorphic.

Avoid heavy blurs. The goal is to feel like precision-cut panels, not floating elements.

## Shapes
This design system utilizes **Soft** roundedness (0.25rem / 4px). This subtle rounding takes the "edge" off the industrial aesthetic while remaining significantly more rigid and professional than consumer-grade rounded UI. 

- **Small Components (Inputs, Checkboxes):** 4px radius.
- **Large Components (Cards, Modals):** 8px radius (rounded-lg).
- **Interactive Badges:** 2px radius or sharp to emphasize a "label" or "tag" feel.

## Components
### Buttons
- **Primary:** Background Industrial Orange (#F97316), text White. Bold weight.
- **Secondary:** Background Deep Navy Blue (#0B1F33), text White.
- **Tertiary/Ghost:** 1px border Industrial Charcoal (#1F2937), text Charcoal.

### Input Fields
Inputs should feel robust. Use a 1px solid border in Stainless Steel Grey. On focus, the border shifts to Deep Navy Blue with a subtle 2px outer glow in the same color at 10% opacity. Labels must always be visible (never placeholder-only).

### Cards
Cards use Level 1 elevation (1px subtle border). Content should be padded by 24px. Equipment images within cards should be set against a Secondary Background (#F8FAFC) to create a "studio look."

### Badges & Status
Use rectangular badges with 2px radius. 
- **Category:** Stainless Steel Grey background with Navy Blue text.
- **Availability:** Industrial Orange text with 10% Orange background tint.

### Data Tables
Tables are essential for B2B specifications. Use a 1px horizontal-only divider in Stainless Steel Grey. The header row should have a Secondary Background (#F8FAFC) with uppercase `label-sm` typography.