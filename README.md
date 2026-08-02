# Habit Tracker

A full-stack habit tracking application that helps people build consistency through simple daily habit management, secure personal accounts, and a clean user experience.

[Live Demo](https://habit-tracker-six-murex.vercel.app) · [GitHub](https://github.com/PhilBKouokam/HabitTracker) · [Architecture Walkthrough](https://www.loom.com/share/f69f4dce4b53414299a23805874cc25b)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

## 🎥 Architecture Walkthrough

https://www.loom.com/share/f69f4dce4b53414299a23805874cc25b

## 🌐 Live Demo

https://habit-tracker-six-murex.vercel.app

## 💻 Source Code

https://github.com/PhilBKouokam/HabitTracker

## The Problem

Building a habit is rarely difficult because the action itself is complicated. The challenge is returning to it consistently, especially when progress is scattered, easy to forget, or difficult to see. Habit Tracker gives people one focused place to manage daily commitments and turn repeated actions into visible progress.

## Why I Built It

I built Habit Tracker to explore how thoughtful software can make consistency easier. The product keeps the daily loop clear—decide what matters, record the work, and see what has been completed—while demonstrating full-stack engineering across the interface, account security, application behavior, data ownership, and deployment boundaries.

The project required decisions across the complete system: keeping routine interactions quick, protecting each user's private records, maintaining predictable state between client and server, and making the experience usable across screen sizes.

## Product Philosophy

Habit software should make the next action easier, not turn self-improvement into another administrative task. Habit Tracker is designed to reduce friction, make progress visible, and encourage people to return without overwhelming them. The experience stays intentionally simple so the product supports consistency rather than competing for attention.

## Product Overview

Habit Tracker gives each user a private space for managing the routines they want to build. Users can create habits, track daily completion, separate completed work from what still needs attention, and adjust progress when plans change. Personal accounts keep each habit list secure, while the responsive interface makes the core workflow accessible across desktop and smaller screens.

## 📸 Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <strong>Login</strong><br />
      <img src="screenshots/login.png" alt="Habit Tracker login screen" width="420">
    </td>
    <td align="center" width="50%">
      <strong>Registration</strong><br />
      <img src="screenshots/register.png" alt="Habit Tracker registration screen" width="420">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>Create Habit</strong><br />
      <img src="screenshots/add-habit.png" alt="Habit Tracker create habit screen" width="420">
    </td>
    <td align="center" width="50%">
      <strong>Habit Dashboard</strong><br />
      <img src="screenshots/habit-list.png" alt="Habit Tracker dashboard with habit list" width="420">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>Completed Habits</strong><br />
      <img src="screenshots/completed-habits.png" alt="Habit Tracker completed habits screen" width="420">
    </td>
    <td align="center" width="50%">
      <strong>Mobile Responsive View</strong><br />
      <img src="screenshots/mobile-view.png" alt="Habit Tracker mobile responsive view" width="260">
    </td>
  </tr>
</table>

## Key Features

### Habit Management

- Create habits around the routines that matter to the user.
- Keep personal habits organized in one focused dashboard.
- Delete habits that are no longer relevant.

### Daily Progress

- Mark habits complete and undo completion when plans change.
- View completed and incomplete habits separately.
- See the habit list update immediately after each action.

### Secure Accounts

- Register and sign in to a personal account.
- Keep every habit scoped to its authenticated owner.
- Protect habit pages and operations from unauthenticated access.

### Responsive Experience

- Use the core habit workflow across desktop and smaller screens.
- Move through a clean interface designed to keep daily check-ins simple.

## 🏗 Architecture

Habit Tracker uses a layered client-server architecture with clear responsibility at each boundary. The frontend presents the habit workflow, authentication establishes the active user, the API provides a predictable interface to server capabilities, business logic enforces ownership and coordinates changes, and the database persists user and habit records. Successful responses then update the interface so the visible state reflects the stored result.

```text
Frontend
  ↓
Authentication
  ↓
REST API
  ↓
Business Logic
  ↓
Database
  ↓
UI Updates
```

- **Frontend:** Presents registration, sign-in, habit management, and progress views while coordinating local interface state.
- **Authentication:** Identifies the current user and attaches credentials to protected requests.
- **REST API:** Defines the boundary between the client experience and server-side operations through focused resource endpoints.
- **Business Logic:** Validates authenticated requests, applies habit changes, and ensures records can only be accessed by their owner.
- **Database:** Persists account and habit data through structured models and user-record relationships.
- **UI Updates:** Reconciles API responses with React state so completed, incomplete, added, and deleted habits appear predictably.

This separation keeps presentation concerns out of persistence and prevents the client from becoming the authority for protected data. The result is a request flow that is straightforward to trace, test, and extend.

### Request Flow

`React UI` → `React Context` → `REST API` → `Express Controllers` → `MongoDB with Mongoose` → `API Response` → `React UI Update`

### Key User Flow

`Register` → `Login` → `Create Habit` → `Complete / Undo` → `Delete Habit`

## Engineering Decisions

### React Context for Shared Authentication State

Authentication state must be available across routes and protected screens, but the application's shared-state needs are focused. React Context keeps that state centralized without introducing a larger state-management dependency. The tradeoff is that context must remain narrow as the product grows to avoid coupling unrelated interface state or triggering unnecessary updates.

### Express for a Focused API Layer

Express provides a small foundation for routing, authentication middleware, and controller logic without imposing a large framework structure. That keeps the request lifecycle visible and makes client-server boundaries easy to follow, while placing responsibility on the project to maintain clear route, middleware, and controller conventions.

### MongoDB for User-Owned Habit Records

Habit records are compact, user-scoped documents whose shape maps naturally to a document database. MongoDB supports direct persistence and straightforward model evolution, while Mongoose adds schemas and validation where consistency matters. This favors flexibility and simplicity over relational constraints that would become more valuable if the product developed complex relationships or reporting requirements.

### JWT for Stateless Authentication

JWTs allow a separately deployed client and API to authenticate protected requests without storing server-side session state. That fits the current architecture, but it also makes token handling, expiration, and storage important security concerns. Authorization is therefore enforced again at the API and database-query boundaries rather than trusted to the client.

### Client and Server Separation

The frontend and backend are deployed as distinct services so the interface can focus on interaction while the API owns authentication, authorization, and persistence. This makes responsibilities clearer and allows each layer to evolve independently. The tradeoff is additional coordination around environment configuration, cross-origin access, API availability, and deployment compatibility.

## Tech Stack

**Frontend:** React, React Router, React Context, JavaScript, Bootstrap, Vite

**Backend:** Node.js, Express, JavaScript

**Database:** MongoDB, Mongoose

**Authentication:** JWT, bcrypt

**Deployment:** Vercel frontend, Render backend

**Developer Tools:** npm, ESLint, Git, GitHub

## Development Workflow

AI-assisted development helped accelerate investigation, implementation, debugging, and documentation throughout the project. It supported faster exploration of code paths, comparison of implementation options, and iteration on fixes and explanations.

Architecture decisions, testing, validation, and final verification remained under human review. AI was used as an engineering aid, while responsibility for product direction, tradeoffs, and the quality of the finished system remained with the developer.

## API Overview

| Method | Route | Description | JWT Required |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create a user, hash the password, and return a JWT. | No |
| POST | `/api/auth/login` | Validate credentials and return a JWT. | No |
| GET | `/api/habits` | Fetch habits for the authenticated user. | Yes |
| POST | `/api/habits` | Create a habit for the authenticated user. | Yes |
| PATCH | `/api/habits/:id` | Update completion status and completion date. | Yes |
| DELETE | `/api/habits/:id` | Delete a habit owned by the authenticated user. | Yes |

## 🚀 Future Improvements

Habit Tracker's roadmap is centered on helping people understand their consistency over time while keeping the daily experience lightweight. The next product steps would deepen reflection, improve timely support, and strengthen reliability without adding friction to the core habit loop.

- Add full habit editing so routines can evolve without being recreated.
- Track habit streaks and completion history to make longer-term consistency visible.
- Add a calendar view for reviewing weekly and monthly progress.
- Introduce optional email reminders for habits that are due.
- Add optional push notifications for recurring habits.
- Build an analytics dashboard for completion rates and consistency trends.
- Add automated frontend and backend tests to protect critical user flows.
- Strengthen request validation with a schema validation library.
- Move authentication to HTTP-only cookies for stronger token storage.

## Local Development

### Prerequisites

- Node.js
- npm
- MongoDB connection string

### Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` using `backend/.env.example`:

```bash
PORT=4500
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
JWT_SECRET=replace-with-a-long-random-development-secret
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` using `frontend/.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:4500
```

Open the frontend development server in your browser, register an account, and start tracking habits.
