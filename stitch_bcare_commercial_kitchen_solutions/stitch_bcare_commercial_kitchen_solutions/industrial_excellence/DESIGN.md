---
name: Industrial Excellence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#42474f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727780'
  outline-variant: '#c2c7d0'
  surface-tint: '#2d6193'
  primary: '#003358'
  on-primary: '#ffffff'
  primary-container: '#0a4a7a'
  on-primary-container: '#8abaf1'
  inverse-primary: '#9dcaff'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#2c3236'
  on-tertiary: '#ffffff'
  tertiary-container: '#42484c'
  on-tertiary-container: '#b1b7bc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#9dcaff'
  on-primary-fixed: '#001d35'
  on-primary-fixed-variant: '#084979'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#dde3e8'
  tertiary-fixed-dim: '#c1c7cc'
  on-tertiary-fixed: '#161c20'
  on-tertiary-fixed-variant: '#41484c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
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
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-padding: 80px
---

## Brand & Style

The design system is engineered for the professional culinary industry, blending high-precision industrial aesthetics with premium corporate reliability. It evokes a sense of "heavy-duty elegance"—reflecting the durability of commercial kitchen equipment while maintaining the sophisticated polish expected by high-end hospitality clients.

The style is **Modern Corporate with Industrial Accents**. It utilizes expansive white space, structured alignment, and subtle tactile hints (like stainless steel textures) to communicate quality. The interface remains highly functional and utilitarian, yet feels expensive and curated through disciplined typography and high-contrast call-to-actions.

## Colors

The palette is anchored in trust and industrial materiality. 

- **Primary (Deep Blue):** Used for core branding, primary navigation headers, and authoritative UI elements.
- **Secondary (Dark Charcoal):** Reserved for high-level text and structural components like footers or sidebars to provide weight.
- **Accent (Stainless Steel):** Employed for borders, dividers, and decorative industrial elements to mimic the equipment's physical finish.
- **CTA (Safety Orange):** A high-visibility utility color used exclusively for conversion points and primary actions, ensuring they stand out against the professional blues and greys.
- **Functional Grays:** A range of cool-toned grays are used for secondary text and disabled states to maintain a clean, organized hierarchy.

## Typography

The typography uses **Inter** for its systematic, neutral, and highly legible characteristics. It provides a technical feel that complements technical specifications and equipment manuals.

Headlines are bold and authoritative, using tight letter-spacing for a modern, compact look. Body text utilizes generous line heights to ensure readability during heavy research and technical spec comparison. Label styles use uppercase tracking to differentiate technical metadata from narrative content.

## Layout & Spacing

This design system employs a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile. 

- **Technical Specs:** Use rigid tables with 1px #BFC5CA borders for equipment details.
- **Galleries:** Equipment showcases utilize a masonry layout to accommodate varying product dimensions (ovens vs. mixers).
- **Rhythm:** An 8px base unit drives all padding and margins. Vertical rhythm is expansive (80px+ between major sections) to convey a premium, uncluttered brand experience.
- **Navigation:** The header is sticky, utilizing a white background with a subtle "Steel Silver" bottom border to maintain presence without distracting from product photography.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. 

Surfaces are primarily flat white, with depth created using very soft, highly diffused shadows (Blur: 30px, Opacity: 4%, Color: #0A4A7A tinted gray). This prevents the "heavy" look of traditional shadows and instead creates a "floating" premium feel. 

Interactive elements like cards use a subtle "lift" on hover, increasing the shadow spread. Glassmorphism is used sparingly—only for overlays or mobile navigation drawers—to maintain the industrial focus on solid materials.

## Shapes

The shape language balances industrial rigidity with modern friendliness. 

- **Cards:** Use `rounded-2xl` (1.5rem / 24px) to soften the large, heavy equipment photos.
- **Buttons & Inputs:** Use a standard `rounded-md` (0.5rem / 8px) to maintain a precise, engineered appearance.
- **Interactive States:** Soft corners are applied to all hover states and focus rings to ensure the UI feels approachable.

## Components

### Buttons
- **CTA Button:** Solid Orange (#F97316) with white text. High-impact for "Get a Quote" or "Buy Now."
- **Primary Button:** Deep Blue (#0A4A7A) with white text. Used for standard navigation and secondary actions.
- **Outline Button:** 1.5px border of Steel Silver (#BFC5CA) with Charcoal text. Used for filters and technical downloads.

### Cards
Equipment cards feature a white background, 24px corner radius, and a soft ambient shadow. Product images should be high-resolution with shadows removed or "product-on-white" style for consistency.

### Forms & Inputs
Inputs use a 1px #BFC5CA border that transitions to Deep Blue on focus. Labels are consistently positioned above the field using the `label-sm` typographic style.

### Technical Data Tables
Tables should use a striped row pattern with a very faint gray (#F9FAFB) and a bold Charcoal header row to ensure clarity when reading complex voltage or dimension specs.

### Chips & Status Indicators
Used for "In Stock" or "Commercial Grade" badges. These are small, pill-shaped elements with low-saturation background tints of the primary colors.