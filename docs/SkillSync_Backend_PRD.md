# Product Requirements Document (PRD)

## SkillSync Backend

### 1. Product Overview

**Product Name:** SkillSync Backend  
**Version:** 1.0.0  
**Product Type:** RESTful API Service for Skill Exchange Platform

SkillSync Backend is a RESTful API service that powers a peer-to-peer skill exchange platform. It enables users to **learn new skills in exchange for teaching others**, providing a structured environment for authentication, matchmaking, session scheduling, wallet management, and feedback handling.

The system implements **secure authentication, role-based access control**, and **modular APIs** that allow learners and mentors to connect, exchange tokens, and track progress efficiently.

---

### 2. Target Users

- **Hybrid Users:**  
  Members who both teach and learn — engaging in two-way skill exchange.
- **Admins:**  
  Platform moderators who manage users, skills, feedback, and platform data integrity.

---

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:**  
  Account creation with email verification and Google OAuth.

- **User Login:**  
  Secure JWT-based authentication with token refresh.

- **Password Management:**  
  Change password, forgot/reset password support.

- **Email Verification:**  
  One-time verification token sent to user email.

- **Role-Based Access Control (RBAC):**  
  Four-tier permission system — _Admin_, _Mentor_, _Learner_, _Hybrid_.

---

#### 3.2 User Profile Management

- **Profile Creation:**  
  Add bio, skills offered, skills wanted, and experience level.

- **Profile Viewing:**  
  Public profiles showing teaching and learning stats.

- **Profile Updates:**  
  Modify personal info, add new skills, update teaching availability.

- **Skill Verification (Admin only):**  
  Approve or reject submitted certifications or badges.

---

#### 3.3 Skill Matchmaking System

- **Skill Discovery:**  
  Search and filter users based on skill tags, experience level, or location.

- **Smart Recommendations:**  
  Suggest potential partners using AI-based similarity scoring.

- **Mutual Exchange Matching:**  
  Match users where _Skill A (offered)_ by User 1 = _Skill A (wanted)_ by User 2.

---

#### 3.4 Session Management

- **Session Creation:**  
  Create and schedule 1-on-1 or group learning sessions.

- **Session Details:**  
  View meeting time, platform (Google Meet/Zoom), and participants.

- **Session Status:**  
  Track session as _Requested_, _Confirmed_, _Completed_, or _Cancelled_.

- **Session Feedback:**  
  Submit ratings and reviews post-session.

---

#### 3.5 Wallet & Token System

- **Token Balance:**  
  Users earn tokens for teaching and spend them for learning.

- **Transaction Logging:**  
  Record all token transfers between users.

- **Admin Token Adjustment:**  
  Admins can credit/debit tokens for maintenance or reward purposes.

- **Payment Gateway (Phase 2):**  
  Integration with Razorpay or Stripe for premium sessions.

---

#### 3.6 Feedback & Rating System

- **Feedback Submission:**  
  Users rate mentors or learners after each session.

- **Review Moderation (Admin only):**  
  Admin can flag or remove inappropriate feedback.

- **Rating Aggregation:**  
  Average rating stored on user profile and used in recommendations.

---

#### 3.7 Notification & Communication

- **Notifications:**  
  In-app and email notifications for new matches, session updates, and feedback.

- **Chat Integration (Phase 2):**  
  Real-time messaging for pre-session coordination.

---

#### 3.8 System Health

- **Health Check Endpoint:**  
  Provides API uptime and database connectivity status.

---

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Authentication Routes** (`/api/v1/auth/`)

- `POST /register` – Register new user
- `POST /login` – User login
- `POST /logout` – Logout (secured)
- `GET /current-user` – Get user info (secured)
- `POST /change-password` – Change user password
- `GET /verify-email/:token` – Verify user email
- `POST /resend-email-verfication/` – Resend verify user email
- `POST /refresh-token` – Refresh JWT token
- `POST /forgot-password` – Request password forgot
- `POST /reset-password` – Request password reset

**User Profile Routes** (`/api/v1/users/`)

- `GET /` – Get all users (Admin only)
- `GET /:id` – Get specific user profile
- `PUT /:id` – Update profile (secured)
- `DELETE /:id` – Delete user (Admin only)

**Skill Routes** (`/api/v1/skills/`)

