# GAP Course Management — MVP

Web app MVP for student attendance via 3-minute reflection, admin recap, and monthly invoice calculation.

## Features
- Admin password login
- Student list with per-session rate and unique student code
- Session list + QR code
- Student reflection page (reflection submission = attendance)
- Reflection recap for admin
- Invoice summary calculated from submitted reflections
- Demo mode if Supabase is not configured

## 1. Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## 2. Create Supabase (Free)
1. Create a free project at Supabase.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql` for sample data.
5. Copy Project URL and Service Role Key from Project Settings > API.

## 3. Environment variables
Set these in `.env.local` and later in Vercel:

```env
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_PASSWORD=your-private-admin-password
```

Important: never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.

## 4. Deploy to Vercel
1. Create a new GitHub repository, e.g. `gap-course`.
2. Push this folder to GitHub.
3. In Vercel choose **Add New > Project** and import the repository.
4. Add the four Environment Variables above.
5. Deploy.
6. Change `NEXT_PUBLIC_APP_URL` to the final Vercel URL and redeploy.

## Student attendance workflow
Admin opens `/admin/sessions`, students scan the QR, enter their student code, complete the 3-minute reflection, and submit. The record appears in `/admin/reflections` and automatically counts toward monthly billing.

## Suggested next build
- Create/edit students from the admin UI
- Create/open/close sessions from the admin UI
- Filter monthly recap by student and month
- Generate polished invoice PDF matching GAP's existing invoice design
- Payment status (paid / unpaid / partial)
- AI-assisted monthly progress summary from student reflections
