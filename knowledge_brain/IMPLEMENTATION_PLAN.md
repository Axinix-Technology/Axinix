# Mandatory Implementation & Audit Plan

## Project Goals
Transform the prototype into a reactive Single-Page Application (SPA) powered by React 19, Vite, and Tailwind CSS v4 styling tokens, complete with `node_modules` installed, strict adherence to the requested directory topology, zero-modal dedicated page routing, pure component composition without hardcoded page markup, and eliminated visual empty spaces.

## Target Directory Structure
```
frontend/
├── assets/                  # Static raw image assets, icons, and fonts
├── public/                  # Public uncompiled assets served at root (favicon, icons)
├── dist/                    # Production build distribution output
├── index.html               # Main Single-Page Application (SPA) entry HTML
├── vite.config.js           # Vite configuration, aliases, route plugins, rollup chunk splitting
├── package.json             # Dependencies, scripts, and package version specifications
└── src/                     # Core application source code
    ├── api/                 # Centralized API network clients & populator
    ├── components/          # Reusable UI library & layout chrome
    │   └── ui/              # Atomic UI building blocks (Table, Input, Button, etc.)
    ├── context/             # React Context providers (Auth, Theme, Settings, Cart, Toast)
    ├── hooks/               # Custom reusable React hooks
    ├── layouts/             # Root application shells & route guards
    ├── pages/               # Pure file-based URL routes (no reusable components here)
    ├── utils/               # Helper functions, formatters, validators, and drivers
    ├── App.jsx              # Top-level application component with toast & providers
    ├── main.jsx             # Client entry point mounting React 19 to DOM
    └── index.css            # Tailwind CSS v4 theme variables & global styles
```

## Step-by-Step Implementation Sequence
1. **Scaffold Project Configs (`frontend/`)**:
   - `package.json` with React 19 (`react`, `react-dom`), `react-router-dom`, `@tailwindcss/vite`, `tailwindcss` (v4), `lucide-react`.
   - `vite.config.js` with `@vitejs/plugin-react`, `@tailwindcss/vite`, path aliases (`@/` -> `src/`), and rollup chunk splitting.
   - `index.html` with Playfair Display & Inter font links, meta viewport, title.
   - `assets/` and `public/` directories with favicon and svg assets.
2. **Install Node Modules**:
   - Executed `npm install` inside `frontend/` to populate `node_modules` and lockfile.
3. **Core Styling (`src/index.css`)**:
   - Tailwind CSS v4 `@theme` configuration with brand tokens: `--navy: #101D3B`, `--deep: #0A1429`, `--royal: #3157A4`, `--gold: #D5B779`, `--grey: #F4F6FA`, `--soft: #EAF0FA`.
   - Custom utility classes, animations (floating dash, glow, scroll reveal), custom scrollbars.
4. **Data Models & Centralized API Client (`src/api/`)**:
   - `client.js`: HTTP request client with correlation ID (`X-Request-ID`), error normalization, audit logging.
   - `data.js`: Rich domain data for solutions (8), industries (16), services (7), portfolio (6+), insights (4+), products (5), categories (4), customer account mock, and delivery telemetry.
   - `populateHelper.js`: Standardized query interface simulating populate lifecycle, filter parsing, depth limit (<= 3), and pagination ceiling (50).
   - Domain services (`solutionService.js`, `industryService.js`, etc.).
5. **Context Providers (`src/context/`)**:
   - `ThemeContext.jsx`: Dark/Light mode state.
   - `ToastContext.jsx`: Reactive toast notification dispatch & queue.
   - `SettingsContext.jsx`: Enterprise configuration (phone, email, socials, address).
   - `AuthContext.jsx`: Client session & authentication.
   - `CartContext.jsx`: Reactive cart management, B2B 18% GST tax, promo coupons, and LocalStorage persistence.
6. **Atomic UI Building Blocks (`src/components/ui/`)**:
   - `Button.jsx`, `Input.jsx`, `Select.jsx`, `Textarea.jsx`, `Card.jsx`, `Badge.jsx`, `Table.jsx`, `Breadcrumbs.jsx`, `MetricCard.jsx`.
7. **Chrome & Presentation Components (`src/components/`)**:
   - `Navbar.jsx`: Mega-menus for Solutions, Industries, Services; shopping cart indicator; customer account trigger; search.
   - `ContentSection.jsx`: Universal section wrapper enforcing compact padding (`py-10 sm:py-14`) and zero dead space.
   - `HeroBanner.jsx`: Reusable landing hero section.
   - `ProductCard.jsx`: Reusable commercial catalog card with pricing and add-to-cart action.
   - `CartItemList.jsx`: Reusable cart line items manager with quantity stepper.
   - `OrderSummaryCard.jsx`: Reusable financial summary card with promo codes and checkout CTA.
   - `CheckoutForm.jsx`: Reusable full-page dedicated checkout form with GSTIN parameters.
   - `CustomerAccountOverview.jsx`: Reusable customer portal tabs with license copy tools.
   - `DeliveryTracker.jsx`: Reusable GPS logistics tracking and progress timeline.
   - `CategoryShowcase.jsx`: Reusable category showcase with product grid.
   - `PolicyContent.jsx`: Reusable legal reader layout for all compliance pages.
   - `AnnouncementBar.jsx`, `Footer.jsx`, `DashboardPreview.jsx`, `ToastContainer.jsx`, `FaqAccordion.jsx`, `IconRenderer.jsx`.