- `GET /` – List all available skills
- `POST /` – Add skill (secured)
- `DELETE /` – Remove skill (User only)

**Matchmaking Routes** (`/api/v1/match/`)

- `GET /suggested` – Fetch AI-based match suggestions (secured)
- `POST /request` – Send match request to another user (secured)
- `PUT /accept/:id` – Accept a match request(secured)
- `DELETE /reject/:id` – Reject a match(secured)

**Session Routes** (`/api/v1/sessions/`)

- `GET /` – List all sessions (secured)
- `POST /` – Create a new session (secured)
- `GET /:id` – Get session details (secured)
- `PUT /:id` – Update session status (secured)
- `DELETE /:id` – Cancel session (secured)

**Wallet Routes** (`/api/v1/wallet/`)

- `GET /` – Get user wallet details (secured)
- `POST /transfer` – Send tokens to another user (secured)
- `POST /reward` – Admin rewards/adjustments (Admin only)

**Feedback Routes** (`/api/v1/feedback/`)

- `POST /` – Submit feedback
- `GET /:userId` – View feedback for a user
- `DELETE /:id` – Remove feedback (Admin only).

**Health Check** (`/api/v1/healthcheck/`)

- `GET /` – System status

---

#### 4.2 Permission Matrix

| Feature         | Admin | Mentor | Learner | Hybrid |
| --------------- | ----- | ------ | ------- | ------ |
| Create Session  | ✓     | ✓      | ✓       | ✓      |
| Cancel Session  | ✓     | ✓      | ✓       | ✓      |
| Manage Wallet   | ✓     | ✓      | ✓       | ✓      |
| Modify Feedback | ✓     | ✗      | ✗       | ✗      |
| Manage Skills   | ✓     | ✓      | ✓       | ✓      |
| Approve Skills  | ✓     | ✗      | ✗       | ✗      |
| Delete User     | ✓     | ✗      | ✗       | ✗      |
| View Analytics  | ✓     | ✗      | ✗       | ✗      |

---

#### 4.3 Data Models

**User Roles:**

- `admin` — Full access
- `mentor` — Teaches skills and earns tokens
- `learner` — Learns skills and spends tokens
- `hybrid` — Both teaches and learns

**Data Structures:**

**User**

```json
{
  "id": "ObjectId",
  "username": "String",
  "Fullname": "String",
  "email": "String",
  "age": "Number",
  "password": "String",
  "role": "Learner | Mentor | Hybrid | Admin",
  "skillsOffered": ["String"],
  "skillsWanted": ["String"],
  "bio": "String",
  "tokens": "Number",
  "rating": "Number"
}
```

**Session**

```json
{
  "id": "ObjectId",
  "mentorId": "ObjectId",
  "learnerId": "ObjectId",
  "skill": "String",
  "status": "requested | confirmed | completed | cancelled",
  "scheduledAt": "Date",
  "feedbackId": "ObjectId"
}
```

**Wallet**

```json
{
  "userId": "ObjectId",
  "balance": "Number",
  "transactions": ["ObjectId"]
}
```

**Transaction**

```json
{
  "id": "ObjectId",
  "fromUser": "ObjectId",
  "toUser": "ObjectId",
  "amount": "Number",
  "timestamp": "Date",
  "transactionType": "earn | spend | transfer"
}
```

**Feedback**

```json
{
  "id": "ObjectId",
  "fromUser": "ObjectId",
  "toUser": "ObjectId",
  "rating": "Number",
  "comment": "String",
  "createdAt": "Date"
}
```

---

### 5. Security Features

- JWT-based authentication with refresh tokens
- Role-based authorization middleware
- Input validation for all endpoints
- Secure password hashing (bcrypt)
- File upload validation for profile images
- Rate limiting & CORS configuration
- Email verification via tokenized links

---

### 6. File Management

- User profile pictures stored in `/uploads/profile_images/`
- Files linked via secure URLs
- Admin moderation access for all uploads

---

### 7. Success Criteria

- Secure authentication and skill-matching logic
- Seamless session scheduling and wallet transaction flow
- Token-based reward system functioning correctly
- Role-based authorization implemented for all endpoints
- High reliability (>99% uptime) and low API latency (<500ms)

---

**Document Owner:** Suprathik Joshua, Product Lead — SkillSync  
**Version:** 1.0.0  
**Last Updated:** October 2025
