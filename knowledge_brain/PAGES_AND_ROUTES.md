# Pages, Layouts & Route Hierarchy

## Overview
Per **Core Rule 11 (Strict Prohibition of Popups/Modals & Mandatory Dedicated Page Routing)**, modal popups and dialog overlays are forbidden for user workflows. Every action—such as booking a demo, contacting the team, inspecting a solution, viewing a case study, checking out, tracking a delivery, or managing licenses—possesses an explicit, bookmarkable URL route.

## Standardized Folder-Based Page Structure
The application adheres strictly to the folder-based page convention matching project system standards:
```
pages/
├── home/
│   └── index.jsx             # Home / Landing page
├── cart/
│   └── index.jsx             # Dedicated Shopping Cart & Order Configurator (/cart)
├── category/
│   └── [slug].jsx            # Dynamic Product Category Catalog (/category/:slug)
├── checkout/
│   └── index.jsx             # Dedicated Full-Page Checkout & GST Details (/checkout)
├── customer-account/
│   └── index.jsx             # Enterprise Client Portal, Licenses & Tickets (/customer-account)
├── delivery/
│   └── index.jsx             # Live GPS Hardware Dispatch & Shipment Tracking (/delivery)
├── solutions/
│   ├── index.jsx             # Master solutions list (/solutions)
│   └── [id].jsx              # Dynamic solution details (/solutions/:id)
├── industries/
│   ├── index.jsx             # Master industries catalog (/industries)
│   └── [slug].jsx            # Dynamic industry details (/industries/:slug)
├── services/
│   ├── index.jsx             # Master services catalog (/services)
│   └── [id].jsx              # Dynamic service details (/services/:id)
├── products/
│   └── index.jsx             # Production products catalog (/products)
├── portfolio/
│   ├── index.jsx             # Master portfolio showcase (/portfolio)
│   └── [id].jsx              # Dynamic case study details (/portfolio/:id)
├── about/
│   └── index.jsx             # About us company profile (/about)
├── insights/
│   ├── index.jsx             # Master insights / blog list (/insights)
│   └── [id].jsx              # Dynamic insight publication reader (/insights/:id)
├── demo/
│   ├── index.jsx             # Demo scheduling overview & guidelines
│   └── create.jsx            # Dedicated full-page demo booking workflow (/demo, /demo/create)
├── contact/
│   ├── index.jsx             # Contact hub & direct communication channels
│   └── create.jsx            # Dedicated full-page quotation request workflow (/contact, /contact/create)
├── search/
│   └── index.jsx             # Unified global search interface (/search)
├── login/
│   └── index.jsx             # Client portal authentication (/login)
├── help-policies/            # Grouped compliance & institutional policies
│   ├── contact/
│   │   ├── index.jsx
│   │   └── create.jsx        # Dedicated policy contact workflow
│   ├── faq/
│   │   └── index.jsx         # Frequently asked questions (/help-policies/faq)
│   ├── privacy-policy/
│   │   └── index.jsx         # Data governance policy (/help-policies/privacy-policy)
│   ├── terms/
│   │   └── index.jsx         # Terms of service & MSA (/help-policies/terms)
│   ├── return-policy/
│   │   └── index.jsx         # Hardware return & software warranty (/help-policies/return-policy)
│   ├── returns/
│   │   └── index.jsx         # Alias route for returns (/help-policies/returns)
│   ├── shipping/
│   │   └── index.jsx         # Freight policy alias (/help-policies/shipping)
│   ├── shipping-policy/
│   │   └── index.jsx         # Domestic logistics & tracking (/help-policies/shipping-policy)
│   └── cookie-policy/
│       └── index.jsx         # Local storage & cookie disclosures (/help-policies/cookie-policy)
└── not-found/
    └── index.jsx             # 404 recovery page
```

## Component Reusability & Zero Hardcoded Page Designs
Per architectural requirements:
- No page defines inline custom section containers, hardcoded layouts, or unshared markup.
- Pages strictly import and compose high-level reusable domain components (`HeroBanner`, `ContentSection`, `ProductCard`, `CartItemList`, `OrderSummaryCard`, `CheckoutForm`, `CustomerAccountOverview`, `DeliveryTracker`, `CategoryShowcase`, `PolicyContent`, etc.).
- Uniform section padding (`py-10 sm:py-14`) and grid card stretching (`h-full flex flex-col justify-between`) guarantee **zero visual dead space**.
