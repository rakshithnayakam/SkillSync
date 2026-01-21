# SkillSync

SkillSync is a skill-sharing platform where users can **learn new skills** by connecting with others and **teach skills** they are proficient in. Our mission is to create a collaborative learning ecosystem where knowledge is exchanged seamlessly.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User Registration & Authentication** – Sign up, login, and secure password recovery.
- **Skill Sharing** – Users can create and browse skill offerings.
- **Learning Requests** – Request to learn a skill from another user.
- **Gamification** – Earn points, badges, and rankings by teaching and learning.
- **Reviews & Ratings** – Rate and review teachers and courses.
- **Responsive Design** – Works across devices (desktop, tablet, mobile).

---

## Demo

- **Live Demo:** Coming Soon
- **Screenshots:**  
  Coming Soon🤗

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, JavaScript/TypeScript
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, bcrypt
- **Deployment:** Coming Soon

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SuprathikJoshua/skillsync.git
   ```
2. Navigate into the project directory:
   ```bash
   cd skillsync
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

- Navigate to `http://localhost:3000` to use the application locally.
- Register an account to start learning or teaching skills.
- Browse skill categories, join learning sessions, and track your progress.

---

## Folder Structure

```
SkillSync/
├─ backend/            # Node.js backend code
├─ frontend/           # React frontend code
├─ public/             # Static assets like images and screenshots
├─ scripts/            # Utility scripts
├─ README.md           # Project documentation
├─ package.json
└─ .env
```

---

## API Endpoints

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login a user
- `GET /api/skills` – Fetch all skills
- `POST /api/skills` – Create a new skill offering
- `POST /api/skills/:id/request` – Request to learn a skill
- `GET /api/users/:id` – Get user profile

> More endpoints and documentation coming soon.

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.  
See [LICENSE](./LICENSE) for details.

---

## Contact

- **Author:** Suprathik Johsua
- **Email:** suprathikj@gmail.com
- **GitHub:** [https://github.com/SuprathikJoshua](https://github.com/SuprathikJoshua)
