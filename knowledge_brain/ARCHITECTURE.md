# Architecture & System Design

## Overview
AXINIX Technologies frontend is built as a Single-Page Application (SPA) powered by **React 19**, **Vite**, **Tailwind CSS v4** styling, and **React Router v6**. The architecture emphasizes high performance, reactive state updates, enterprise modularity, zero-modal dedicated page routing, and centralized API access.

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
    ├── components/          # Reusable UI library & layout chrome
    │   └── ui/              # Atomic UI building blocks (Table, Input, Button, Card, Badge, etc.)
    ├── context/             # React Context providers (Auth, Theme, Settings, Toast)
    ├── hooks/               # Custom reusable React hooks (useSearch, useDebounce, etc.)
    ├── layouts/             # Root application shells & route guards (MainLayout, AuthLayout)
    ├── pages/               # Pure file-based URL routes (no reusable components here)
    ├── utils/               # Helper functions, formatters, validators, and drivers
    ├── App.jsx              # Top-level application component with toast & providers
    ├── main.jsx             # Client entry point mounting React 19 to DOM
    └── index.css            # Tailwind CSS v4 theme variables & global styles
```

## Core Design Principles
1. **Modular Atomic UI**: Primitive UI elements (Button, Input, Card, Badge, Dropdown, Table, Modal-Free Alert) are decoupled from domain pages and housed in `src/components/ui/`.
2. **Zero-Modal Workflow Architecture**: Every data submission, inquiry, booking, or drill-down action executes on an explicit, bookmarkable URL route (`/demo`, `/contact`, `/solutions/:id`, etc.) with full keyboard navigation and breadcrumb history.
3. **Reactive State & Instant Feedback**: Filter state, active categories, live search queries, and form validation react immediately with fluid transition animations.
4. **Theme Tokens & Brand Identity**: Premium dark navy (`#101D3B`), deep void (`#0A1429`), royal indigo (`#3157A4`), and champagne gold (`#D5B779`) styling tokens mirrored into Tailwind variables and CSS custom properties.

