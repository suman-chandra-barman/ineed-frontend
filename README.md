<div align="center">

# iNeed 🧼✨

**iNeed** is a modern web app that connects customers with trusted local cleaning service providers — enabling service discovery, booking, payments, and real-time messaging.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-149ECA)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)

</div>

## Table of Contents

- 📚 [Project Overview](#project-overview)
- 🧰 [Tech Stack](#tech-stack)
- ✅ [Key Features](#key-features)
- 🗂️ [Project Structure](#project-structure)
- 🛠️ [Installation](#installation)
- 🔐 [Environment Variables](#environment-variables)
- 📦 [Scripts](#scripts)
- 🚀 [Build & Deployment](#build--deployment)

## Project Overview

This repository contains the **frontend** for iNeed, built with the **Next.js App Router**. It includes:

- Public marketing pages (services, categories, policies)
- Customer booking flow (multi-step)
- User dashboard (bookings, favorites, chat, settings)
- Provider dashboard (jobs, earnings, availability, profile & legal info)
- Real-time chat powered by WebSockets

## Tech Stack

### Core

- **Next.js** (App Router)
- **React**
- **TypeScript**

### UI & Styling

- **Tailwind CSS**
- **Radix UI** primitives
  - `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, etc.
- **shadcn/ui** setup (see `components.json`) + component patterns in `src/components/ui`
- **lucide-react** + **react-icons** (icons)
- **class-variance-authority**, **clsx**, **tailwind-merge** (utility helpers)
- **tw-animate-css** (animation utilities)
- **sonner** (toast notifications)

### State, Data & Forms

- **Redux Toolkit** + **React Redux**
- **RTK Query** (API layer via `fetchBaseQuery`)
- **react-hook-form**
- **zod** + `@hookform/resolvers` (schema validation)

### Utilities

- **date-fns** (date/time helpers)
- **embla-carousel-react** (carousel)

### Tooling

- **ESLint** + `eslint-config-next`

## Key Features

- 🔐 **Auth flows**: Sign in / Sign up, email verification, forgot/reset password, OTP verification
- 🧭 **Provider onboarding**: multi-step onboarding to capture service, availability, and legal info
- 🧹 **Service discovery**: browse services & categories, view service details
- ⭐ **Favorites**: save and manage favorite services
- 🗓️ **Booking flow**: multi-step booking (`Additional Features → Info → Date/Time → Payment → Confirmation`)
- 💳 **Payments**: checkout flow integrated via backend (supports returning with a `session_id`)
- 🧑‍💼 **User dashboard**: booking list, booking details (before/after images), chat access, settings
- 🧰 **Provider dashboard**: jobs/today view, earnings, profile management, availability management
- 💬 **Real-time chat**: WebSocket-based chat rooms with authenticated access
- 🔔 **Toast feedback**: non-blocking success/error notifications

## Project Structure

The app uses route groups to keep the codebase organized:

```
src/
	app/
		(auth)/
			signin/ signup/ forgot-password/ reset-password/
			verify-email/ verify-reset-otp/ onbording/
		(main)/
			page.tsx
			services/ categories/ booking/[serviceId]/
			privacy-policy/ provider-policy/ customer-policy/ pricing-fair-use-policy/
		(dashboard)/
			user/    (bookings, chat, favorites, settings)
			provider (jobs, earnings, chat, availability, legal info, settings)
	components/
	redux/
	hooks/
	schemas/
	types/
	lib/
```

## Installation

### Prerequisites

- Node.js **18+** (recommended)
- npm / pnpm / yarn

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables-) below).

### 3) Start the dev server

```bash
npm run dev
```

Then open:

- http://localhost:3000

## Environment Variables

This app expects a backend base URL for API calls, image URLs, and WebSocket chat connections.

Create `.env.local` with:

| Variable                       | Required | Example                     | Notes                                                                                                            |
| ------------------------------ | -------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BACKEND_BASE_URL` | ✅       | `https://api.hey-ineed.com` | Prefer **no trailing slash** (the app appends `/api` internally). Also used to derive `ws://`/`wss://` for chat. |

### Notes on Images (Next.js)

- `next.config.ts` allows optimized images from `https://api.hey-ineed.com/**`.
- If you point `NEXT_PUBLIC_BACKEND_BASE_URL` to a different domain, update `images.remotePatterns` in `next.config.ts` (or use unoptimized images where appropriate).

## Scripts

- `npm run dev` — start Next.js in development mode
- `npm run build` — create a production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint

## Build & Deployment

```bash
npm run build
npm run start
```

Make sure the required environment variables are set in your hosting platform (for example, `.env.local` locally and environment settings in production).
