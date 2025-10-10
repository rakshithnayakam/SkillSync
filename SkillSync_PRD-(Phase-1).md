# Product Requirements Document (PRD)

## Project: SkillSync

**Version:** 1.0.0  
**Document Owner:** Product Management Team  
**Last Updated:** October 2025  

---

## 1. Product Overview

**Product Name:** SkillSync  
**Product Type:** Web Platform (React + Node.js + MongoDB)  
**Product Goal:** To create a peer-to-peer platform where individuals can share, teach, and learn skills directly from one another — fostering a decentralized learning community driven by collaboration rather than institutions.

**Summary:**  
SkillSync is a community-driven skill exchange network that connects learners and mentors worldwide. Users can showcase their skills, request mentorship, book learning sessions, exchange tokens for teaching time, and grow a verified skill portfolio.

---

## 2. Target Users

| User Type | Description | Key Goals |
|------------|--------------|-----------|
| **Learners** | Individuals seeking to learn new skills (coding, design, music, etc.) | Find mentors, join sessions, grow skillset |
| **Mentors** | Skilled individuals willing to teach others | Offer lessons, earn tokens or money, build credibility |
| **Hybrid Users** | Users who both teach and learn | Exchange skills mutually, grow network |
| **Admins** | Platform moderators managing users and sessions | Ensure content quality, verify users, resolve disputes |

---

## 3. Core Features

### 3.1 User Authentication & Profiles
- User Signup/Login with email or Google OAuth  
- Profile Setup with bio, location, skill tags, and experience  
- Skill Portfolio showcasing verified skills, badges, and session history  
- Account Verification (KYC for premium mentors)

### 3.2 Skill Matching System
- Search & Filters by skill, level, price, or location  
- Smart Recommendations using AI matching algorithms  
- Mutual Skill Swap (barter model)

### 3.3 Session Management
- Session Booking (1:1 or group)  
- Scheduling with Google Calendar integration  
- Session Feedback and rating  
- Cancellation and refund system

### 3.4 Community & Communication
- Real-time Chat between mentors and learners  
- Discussion Forums for Q&A and tutorials  
- Resource Sharing (upload documents, links, and videos)

### 3.5 Token & Monetization System
- Internal Skill Tokens (earn by teaching, spend to learn)  
- Wallet Dashboard for transactions and balance  
- Paid Sessions via Stripe/Razorpay (Phase 2)  
- Premium Membership with extra features and visibility

### 3.6 Reviews & Ratings
- Post-Session Reviews with text and rating  
- Global Reputation Score (weighted average)  
- Badge System (Top Mentor, Fast Learner, Trusted Teacher)

### 3.7 Admin Dashboard
- User Management and approvals  
- Skill Taxonomy maintenance  
- Analytics Dashboard (top skills, engagement rates)  
- Content Moderation tools

---

## 4. Technical Specifications

### 4.1 System Architecture
**Frontend:** React + Redux Toolkit + TailwindCSS  
**Backend:** Node.js + Express  
**Database:** MongoDB (Mongoose ORM)  
**Auth:** JWT + Google OAuth  
**Storage:** Cloudinary / AWS S3  
**Real-time:** Socket.io  
**Deployment:** Vercel (frontend) + Render/Atlas (backend)

### 4.2 API Endpoints (Sample)

| Module | Endpoint | Method | Description |
|---------|-----------|--------|--------------|
| **Auth** | `/api/v1/auth/register` | POST | Register user |
| | `/api/v1/auth/login` | POST | Login user |
| | `/api/v1/auth/logout` | POST | Logout |
| **User** | `/api/v1/users/:id` | GET | Fetch user profile |
| | `/api/v1/users/:id` | PUT | Update user profile |
| **Skills** | `/api/v1/skills` | GET | Fetch skills |
| | `/api/v1/skills` | POST | Add skill |
| **Sessions** | `/api/v1/sessions` | POST | Create session |
| | `/api/v1/sessions/:id` | PUT | Update session |
| | `/api/v1/sessions/user/:id` | GET | Get session history |
| **Tokens** | `/api/v1/wallet` | GET | Wallet balance |
| | `/api/v1/wallet/transfer` | POST | Transfer tokens |
| **Chat** | `/api/v1/chat/:userId` | GET | Get messages |
| | `/api/v1/chat/send` | POST | Send message |

### 4.3 Role-Based Access Matrix

| Feature | Admin | Mentor | Learner |
|----------|--------|---------|----------|
| Create Session | ✗ | ✓ | ✓ |
| Cancel Session | ✓ | ✓ | ✓ |
| Access Chat | ✓ | ✓ | ✓ |
| Manage Tokens | ✓ | ✓ | ✓ |
| Moderate Reviews | ✓ | ✗ | ✗ |
| Manage Users | ✓ | ✗ | ✗ |
| Post Resource | ✓ | ✓ | ✓ |
| View Analytics | ✓ | ✗ | ✗ |

---

## 5. Data Models

### User
```json
{
  "id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String",
  "role": "learner | mentor | hybrid | admin",
  "skillsOffered": ["String"],
  "skillsWanted": ["String"],
  "bio": "String",
  "profileImage": "String",
  "rating": "Number",
  "tokens": "Number"
}
```

### Session
```json
{
  "id": "ObjectId",
  "mentorId": "ObjectId",
  "learnerId": "ObjectId",
  "skill": "String",
  "status": "requested | confirmed | completed | cancelled",
  "scheduledAt": "Date",
  "feedback": "String"
}
```

### TokenTransaction
```json
{
  "id": "ObjectId",
  "fromUser": "ObjectId",
  "toUser": "ObjectId",
  "amount": "Number",
  "timestamp": "Date",
  "type": "earn | spend | transfer"
}
```

---

## 6. Security Features
- JWT authentication with refresh tokens  
- Role-based authorization middleware  
- Input validation and sanitation  
- Encrypted passwords using bcrypt  
- Cloud storage security via signed URLs  
- Rate limiting & CORS configuration

---

## 7. Success Metrics

| Metric | Goal |
|---------|------|
| User retention rate | > 70% after 1 month |
| Average session rating | ≥ 4.0 |
| Skill exchange success rate | ≥ 80% matched sessions |
| Average tokens earned per mentor | > 50/month |
| Active users (3 months post-launch) | ≥ 5000 |

---

## 8. Future Enhancements
- AI mentor recommendations  
- Gamified progress tracking  
- AI-based skill verification  
- Mobile App (React Native)  
- LinkedIn integration for verified skills
