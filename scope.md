# Product Requirements Document (PRD)

## Product Name: WorkTimeTrack
**Owner:** [Your Name]
**Created On:** 2025-06-23
**Version:** 1.0

---

## 1. Overview
A minimalist time tracking application that allows a user to authenticate, login/logout for work sessions, and track their productive and gross hours. Inspired by Keka, but tailored for solo developers or small teams.

## 2. Goals
- Allow a user to authenticate securely.
- Enable tracking of productive time (time between login and logout).
- Display daily, monthly, and yearly reports.
- Keep it simple and focused on solo developer needs.

## 3. User Stories
### 🧑‍💻 Authentication
- As a user, I want to sign up and log in securely using email and password.

### ⏱ Work Time Tracking
- As a user, I want to "login to work" to start time tracking.
- As a user, I want to "logout from work" to stop time tracking.
- As a user, I want to see the duration of my current or last session.

### 📊 Reporting
- As a user, I want to see a daily report of work time (date, start, end, total duration).
- As a user, I want to see a monthly summary of total hours worked.
- As a user, I want to see a yearly summary of total hours worked and average productivity.

## 4. Functional Requirements
### 4.1 User Authentication
- ✅ User registration (email + password)
- ✅ Secure login/logout (JWT / Session-based)
- ✅ Forgot password / Reset password

### 4.2 Work Session Tracking
- ✅ Button to "Login to Work"
- ✅ Button to "Logout from Work"
- ✅ Store login timestamp on login
- ✅ Store logout timestamp on logout
- ✅ Calculate session duration in minutes/hours

### 4.3 Reports
- ✅ Daily view: List of sessions (with timestamps and total duration)
- ✅ Monthly view: Sum of all durations per day and total
- ✅ Yearly view: Month-wise total and yearly summary
- ✅ Export to CSV (optional)

### 4.4 Data Model (Simplified)
```ts
User {
  id: UUID
  email: string
  passwordHash: string
  createdAt: Date
}

WorkSession {
  id: UUID
  userId: UUID
  loginAt: DateTime
  logoutAt: DateTime | null
  durationMinutes: number | null // Calculated on logout
}
```

## 5. Non-Functional Requirements
- Minimal UI (React/Next.js, TailwindCSS)
- Backend with REST API (Node.js/Express or Django)
- SQLite or PostgreSQL as DB
- Deployment on Vercel + Railway or Supabase

## 6. Optional Features (Future Scope)
- Inactivity detection (for breaks)
- Pomodoro reminders
- Tagging sessions (e.g., "coding", "meeting")
- Multiple device sync
- Weekly email reports

## 7. Out of Scope
- Payroll
- Leave/Attendance Management
- HR features (like Keka)
- Team/manager dashboards

## 8. Mock UI Flow
```
[Login Page] → [Dashboard]
                  ↓
          [Login to Work]
                  ↓
        [Tracking in Progress]
                  ↓
          [Logout from Work]
                  ↓
        [View Reports: Daily / Monthly / Yearly]
```

---

# Updated Project Scope: WorkTimeTrack V1

## 1. Tech Stack Confirmation
- **Frontend & Backend:** Next.js (App Router preferred) with full-stack capabilities (API routes).
- **Styling:** TailwindCSS + shadcn/ui components – ✅ sufficient.
- **Database:** PostgreSQL (hosted via Neon).

## 2. Authentication
- ✅ Use JWT-based authentication for session management (via cookies or localStorage).
- ❌ Email verification is out of scope for V1 – skip for now.
- ✅ Basic user signup/login/logout with secure password hashing.

## 3. UI/UX
- ✅ Multi-page flow is acceptable (e.g., Login → Dashboard → Reports).
- ✅ Minimal but clean UI with TailwindCSS + shadcn.

## 4. Reporting
- ✅ Fixed views:
  - Daily (with per-session breakdown)
  - Monthly (day-wise total)
  - Yearly (month-wise summary)
- ❓ Filtering by date range – Optional, but could be a nice-to-have even in V1 if it's easy with SQL.
- ❌ CSV export can be deferred to V2.

## 5. User Management
- ✅ Support multiple users:
  - Each user sees only their own data.
  - No admin panel/team management needed in V1.

## 6. Deployment
- ✅ Local development is sufficient for now.
- Cloud deployment (Vercel + Neon) can be added once MVP is tested.

## 7. Password Reset
- ✅ Just a local password reset (like "Change Password" from within the account settings).
- ❌ No email-based forgot/reset password flow for now.

## ✅ Summary Checklist for V1 Features
| Feature                  | Included in V1 |
|--------------------------|:-------------:|
| JWT-based Auth           |      ✅       |
| Email Verification       |      ❌       |
| Multi-user support       |      ✅       |
| Work Session Logging     |      ✅       |
| Daily/Monthly/Yearly Report |   ✅       |
| CSV Export               |      ❌       |
| Date Filter on Reports   |   Optional    |
| Password Change (local)  |      ✅       |
| Forgot Password via Email|      ❌       |
| TailwindCSS + shadcn UI  |      ✅       | 