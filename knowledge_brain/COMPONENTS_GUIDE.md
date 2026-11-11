# Components & Atomic UI Library Guide

## Component Hierarchy & Directory Organization

All reusable presentation controls are housed in `frontend/src/components/`, while atomic building blocks reside in `frontend/src/components/ui/`. File-based page routes in `src/pages/` are pure route wrappers that compose these reusable components without defining inline hardcoded design sections or repeated markup. Spacing is strictly standardized to eliminate visual dead space across screens.

### Atomic UI Components (`src/components/ui/`)
1. **Button (`Button.jsx`)**: Supports variants (`primary`, `gold`, `outline`, `ghost`, `danger`) and sizes (`sm`, `md`, `lg`) with hover states and loading spinners.
2. **Input (`Input.jsx`)**: Form input wrapper with label, error messaging, icons, and focus ring styling.
3. **Select (`Select.jsx`)**: Customizable select dropdown with styled options and validation error state.
4. **Textarea (`Textarea.jsx`)**: Multi-line text field with counter and responsive auto-expansion.
5. **Card (`Card.jsx`)**: Standard card container with hover elevational transforms, border highlights, and dark navy backdrop (`h-full` stretch support).
6. **Badge (`Badge.jsx`)**: Status indicators, category chips, and tag labels (`gold`, `royal`, `soft`, `success`, `neutral`).
7. **Table (`Table.jsx`)**: Full-width responsive table with sorted header cells, styled rows, and empty state support.
8. **Breadcrumbs (`Breadcrumbs.jsx`)**: Navigational trail displaying ancestor routes with clickable links and active step highlighting.
9. **MetricCard (`MetricCard.jsx`)**: KPI summary card with trend indicators, animated counter support, and descriptive sub-labels.

### Layout Chrome & Reusable Section Components (`src/components/`)
1. **ContentSection (`ContentSection.jsx`)**: Universal section wrapper enforcing uniform compact padding (`py-10 sm:py-14`), eliminating visual dead gaps across all pages.
2. **HeroBanner (`HeroBanner.jsx`)**: Reusable landing hero banner with high-impact typography, gradient text, trust badges, CTAs, and interactive `DashboardPreview`.
3. **PageBanner (`PageBanner.jsx`)**: Universal starfield banner with breadcrumbs, title, subtitle, optional badge, initials icon, and action buttons.
4. **CtaBanner (`CtaBanner.jsx`)**: High-impact reusable CTA banner section with dual actions and compact padding.
5. **ProductCard (`ProductCard.jsx`)**: Reusable catalog card with price, strike-through original price, specifications list, stock indicator, and Add to Cart action.
6. **CartItemList (`CartItemList.jsx`)**: Reusable cart table and line item manager with quantity increment/decrement, SKU display, and remove triggers.
7. **OrderSummaryCard (`OrderSummaryCard.jsx`)**: Reusable financial calculation breakdown (subtotal, promotional coupon field, 18% GST input credit, free shipping badge, grand total, and checkout CTA).
8. **CheckoutForm (`CheckoutForm.jsx`)**: Reusable full-page checkout form for billing details, GSTIN parameters, logistics method selection, and payment options.
9. **CustomerAccountOverview (`CustomerAccountOverview.jsx`)**: Reusable customer portal tabs: Profile summary, active software license keys with copy utility, order history with tracking link, and priority support tickets.
10. **DeliveryTracker (`DeliveryTracker.jsx`)**: Reusable live delivery status component with tracking search, package manifest, carrier details, and milestone step timeline.
11. **CategoryShowcase (`CategoryShowcase.jsx`)**: Reusable category showcase with category pills, overview banner, and product grid.
12. **PolicyContent (`PolicyContent.jsx`)**: Reusable legal and policy layout with structured sections, last updated metadata, and legal desk contact trigger.
13. **SectionHeader (`SectionHeader.jsx`)**: Section header with badge, title, subtitle, and optional right-side action link.
14. **StatsSection (`StatsSection.jsx`)**: Operational metrics and KPI summary grid with tight vertical rhythm.
15. **SolutionCard (`SolutionCard.jsx`)**: Domain card for enterprise software solutions.
16. **IndustryCard (`IndustryCard.jsx`)**: Domain card for industry verticals with challenges and feature previews.
17. **ServiceCard (`ServiceCard.jsx`)**: Domain card for digital capabilities and deliverables.
18. **PortfolioCard (`PortfolioCard.jsx`)**: Domain card for client case studies and implementations.
19. **ArticleCard (`ArticleCard.jsx`)**: Domain card for technical publications and business insights.
20. **SearchFilterBar (`SearchFilterBar.jsx`)**: Combined search bar with category chips and count indicator.
21. **ProcessRoadmap (`ProcessRoadmap.jsx`)**: 6-stage engineering lifecycle cards.
22. **WhyChooseUsGrid (`WhyChooseUsGrid.jsx`)**: 8-pillar enterprise advantage grid.
23. **TestimonialSlider (`TestimonialSlider.jsx`)**: Interactive client testimonial switcher with rating stars.
24. **DemoBookingForm (`DemoBookingForm.jsx`)**: Reusable full-page demo booking workflow with real-time validation and confirmation state.
25. **ContactInquiryForm (`ContactInquiryForm.jsx`)**: Reusable full-page quotation request form with validation and direct contact channels.
26. **EmptyState (`EmptyState.jsx`)**: Reusable empty state view with reset button.
27. **DashboardPreview (`DashboardPreview.jsx`)**: Interactive animated mock dashboard with real-time KPI toggling and simulated telemetry graphs.
28. **FaqAccordion (`FaqAccordion.jsx`)**: Expandable questions and answers.
29. **AnnouncementBar (`AnnouncementBar.jsx`)**: Rotating headline bar.
30. **Navbar (`Navbar.jsx`)**: Sticky header with mega-menus, shopping cart badge counter, customer portal link, and quick search.
31. **Footer (`Footer.jsx`)**: Multi-column site footer with navigation groups and policies.
32. **ToastContainer (`ToastContainer.jsx`)**: Non-blocking notification banner stack.
33. **IconRenderer (`IconRenderer.jsx`)**: Tree-shakeable icon mapping component.
34. **CategoryCard (`CategoryCard.jsx`)**: Reusable category card with initials badge, gold accent underline, description, and link to category detail view matching the unified card design.
