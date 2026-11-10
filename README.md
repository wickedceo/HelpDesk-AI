HelpDesk AI

Intelligent Customer Support Dashboard

A modern customer support management dashboard built with React, TypeScript and Vite. HelpDesk AI brings ticket management, customer organisation, analytics and AI-assisted support workflows into one intuitive workspace.

Features

Dashboard

* Customer support overview and statistics.
* Recent ticket activity.
* Quick navigation across workspaces.

Ticket Management

* Create and manage support tickets.
* Search tickets by ID, subject or customer.
* Filter by ticket status.
* Update ticket status and priority.
* Delete tickets.

Customer Management

* View and search customer records.
* Add new customers.
* Update customer status.
* Delete customer records.
* Contact customers through email links.

AI Assistant

* Generate suggested customer support replies.
* Create ticket summary suggestions.
* Explore troubleshooting recommendations.
* Copy generated responses.
* Start new requests.
* Keyboard shortcut support.

Analytics

* Support performance overview.
* Weekly ticket activity visualisations.
* Ticket trends and reporting.

User Experience

* Modern dark dashboard interface.
* Responsive navigation.
* Global workspace search.
* Interactive notification menu.
* Profile dropdown.
* Lazy-loaded analytics page.

Technology Stack

Technology	Purpose
React	UI development
TypeScript	Type safety
Vite	Build tooling
CSS	Styling and responsive layouts
Lucide React	Icon library
Recharts	Data visualisation
Oxlint	Code quality

Getting Started

Prerequisites

* Node.js 20.19+ or 22.12+
* npm

Installation

git clone YOUR_REPOSITORY_URL
cd HelpDesk-AI
npm install
npm run dev

Open the local URL provided by Vite.

Available Scripts

Command	Description
npm run dev	Start development server
npm run lint	Run Oxlint
npm run build	Type-check and build for production
npm run preview	Preview production build

Project Structure

src/
├── assets/
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── StatCard.tsx
├── data/
│   └── mockData.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Tickets.tsx
│   ├── Customers.tsx
│   ├── Analytics.tsx
│   └── AIAssistant.tsx
├── types/
│   └── index.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx

Current Implementation

HelpDesk AI is currently an interactive frontend demonstration.

* Ticket and customer changes are managed in local React state.
* Records and analytics use demonstration data.
* The AI Assistant generates rule-based example responses.
* Backend persistence, authentication and live AI integration are not yet implemented.

Roadmap

* [ ]	Backend API integration
* [ ]	Database persistence
* [ ]	Authentication and role-based access
* [ ]	Real-time ticket updates
* [ ]	Ticket assignment and collaboration
* [ ]	Live AI API integration
* [ ]	Advanced analytics and reporting
* [ ]	Email and notification integration
* [ ]	Automated support workflows

Quality Checks

npm run lint
npm run build

Project Purpose

This project demonstrates frontend engineering, component-based architecture, TypeScript, state management, dashboard development and interactive customer support workflows.

⸻

HelpDesk AI
Making customer support operations more organised, accessible and efficient.