# Known Limitations & Bug Recipes

This document outlines architectural limitations, known defect recipes, and required design patterns for the AXINIX codebase.

---

## 1. Populate Engine Query Constraints
1. **Minimal Lock Windows**: Keep database locks strictly under 10ms.
2. **Composite Indexes for Soft-Delete**: Compound index pattern `(status, tenant_id, created_at)` required for MySQL.
3. **Prefetch Memory Safeguards**: Enforce max depth of 3 levels and a 50-item child pagination ceiling to prevent OOM errors.
4. **Pipeline Caching**: Cache parsed DSL plans and authorization policies in-memory.

---

## 2. Frontend Workflow & Modal Prohibition (Rule 11)
- **Zero Modals for Workflows**: Never use dialog overlays or popups for form submissions, creation, editing, or booking workflows.
- **Dedicated Page Routing**: Every workflow must have its own bookmarkable URL (e.g. `/demo`, `/contact`, `/solutions/:id`, `/services/:id`).
- **Responsive Layout**: Full-width spacious views (`w-full`), clear breadcrumbs with back links.
- **Auditable Requests**: Propagate `X-Request-ID` across all API calls and sanitized payloads.

