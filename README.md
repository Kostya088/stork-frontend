<p align="center">
  <img src="/public/icons/stork.svg" width="60" />
</p>

<h1 align="center">Leleka</h1>

## 📖 About the Project

**Leleka** is a modern web application designed to support expectant mothers throughout their pregnancy journey. Built with **Next.js** and **TypeScript**, it provides a personalized, intuitive, and emotionally supportive digital space where technology meets care.

The application helps users monitor both their well-being and their baby’s development week by week. It combines practical tools with a human-centered approach, offering a structured yet comforting experience during an important life stage.

### ✨ Key Features

- User registration (email & password)
- Profile avatar upload (Cloudinary)
- Pregnancy tracking with weekly insights
- Personal diary for thoughts and feelings
- Task management with completion tracking

The backend is powered by a **REST API** with integrated **Swagger documentation**, ensuring a scalable and well-structured architecture.

---

## 🛠 Tech Stack

The project is built using a modern and scalable frontend architecture:

### ⚙️ Core

- **Next.js (App Router)** — full-stack React framework
- **React** — UI library
- **TypeScript** — static typing

### 🔄 State & Data Management

- **TanStack React Query** — server state & data fetching
- **Zustand** — client-side state management
- **Axios** — HTTP client

### 🧩 Forms & Validation

- **Formik** — form handling
- **Yup** — validation schemas

### 🎨 UI & UX

- **react-select** — custom selects
- **react-datepicker** — date picker
- **react-hot-toast** — notifications
- **react-spinners** — loaders

### 🎯 Styling & Code Quality

- **CSS Modules** — scoped styling
- **modern-normalize** — cross-browser consistency
- **ESLint** — linting

---

## 🛣 Routing (App Router)

The application uses **Next.js App Router** for structured navigation.

### 🔐 Authentication

- `/auth/register` — registration
- `/auth/login` — login

### 📔 Diary

- `/diary` — list of entries
- `/diary/[entryId]` — entry details

### 🤰 Pregnancy Journey

- `/journey` — weeks overview
- `/journey/[weekNumber]` — week details

### 👤 Profile

- `/profile` — user profile
- `/profile/edit` — edit profile

---

## 🚀 Getting Started

### 📦 Prerequisites

- **Node.js** (v18+)
- **npm** (v9+)

---

### ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/Kostya088/stork-frontend.git
cd stork-frontend
```

2. **Open in VS Code**

```bash
code .
```

3. **Install dependencies**

```bash
npm install
```

4. **Configure environment variables**

.env.example => .env

````

Update the `.env` file with your local settings.

5. **Run the development server**

```bash
npm run dev
````

---

### 🌐 Open in Browser

Once the server is running:

👉 http://localhost:3000

---

## 👥 Team

This project was created by the **Project-03 Team** as part of the GoIT final team project.

### 👨‍💻 Contributors

- [Kostiantyn Polishchuk](https://github.com/Kostya088)
- [Mariana Melen](https://github.com/marana08)
- [Kateryna Havryna](https://github.com/HavrynaKateryna)
- [Yeva Krysheminska](https://github.com/yevac)
- [Alla](https://github.com/Allamoment)
- [Voloshyn](https://github.com/Voloshyn9900)
- [Andrew Reznik](https://github.com/Andrew1224Reznik)
- [Ivan Fotin](https://github.com/xzvtvxs)
- [Maksym Martynchuk](https://github.com/lunuarovich)
- [Max Yurchenko](https://github.com/YurchenkoMaxx)
- [Roma](https://github.com/RomanFS76)
- [Denys Hedenko](https://github.com/DenysHedenko)
- [Denys Ovcharov](https://github.com/denis-ovcharov)

---
