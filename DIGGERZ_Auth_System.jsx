// DIGGERZ Authentication System
// Next.js 14 + NextAuth.js + Tailwind CSS + Prisma
// Full implementation: Login page + Protected Profile page + Config

// ============================================================
// FILE STRUCTURE
// ============================================================
/*
diggerz/
├── .env                          ← Environment variables
├── prisma/
│   └── schema.prisma             ← Database schema
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  ← Redirect to /login or /profile
│   ├── login/
│   │   └── page.tsx              ← Login/Signup page
│   ├── profile/
│   │   └── page.tsx              ← Protected profile page
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts      ← NextAuth handler
├── lib/
│   ├── auth.ts                   ← NextAuth config
│   ├── prisma.ts                 ← Prisma client singleton
│   └── validations.ts            ← Zod schemas
├── middleware.ts                 ← Route protection
└── components/
    ├── AuthCard.tsx
    ├── OAuthButton.tsx
    ├── CredentialsForm.tsx
    └── ProfileCard.tsx
*/

// ============================================================
// INSTALLATION COMMANDS
// ============================================================
/*
# 1. Create Next.js app
npx create-next-app@latest diggerz --typescript --tailwind --app

cd diggerz

# 2. Install auth + database dependencies
npm install next-auth@beta @auth/prisma-adapter
npm install prisma @prisma/client
npm install bcryptjs
npm install zod

# TypeScript types
npm install -D @types/bcryptjs

# 3. Initialize Prisma
npx prisma init --datasource-provider postgresql

# 4. Generate Prisma client after editing schema
npx prisma generate
npx prisma db push
*/

// ============================================================
// .env (template)
// ============================================================
/*
# .env

# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/diggerz"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Google OAuth
# https://console.cloud.google.com/
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Apple OAuth
# https://developer.apple.com/account/resources/identifiers/list/serviceId
APPLE_ID=""
APPLE_SECRET=""

# Twitter/X OAuth
# https://developer.twitter.com/en/portal/dashboard
TWITTER_CLIENT_ID=""
TWITTER_CLIENT_SECRET=""
*/

// ============================================================
// prisma/schema.prisma
// ============================================================
/*
// This is your Prisma schema file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?   // null for OAuth users
  archetype     String?   // DIGGERZ archetype code e.g. "SPGC"
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
*/

// ============================================================
// middleware.ts  (root level)
// ============================================================
/*
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session

  const isPublicRoute = nextUrl.pathname.startsWith("/login")

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/profile", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
*/

// ============================================================
// lib/prisma.ts
// ============================================================
/*
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
*/

// ============================================================
// lib/validations.ts
// ============================================================
/*
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
*/

// ============================================================
// lib/auth.ts
// ============================================================
/*
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import TwitterProvider from "next-auth/providers/twitter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/validations"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(parsed.data.password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
*/

// ============================================================
// app/api/auth/[...nextauth]/route.ts
// ============================================================
/*
import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers
*/

// ============================================================
// app/api/auth/register/route.ts  (signup endpoint)
// ============================================================
/*
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signupSchema } from "@/lib/validations"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })

    return NextResponse.json(
      { message: "Account created", userId: user.id },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
*/

// ============================================================
// REACT COMPONENT — Login Page + Profile Page (preview)
// ============================================================
// The component below is a standalone React preview of both pages.
// In production, split into app/login/page.tsx and app/profile/page.tsx

import React, { useState } from "react"

