# Product Requirements Document (PRD)

## SkillSync Frontend

### 1. Product Overview

**Product Name:** SkillSync Frontend  
**Version:** 1.0.0  
**Product Type:** Web Application (Frontend Client for SkillSync Platform)

SkillSync Frontend is a **React-based web interface** that connects users to the SkillSync backend API.  
It provides a seamless user experience for **learning, teaching, and exchanging skills** with other users through a responsive, modern, and gamified design.

The frontend handles **authentication, profile management, session scheduling, wallet tracking, and feedback interactions**, delivering a consistent and intuitive user experience across desktop and mobile devices.

---

### 2. Target Users

- **Learners:** Browse skills, book sessions, and track learning progress.
- **Mentors:** Offer skills to teach, manage sessions, and view feedback.
- **Hybrid Users:** Engage in both learning and teaching roles simultaneously.
- **Admins:** Access dashboards for analytics, moderation, and system management.

---

### 3. Core Features

#### 3.1 Authentication & Authorization

- **User Registration & Login:**  
  Secure signup and login using email/password or Google OAuth.

- **Session Management:**  
  LocalStorage + JWT-based authentication for maintaining user sessions.

- **Forgot Password Flow:**  
  Trigger backend password reset via form and token link.

- **Access Control:**  
  Role-based access for Learner, Mentor, Hybrid, and Admin users.

---

#### 3.2 Dashboard

- **Personal Dashboard:**  
  Displays user overview (skills offered, skills wanted, tokens, ratings).

- **Activity Feed:**  
  Shows recent matches, sessions, and feedback notifications.

- **Progress Indicators:**  
  Visual charts for learning progress and teaching stats.

---

#### 3.3 Skill Management

- **Add / Edit Skills:**  
  Form to add offered or desired skills with tags and experience level.

- **Skill Search & Browse:**  
  Explore available skills and mentors with filters (skill type, location, experience).

- **Skill Suggestions:**  
  AI-driven recommendations based on user activity.

---

#### 3.4 Matchmaking & Discovery

- **Suggested Matches:**  
  Display recommended users for skill exchange.

- **Request System:**  
  Send, accept, or reject skill exchange requests.

- **Mutual Exchange Display:**  
  Highlight connections where skill interests overlap.

---

#### 3.5 Session Management

- **Session Creation:**  
  Integrated calendar component to schedule new learning/teaching sessions.

- **Session Tracking:**  
  View sessions under “Requested,” “Upcoming,” “Completed,” or “Cancelled.”

- **Session Notifications:**  
  Real-time updates for status changes.

- **Join Links:**  
  Embedded video conferencing integration (Zoom / Google Meet).

---

#### 3.6 Wallet & Tokens

- **Wallet Overview:**  
  Dashboard card showing total tokens and recent transactions.

- **Send Tokens:**  
  Interactive transfer modal to send or receive tokens.

- **Transaction History:**  
  Paginated list with date, amount, and transaction type.

- **Token Warnings:**  
  Frontend checks for sufficient balance before session booking.

---

#### 3.7 Feedback & Reviews

- **Feedback Form:**  
  Modal for rating and leaving comments after session completion.

- **Rating Display:**  
  Dynamic average rating stars on user profile.

- **Feedback Feed:**  
  Shows all received feedback with pagination.

---

#### 3.8 Notifications System

- **In-App Notifications:**  
  Bell icon dropdown showing recent alerts (session updates, new matches, etc.).

- **Email Notifications:**  
  Triggered via backend API when significant actions occur (session booked, token received).

- **Mark as Read / Clear:**  
  Simple UI to manage notifications.

---

#### 3.9 Admin Panel

- **User Management:**  
  View, edit, or remove users.

- **Skill Moderation:**  
  Approve or reject skills submitted for verification.

- **Platform Analytics:**  
  Display charts for top skills, active users, and feedback trends.

- **Session Oversight:**  
  Monitor platform activity and resolve flagged sessions.

---

#### 3.10 Error Handling & UI Feedback

- **Form Validation:**  
  Real-time validation messages for input errors.

- **Toast Notifications:**  
  Visual confirmation for success, warning, or failure.

- **Fallback UI:**  
  Friendly error pages (404, 500).

---

### 4. Technical Specifications

#### 4.1 Frontend Architecture

| Layer                | Technology          | Description                              |
| -------------------- | ------------------- | ---------------------------------------- |
| **Framework**        | React 18 + Vite     | SPA with optimized build and performance |
| **Styling**          | Tailwind CSS        | Responsive utility-first design          |
| **State Management** | Redux Toolkit       | Global state and async API handling      |
| **Routing**          | React Router DOM v6 | Page navigation and protected routes     |
| **API Calls**        | Axios / Fetch       | Communication with backend APIs          |
| **Form Handling**    | React Hook Form     | Validation and submission control        |
| **Charts**           | Recharts            | Dashboard analytics visualization        |
| **Notifications**    | React Toastify      | User feedback alerts                     |

---

#### 4.2 Component Hierarchy

**Major Components:**

- `/components/Auth/` → Login, Register, ForgotPassword
- `/components/Profile/` → UserProfile, SkillCard, EditProfileModal
- `/components/Skills/` → SkillList, SkillFilter, SkillForm
- `/components/Match/` → MatchCard, RequestModal, SuggestedMatches
- `/components/Sessions/` → SessionList, SessionCard, ScheduleForm
- `/components/Wallet/` → WalletCard, TransactionList
- `/components/Feedback/` → FeedbackForm, ReviewList
- `/components/Admin/` → UserTable, SkillModeration, AnalyticsDashboard

---

#### 4.3 API Integrations

| Module           | Endpoint                | Method | Description          |
| ---------------- | ----------------------- | ------ | -------------------- |
| **Auth**         | `/api/v1/auth/register` | POST   | User registration    |
|                  | `/api/v1/auth/login`    | POST   | Login existing user  |
|                  | `/api/v1/auth/logout`   | POST   | Logout               |
| **User Profile** | `/api/v1/users/:id`     | GET    | Fetch user profile   |
|                  | `/api/v1/users/:id`     | PUT    | Update user details  |
| **Skills**       | `/api/v1/skills/`       | GET    | Get available skills |
|                  | `/api/v1/skills/`       | POST   | Add skill            |
| **Sessions**     | `/api/v1/sessions/`     | GET    | List sessions        |
|                  | `/api/v1/sessions/`     | POST   | Schedule session     |
| **Wallet**       | `/api/v1/wallet/`       | GET    | Get wallet details   |
| **Feedback**     | `/api/v1/feedback/`     | POST   | Submit feedback      |

---

#### 4.4 Routing Structure
