```md
# 🎓 Section Vault

> A secure, private Alumni Tracer System built with **Next.js**, **Supabase**, **PostgreSQL**, and **TypeScript**.

Section Vault is a modern full-stack web application designed exclusively for a predefined group of classmates. It provides a secure platform for alumni to reconnect, manage their profiles, share memories, and stay informed through announcements while following a **security-first architecture**.

---

## ✨ Features

### Authentication

- Email & Password Authentication
- Google Sign-In (OAuth)
- Secure session management
- Protected routes

### Access Control

- Classmate whitelist
- User & Admin roles
- Row Level Security (RLS)

### User Features

- Profile management
- Alumni directory
- Search classmates
- Share memories (image/video)
- React to memories
- View announcements

### Admin Features

- Manage classmates
- Manage profiles
- Promote/Demote admins
- Manage announcements
- Manage system settings
- Moderate memories

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

### Deployment

- Vercel

---

## 🔒 Security

Section Vault follows a **security-first** design.

- Supabase Authentication
- Email whitelist validation
- Row Level Security (RLS)
- Role-Based Authorization
- PostgreSQL Functions (RPC)
- Secure Storage Buckets
- Protected Routes

The frontend never determines permissions. All sensitive operations are validated by the database.

---

## 🗄 Database
```

auth.users
│
▼
profiles
│
├── classmates
├── memories
│ └── memory_reactions
├── announcements
└── settings

````

---

## 📦 Storage Buckets

| Bucket | Access |
|---------|--------|
| profile-images | Public |
| memory-media | Public |
| system-assets | Public |
| exports | Private |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd section-vault
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. Configure Supabase

- Create a Supabase project
- Execute the SQL schema
- Create storage buckets
- Enable Email Authentication
- Enable Google OAuth

### 5. Run the application

```bash
npm run dev
```

---

## 🚀 Deployment

Deploy using **Vercel**.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure environment variables.
4. Configure Google OAuth production redirect URLs.
5. Deploy.

---

## 👨‍💻 Author

**Raffy Maluya**

Built as a portfolio project demonstrating modern full-stack development using **Next.js**, **Supabase**, and **PostgreSQL** with a security-first approach.

```

```