// ── DIGGERZ PALETTE ──────────────────────────────────────
// #101820  Black 6 C
// #888B8D  Cool Gray 8 C
// #C8102E  186 C Ruby
// #A39382  4515 C Sable
// #F2F2F2  Ghost White

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #101820;
    --gray: #888B8D;
    --ruby: #C8102E;
    --sable: #A39382;
    --ghost: #F2F2F2;
    --font: 'IBM Plex Mono', monospace;
  }

  body { font-family: var(--font); background: var(--black); color: var(--ghost); }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── NOISE OVERLAY ── */
  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  /* ── GRID LINES ── */
  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(136,139,141,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(136,139,141,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* ── LOGIN PAGE ── */
  .login-page {
    position: relative; z-index: 1; flex: 1;
    display: flex; align-items: center; justify-content: center;
    padding: 2rem; min-height: 100vh;
  }

  .login-wrap {
    width: 100%; max-width: 440px;
  }

  .login-header {
    margin-bottom: 2.5rem;
  }

  .logotype {
    font-size: 1.75rem; font-weight: 700; letter-spacing: 0.2em;
    color: var(--ghost); display: flex; align-items: center; gap: 0.5rem;
  }

  .logotype-bracket { color: var(--ruby); }

  .login-sub {
    font-size: 0.65rem; letter-spacing: 0.18em; color: var(--gray);
    text-transform: uppercase; margin-top: 0.5rem;
  }

  /* ── CARD ── */
  .auth-card {
    background: rgba(16,24,32,0.95);
    border: 1px solid rgba(136,139,141,0.2);
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .auth-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--ruby), transparent);
  }

  /* ── TABS ── */
  .tab-row {
    display: grid; grid-template-columns: 1fr 1fr;
    border: 1px solid rgba(136,139,141,0.2);
    margin-bottom: 1.75rem;
  }

  .tab-btn {
    padding: 0.6rem; font-family: var(--font);
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; cursor: pointer;
    background: transparent; border: none; color: var(--gray);
    transition: all 0.2s;
  }

  .tab-btn.active {
    background: var(--ruby); color: var(--ghost);
  }

  /* ── OAUTH BUTTONS ── */
  .oauth-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0.5rem; margin-bottom: 1.5rem;
  }

  .oauth-btn {
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: 1px solid rgba(136,139,141,0.25);
    color: var(--ghost); font-family: var(--font);
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }

  .oauth-btn:hover {
    border-color: var(--sable);
    background: rgba(163,147,130,0.08);
  }

  .oauth-icon { width: 14px; height: 14px; flex-shrink: 0; }

  /* ── DIVIDER ── */
  .divider {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .divider-line { flex: 1; height: 1px; background: rgba(136,139,141,0.2); }

  .divider-text {
    font-size: 0.6rem; letter-spacing: 0.15em; color: var(--gray);
    text-transform: uppercase; white-space: nowrap;
  }

  /* ── FORM ── */
  .form-field { margin-bottom: 1rem; }

  .field-label {
    display: block; font-size: 0.6rem; letter-spacing: 0.18em;
    color: var(--gray); text-transform: uppercase; margin-bottom: 0.4rem;
  }

  .field-input {
    width: 100%; background: rgba(242,242,242,0.04);
    border: 1px solid rgba(136,139,141,0.25);
    color: var(--ghost); font-family: var(--font);
    font-size: 0.8rem; padding: 0.65rem 0.75rem;
    outline: none; transition: border-color 0.2s;
  }

  .field-input:focus { border-color: var(--sable); }
  .field-input::placeholder { color: rgba(136,139,141,0.5); }

  .field-error {
    font-size: 0.6rem; color: var(--ruby); margin-top: 0.3rem;
    letter-spacing: 0.1em;
  }

  /* ── SUBMIT ── */
  .submit-btn {
    width: 100%; padding: 0.75rem;
    background: var(--ruby); border: none; color: var(--ghost);
    font-family: var(--font); font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; margin-top: 0.5rem;
    position: relative; overflow: hidden;
  }

  .submit-btn:hover { background: #e0132f; }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── STATUS MSG ── */
  .status-msg {
    font-size: 0.65rem; letter-spacing: 0.1em; padding: 0.6rem 0.75rem;
    margin-top: 1rem; border-left: 2px solid;
  }

  .status-msg.error { color: var(--ruby); border-color: var(--ruby); background: rgba(200,16,46,0.06); }
  .status-msg.success { color: #4ade80; border-color: #4ade80; background: rgba(74,222,128,0.06); }

  /* ── FOOTER NOTE ── */
  .auth-footer {
    margin-top: 1.5rem; font-size: 0.6rem; color: var(--gray);
    letter-spacing: 0.1em; text-align: center; line-height: 1.6;
  }

  /* ── PROFILE PAGE ── */
  .profile-page {
    position: relative; z-index: 1; flex: 1;
    display: flex; align-items: center; justify-content: center;
    padding: 2rem; min-height: 100vh;
  }

  .profile-wrap { width: 100%; max-width: 560px; }

  .profile-topbar {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 2rem;
  }

  .profile-logotype {
    font-size: 1rem; font-weight: 700; letter-spacing: 0.2em; color: var(--ghost);
  }

  .signout-btn {
    background: transparent; border: 1px solid rgba(200,16,46,0.4);
    color: var(--ruby); font-family: var(--font);
    font-size: 0.6rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; padding: 0.45rem 0.9rem;
    cursor: pointer; transition: all 0.2s;
  }

  .signout-btn:hover { background: var(--ruby); color: var(--ghost); }

  .profile-card {
    background: rgba(16,24,32,0.95);
    border: 1px solid rgba(136,139,141,0.2);
    padding: 2rem;
    position: relative; overflow: hidden;
  }

  .profile-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--sable), transparent);
  }

  .profile-identity {
    display: flex; align-items: center; gap: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(136,139,141,0.15);
    margin-bottom: 1.5rem;
  }

  .profile-avatar {
    width: 64px; height: 64px;
    border: 1px solid rgba(136,139,141,0.3);
    background: rgba(163,147,130,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; font-weight: 700; color: var(--sable);
    flex-shrink: 0; overflow: hidden;
  }

  .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }

  .profile-name {
    font-size: 1.1rem; font-weight: 600; letter-spacing: 0.1em;
    color: var(--ghost); margin-bottom: 0.25rem;
  }

  .profile-email {
    font-size: 0.7rem; letter-spacing: 0.1em; color: var(--gray);
  }

  .profile-fields {
    display: grid; gap: 1rem;
  }

  .profile-row {
    display: flex; align-items: baseline; gap: 1rem;
  }

  .profile-key {
    font-size: 0.6rem; letter-spacing: 0.2em; color: var(--gray);
    text-transform: uppercase; min-width: 120px; flex-shrink: 0;
  }

  .profile-val {
    font-size: 0.75rem; color: var(--ghost); letter-spacing: 0.05em;
  }

  .profile-val.archetype {
    color: var(--ruby); font-weight: 600; letter-spacing: 0.2em;
  }

  .profile-val.provider {
    display: flex; align-items: center; gap: 0.4rem;
  }

  .provider-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
  }

  .boot-line {
    font-size: 0.6rem; color: rgba(136,139,141,0.4);
    letter-spacing: 0.1em; margin-top: 1.5rem;
    padding-top: 1rem; border-top: 1px solid rgba(136,139,141,0.1);
  }

  /* ── NAV ── */
  .page-nav {
    display: flex; gap: 0.5rem; justify-content: center;
    margin-bottom: 1.5rem; position: relative; z-index: 1;
  }

  .nav-btn {
    background: transparent; border: 1px solid rgba(136,139,141,0.25);
    color: var(--gray); font-family: var(--font);
    font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s;
  }

  .nav-btn.active { border-color: var(--sable); color: var(--ghost); }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .login-page, .profile-page { animation: fadeIn 0.4s ease forwards; }