8. **Layouts (`src/layouts/`)**:
   - `MainLayout.jsx`: Master layout wrapper with announcement bar, navbar, content, footer, back-to-top, and floating demo trigger.
   - `AuthLayout.jsx`: Centered shell for client login.
9. **Standardized Folder-Based Pages (`src/pages/`)**:
   - `pages/home/index.jsx`
   - `pages/cart/index.jsx`
   - `pages/category/[slug].jsx`
   - `pages/checkout/index.jsx`
   - `pages/customer-account/index.jsx`
   - `pages/delivery/index.jsx`
   - `pages/solutions/index.jsx` & `[id].jsx`
   - `pages/industries/index.jsx` & `[slug].jsx`
   - `pages/services/index.jsx` & `[id].jsx`
   - `pages/products/index.jsx`
   - `pages/portfolio/index.jsx` & `[id].jsx`
   - `pages/about/index.jsx`
   - `pages/insights/index.jsx` & `[id].jsx`
   - `pages/demo/index.jsx` & `create.jsx`
   - `pages/contact/index.jsx` & `create.jsx`
   - `pages/search/index.jsx`, `pages/login/index.jsx`, `pages/not-found/index.jsx`
   - `pages/help-policies/` (`contact/`, `faq/`, `privacy-policy/`, `terms/`, `return-policy/`, `returns/`, `shipping/`, `shipping-policy/`, `cookie-policy/`)

## Componentization & Clean Page Architecture Plan
To eliminate hardcoded designs, inline markup, and duplicated CSS inside page components, all repeated visual patterns are extracted into reusable components in `src/components/`. Pages are pure compositions of reusable components.

## Verification & Audit Results (Passed)
- **Component Reusability Audit**: Passed. All hardcoded section markup, form state blocks, and card layouts have been cleanly extracted into reusable components in `src/components/`. Pages now act strictly as pure route orchestrators that pass data down via clean props.
- **Empty Space Elimination Audit**: Passed. Reduced excessive vertical padding from `py-20` / `py-16` / `space-y-16` down to cohesive, responsive spacing (`py-8 sm:py-12` / `space-y-8 sm:space-y-10`). All cards enforce `h-full flex flex-col justify-between` to eliminate ragged row heights. All placeholder blanks and empty strings replaced with authentic corporate contact data and catalog specifications.
- **Folder Topology Verification**: Matches the user's screenshot exactly, including `cart/index.jsx`, `category/[slug].jsx`, `checkout/index.jsx`, `customer-account/index.jsx`, `delivery/index.jsx`, and nested `help-policies/` modules.
- **Build Status**: Verified via `vite build` (`axinix-frontend@1.0.0`). Output: 1685 modules transformed, zero compile errors (Exit Code 0).
- **Chunk Splitting**: Verified:
  - `dist/assets/vendor-react-CbBpsEqV.js` (52.21 kB)
  - `dist/assets/vendor-icons-LTYa0MFJ.js` (30.75 kB, tree-shaken from 795 kB)
  - `dist/assets/index-OWJuCYMH.js` (468.15 kB)
  - `dist/assets/index-rCBHrB4j.css` (66.51 kB)
- **Rule 11 Verification**: Zero modals or dialog overlays used in workflows. Dedicated bookmarkable URL routes configured for `/checkout`, `/cart`, `/customer-account`, `/delivery`, `/demo/create`, `/contact/create`, etc.
- **Frontend UI Modernization**: Completed all UI design improvisations:
  - Header & Mega-Menu UX: Luminous glassmorphism, dynamic icons, badges, quick search with `Ctrl+K` hotkey badge, smooth `Esc` dismiss, and pulsating cart indicator.
  - Hero Telemetry Dashboard: Multi-timespan (`24h`, `7d`, `30d`, `1y`) interactive telemetry bars with hover volume tooltips, live cluster SLA (99.99%) & latency (14ms) monitor, and enhanced trust pillars.
  - Commercial Catalog & Billing Toggle: Interactive Annual (Save 20%) vs Monthly switcher with instant price recalculations, and reusable `FeatureComparisonMatrix` grid.
  - B2B Cart & Checkout Elevation: Interactive B2B 18% GST Input Tax Credit (ITC) calculator, net business cost breakdown, empty cart recovery picks, and 3-step inline checkout flow.
  - Delivery Tracker & Client Portal: Live tracking switcher (`AX-DEL-2026-89412`, `AX-DEL-2026-30419`, `AX-DEL-2026-11029`), expandable milestone telemetry, client installer download simulator with OS selector (`.exe`, `.dmg`, `.deb`), and interactive ticket reply threads.
