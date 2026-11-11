# Populate Helper & Centralized API Client

## Centralized Network Client Architecture

In accordance with system rules:
- All external API communication flows through a unified client in `src/api/client.js`.
- The populate helper (`src/api/populateHelper.js`) provides standard client-side abstraction for querying models, prefetching relations (up to depth 3), applying AST filters, and managing pagination ceilings.
- Requests automatically propagate correlation tracking headers (`X-Request-ID`) to ensure end-to-end auditability and compliance with **Rule 10**.

## Model Definitions & Domain Services
Domain entities mapped in `src/api/data.js` and `src/api/services/`:
- `solutions`: Enterprise ERP, CRM, POS, HRMS, Inventory, Accounting, School, BI.
- `industries`: Textile, Jewellery, Restaurant, Education, Retail, Manufacturing, Construction, Healthcare, Wholesale, etc.
- `services`: Web, E-Commerce, Retail Solutions, App Development, Social Media, Digital Marketing, Custom Software.
- `portfolio`: Implementations, boutique platforms, school apps, retail billing deployments.
- `insights`: In-depth business & tech publications.
- `demoRequests`: Schema and handlers for demo booking appointments.
- `inquiries`: Schema and handlers for contact quotations.

## Audit Logging & Sanitization
All client-side submission helpers sanitize sensitive payload properties and log correlation IDs to local storage / memory audit pipelines before dispatching network calls.