`

// ── SVG Icons ──────────────────────────────────────────────
const GoogleIcon = () => (
  <svg className="oauth-icon" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const AppleIcon = () => (
  <svg className="oauth-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg className="oauth-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
)

const EmailIcon = () => (
  <svg className="oauth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
)

// ── Credentials Form ───────────────────────────────────────
function CredentialsForm({ mode }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (mode === "signup" && form.name.length < 2) e.name = "Name must be at least 2 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address"
    if (form.password.length < 8) e.password = "Password must be at least 8 characters"
    if (mode === "signup" && !/[A-Z]/.test(form.password)) e.password = "Must contain an uppercase letter"
    if (mode === "signup" && !/[0-9]/.test(form.password)) e.password = "Must contain a number"
    if (mode === "signup" && form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match"
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

    setLoading(true)
    setStatus(null)

    await new Promise(r => setTimeout(r, 1000))

    if (mode === "login") {
      setStatus({ type: "success", msg: "// ACCESS GRANTED — redirecting to /profile" })
    } else {
      setStatus({ type: "success", msg: "// ACCOUNT CREATED — verify your email to proceed" })
    }
    setLoading(false)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div>
      {mode === "signup" && (
        <div className="form-field">
          <label className="field-label">Operator Name</label>
          <input className="field-input" type="text" placeholder="Your name" value={form.name} onChange={set("name")} />
          {errors.name && <div className="field-error">↳ {errors.name}</div>}
        </div>
      )}
      <div className="form-field">
        <label className="field-label">Email Address</label>
        <input className="field-input" type="email" placeholder="operator@diggerz.io" value={form.email} onChange={set("email")} />
        {errors.email && <div className="field-error">↳ {errors.email}</div>}
      </div>
      <div className="form-field">
        <label className="field-label">Password</label>
        <input className="field-input" type="password" placeholder="••••••••••••" value={form.password} onChange={set("password")} />
        {errors.password && <div className="field-error">↳ {errors.password}</div>}
      </div>
      {mode === "signup" && (
        <div className="form-field">
          <label className="field-label">Confirm Password</label>
          <input className="field-input" type="password" placeholder="••••••••••••" value={form.confirmPassword} onChange={set("confirmPassword")} />
          {errors.confirmPassword && <div className="field-error">↳ {errors.confirmPassword}</div>}
        </div>
      )}
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "// processing..." : mode === "login" ? "// Authenticate" : "// Initialize Account"}
      </button>
      {status && <div className={`status-msg ${status.type}`}>{status.msg}</div>}
    </div>
  )
}

// ── Login Page ─────────────────────────────────────────────
function LoginPage() {
  const [tab, setTab] = useState("login")

  return (
    <div className="login-page">
      <div className="login-wrap">
        <div className="login-header">
          <div className="logotype">
            <span className="logotype-bracket">[</span>
            DIGGERZ
            <span className="logotype-bracket">]</span>
          </div>
          <div className="login-sub">Neuro-Regulating Wear · Identity Protocol</div>
        </div>

        <div className="auth-card">
          <div className="tab-row">
            <button className={`tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>
              // Login
            </button>
            <button className={`tab-btn ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>
              // Register
            </button>
          </div>

          <div className="oauth-grid">
            <button className="oauth-btn" onClick={() => alert("→ signIn('google')")}>
              <GoogleIcon /> Google
            </button>
            <button className="oauth-btn" onClick={() => alert("→ signIn('apple')")}>
              <AppleIcon /> Apple
            </button>
            <button className="oauth-btn" onClick={() => alert("→ signIn('twitter')")}>
              <TwitterIcon /> Twitter/X
            </button>
            <button className="oauth-btn">
              <EmailIcon /> Magic Link
            </button>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or use credentials</span>
            <div className="divider-line" />
          </div>

          <CredentialsForm mode={tab} />

          <div className="auth-footer">
            By authenticating, you accept the DIGGERZ Operator Agreement.<br />
            Your archetype data is stored locally and encrypted.
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Profile Page ───────────────────────────────────────────
function ProfilePage({ onSignOut }) {
  const mockUser = {
    name: "Thomas Leclerc",
    email: "thomas@diggerz.io",
    image: null,
    archetype: "SPGC",
    provider: "credentials",
    joined: "2026-04-10",
    id: "clx7m2a0000001",
  }

  const initials = mockUser.name.split(" ").map(n => n[0]).join("")

  return (
    <div className="profile-page">
      <div className="profile-wrap">
        <div className="profile-topbar">
          <div className="profile-logotype">
            <span style={{ color: "#C8102E" }}>[</span>
            DIGGERZ
            <span style={{ color: "#C8102E" }}>]</span>
          </div>
          <button className="signout-btn" onClick={onSignOut}>
            // Sign Out
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-identity">
            <div className="profile-avatar">
              {mockUser.image
                ? <img src={mockUser.image} alt={mockUser.name} />
                : initials}
            </div>
            <div>
              <div className="profile-name">{mockUser.name}</div>
              <div className="profile-email">{mockUser.email}</div>
            </div>
          </div>

          <div className="profile-fields">
            <div className="profile-row">
              <span className="profile-key">Operator ID</span>
              <span className="profile-val">{mockUser.id}</span>
            </div>
            <div className="profile-row">
              <span className="profile-key">Archetype</span>
              <span className="profile-val archetype">{mockUser.archetype}</span>
            </div>
            <div className="profile-row">
              <span className="profile-key">Auth Provider</span>
              <span className="profile-val provider">
                <span className="provider-dot" />
                {mockUser.provider}
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-key">Joined</span>
              <span className="profile-val">{mockUser.joined}</span>
            </div>
            <div className="profile-row">
              <span className="profile-key">Session</span>
              <span className="profile-val" style={{ color: "#4ade80" }}>active · jwt</span>
            </div>
          </div>

          <div className="boot-line">
            // session.user.id resolved · middleware protection active · all routes secured
          </div>
        </div>
      </div>
    </div>
  )
}

// ── App Shell ──────────────────────────────────────────────
export default function DiggerzAuth() {
  const [page, setPage] = useState("login")

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <div className="grid-bg" />
        <div className="noise" />

        <div className="page-nav">
          <button className={`nav-btn ${page === "login" ? "active" : ""}`} onClick={() => setPage("login")}>
            /login
          </button>
          <button className={`nav-btn ${page === "profile" ? "active" : ""}`} onClick={() => setPage("profile")}>
            /profile (protected)
          </button>
        </div>

        {page === "login"
          ? <LoginPage />
          : <ProfilePage onSignOut={() => setPage("login")} />
        }
      </div>
    </>
  )
}
