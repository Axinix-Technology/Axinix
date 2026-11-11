# AXINIX TECHNOLOGIES — Enterprise Frontend Application

A reactive Single-Page Application (SPA) built for **AXINIX TECHNOLOGIES** using **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7**.

---

## Quick Start

```bash
# Navigate to the frontend directory
cd frontend

# Start the local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Directory Topology

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
    │   ├── client.js        # Audit logging, correlation ID (X-Request-ID), network client
    │   ├── data.js          # Central domain dataset (solutions, industries, services, portfolio)
    │   └── populateHelper.js# Standardized populate query interface with depth & ceiling limits
    ├── components/          # Reusable UI library, section modules & layout chrome
    │   ├── PageBanner.jsx      # Reusable starfield hero banner with breadcrumbs & actions
    │   ├── CtaBanner.jsx       # Reusable high-impact call-to-action banner
    │   ├── SectionHeader.jsx   # Reusable section title with badge & optional action link
    │   ├── StatsSection.jsx    # Reusable operational KPI metric grid
    │   ├── SolutionCard.jsx    # Reusable domain card for enterprise solutions
    │   ├── IndustryCard.jsx    # Reusable domain card for industry verticals
    │   ├── ServiceCard.jsx     # Reusable domain card for digital services
    │   ├── PortfolioCard.jsx   # Reusable domain card for client case studies
    │   ├── ArticleCard.jsx     # Reusable domain card for insights & articles
    │   ├── SearchFilterBar.jsx # Reusable live search & category chips filter bar
    │   ├── ProcessRoadmap.jsx  # Reusable 6-stage engineering process roadmap
    │   ├── WhyChooseUsGrid.jsx # Reusable 8-pillar enterprise advantage grid
    │   ├── TestimonialSlider.jsx# Reusable interactive client review switcher
    │   ├── DemoBookingForm.jsx # Reusable full-page demo booking workflow with validation
    │   ├── ContactInquiryForm.jsx# Reusable full-page quotation request form with channels
    │   ├── EmptyState.jsx      # Reusable zero-results message card with reset button
    │   ├── DashboardPreview.jsx# Interactive live animated telemetry mock & KPI toggler
    │   ├── AnnouncementBar.jsx # Rotating top news banner
    │   ├── FaqAccordion.jsx    # Expandable FAQ accordion
    │   ├── Footer.jsx          # Multi-column enterprise footer
    │   ├── Navbar.jsx          # Sticky header with mega menus & quick search
    │   ├── ToastContainer.jsx  # Floating non-blocking notification queue
    │   └── ui/              # Atomic UI building blocks
    │       ├── Badge.jsx
    │       ├── Breadcrumbs.jsx
    │       ├── Button.jsx
    │       ├── Card.jsx
    │       ├── Input.jsx
    │       ├── MetricCard.jsx
    │       ├── Select.jsx
    │       ├── Table.jsx
    │       └── Textarea.jsx
    ├── context/             # Global React Context providers
    │   ├── AuthContext.jsx     # Client session & authentication
    │   ├── SettingsContext.jsx # Company phone, email, socials configuration
    │   ├── ThemeContext.jsx    # Dark/light mode persistence
    │   └── ToastContext.jsx    # Global notification dispatch
    ├── hooks/               # Custom React hooks
    │   ├── useDebounce.js   # Input debouncing hook
    │   └── useSearch.js     # Reactive multi-field search hook
    ├── layouts/             # Root application shells & route guards
    │   ├── MainLayout.jsx   # Master layout with navbar, footer, FAB, and back-to-top
    │   └── AuthLayout.jsx   # Minimalist centered shell for client login
    ├── pages/               # Standardized Folder-Based Page Routes (Zero Modals!)
    │   ├── home/index.jsx
    │   ├── solutions/
    │   │   ├── index.jsx
    │   │   └── [id].jsx
    │   ├── industries/
    │   │   ├── index.jsx
    │   │   └── [slug].jsx
    │   ├── services/
    │   │   ├── index.jsx
    │   │   └── [id].jsx
    │   ├── products/index.jsx
    │   ├── portfolio/
    │   │   ├── index.jsx
    │   │   └── [id].jsx
    │   ├── about/index.jsx
    │   ├── insights/
    │   │   ├── index.jsx
    │   │   └── [id].jsx
    │   ├── demo/
    │   │   ├── index.jsx
    │   │   └── create.jsx
    │   ├── contact/
    │   │   ├── index.jsx
    │   │   └── create.jsx
    │   ├── search/index.jsx
    │   ├── login/index.jsx
    │   ├── help-policies/
    │   │   ├── contact/
    │   │   │   ├── index.jsx
    │   │   │   └── create.jsx
    │   │   ├── faq/index.jsx
    │   │   ├── privacy-policy/index.jsx
    │   │   ├── return-policy/index.jsx
    │   │   ├── returns/index.jsx
    │   │   ├── shipping/index.jsx
    │   │   ├── shipping-policy/index.jsx
    │   │   ├── terms/index.jsx
    │   │   └── cookie-policy/index.jsx
    │   └── not-found/index.jsx
    ├── utils/               # Helpers, formatters, validators, and Tailwind merger
    ├── App.jsx              # Top-level routing and providers wiring
    ├── main.jsx             # React 19 entry point mounting to DOM
    └── index.css            # Tailwind CSS v4 theme variables & global styles
```

---

## Architectural Directives & Compliance

1. **Zero Modals for Workflows (Rule 11)**: Every workflow (Demo booking, Contact inquiries, Solutions inspection, Industry analysis, Portfolio studies, Client login) is routed to an explicit, bookmarkable dedicated URL route with breadcrumb history and back buttons.
2. **Centralized Populate & Audit Logging (Rules 8, 9, 10)**: Network transactions route through `src/api/client.js` and `src/api/populateHelper.js` with automated correlation IDs (`X-Request-ID`) and payload sanitization.
3. **Living Knowledge Brain (Rules 2, 3)**: Documented in `knowledge_brain/` with strict alphabetical indexing in `knowledge_brain/INDEX.md`.

