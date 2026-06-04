# 🛠️ Neural Dashboard - Complete Setup Guide

This guide walks you through setting up the Neural Dashboard project from scratch.

## Prerequisites

Before you start, ensure you have:
- **Node.js** 18 or higher (check with `node --version`)
- **npm**, **yarn**, or **pnpm** (comes with Node.js)
- A **GitHub** account (for version control)
- A **Supabase** account (create for free at https://supabase.com)
- A **Vercel** account (optional, for deployment)

## Step 1: Clone the Repository

```bash
# Option A: Using Git
git clone https://github.com/piyush25dev/neural-dashboard.git
cd neural-dashboard

# Option B: Download as ZIP
# Download from GitHub, extract, and navigate to the folder
cd neural-dashboard
```

## Step 2: Install Dependencies

```bash
# Using npm (default)
npm install

# Or using yarn
yarn install

# Or using pnpm (recommended for speed)
pnpm install
```

After installation, you should see a `node_modules` folder and `package-lock.json` (or `yarn.lock` / `pnpm-lock.yaml`).

## Step 3: Set Up Supabase

### 3.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in the project details:
   - **Project Name**: `neural-dashboard` (or your choice)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to you
5. Click **"Create new project"** and wait for it to initialize (2-3 minutes)

### 3.2 Get Your Credentials

Once your project is created:

1. Go to **Settings** (gear icon, bottom left)
2. Click **API** on the left sidebar
3. You'll see:
   - **Project URL** - Copy this (looks like `https://your-project.supabase.co`)
   - **API Keys** section - Copy the **"anon"** key (not the service role key)

Save these values temporarily - you'll need them in Step 4.

### 3.3 Create Database Tables

1. Go to the **SQL Editor** in Supabase
2. Click **"New Query"**
3. Paste the following SQL:

```sql
-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  daily_streak INTEGER DEFAULT 0,
  total_hours INTEGER DEFAULT 0,
  last_active TIMESTAMP DEFAULT NOW(),
  name TEXT DEFAULT 'Learning Explorer',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_courses_created_at ON courses(created_at DESC);
CREATE INDEX idx_user_progress_id ON user_progress(id);
```

4. Click **"Run"** and wait for the tables to be created
5. You should see a green checkmark

### 3.4 Seed Sample Data

In the same SQL Editor, create a new query and paste:

```sql
-- Insert sample courses
INSERT INTO courses (title, progress, icon_name, description) VALUES
  ('Advanced React Patterns', 75, 'code_2', 'Master advanced React techniques and patterns'),
  ('TypeScript Mastery', 62, 'type', 'Deep dive into TypeScript for type safety'),
  ('Web Performance', 88, 'zap', 'Optimize your applications for speed and efficiency'),
  ('Design Systems', 45, 'palette', 'Build scalable and maintainable design systems');

-- Insert user progress
INSERT INTO user_progress (daily_streak, total_hours, name) VALUES
  (8, 156, 'Alex');
```

Click **"Run"** to insert the data.

**Verify the data:**
1. Go to **Table Editor** on the left
2. Click on **courses** table - you should see 4 rows
3. Click on **user_progress** table - you should see 1 row

## Step 4: Configure Environment Variables

### 4.1 Create .env.local

1. In your project root, create a new file called `.env.local` (not `.env`)
2. Copy the contents of `.env.example`:

```bash
# Copy the template
cp .env.example .env.local
```

### 4.2 Add Your Supabase Credentials

Open `.env.local` and fill in your values:

```bash
# Paste your Project URL here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Paste your anon key here
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Set environment
NODE_ENV=development
```

**Example** (with real values):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abc123def456.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyM2RlZjQ1NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk0NTMyMTAwLCJleHAiOjE5MDAxMDQxMDB9.dummySignature
NODE_ENV=development
```

**⚠️ IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 5: Run the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.1.3
- Local:        http://localhost:3000
- Environments: .env.local
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Neural Dashboard!

## Step 6: Test the Application

### Test Data Loading
1. The dashboard should load without errors
2. You should see the 4 courses from Supabase
3. The "Welcome back, Alex" message should appear (from user_progress table)
4. The streak counter should show "8 days"

### Test Animations
1. Hover over course cards - they should scale up and glow
2. The activity graph should have animated cells
3. Page load should have staggered animations
4. Progress bars should animate on load

### Troubleshooting

**Issue**: `Error: Missing Supabase environment variables`
- **Solution**: Check your `.env.local` file has both variables correctly set

**Issue**: `Database connection failed`
- **Solution**: Verify your Supabase project URL and anon key are correct
- Re-copy them from Supabase Settings > API

**Issue**: No courses appearing
- **Solution**: Check the courses table in Supabase (Table Editor)
- Make sure you ran the INSERT SQL queries

**Issue**: Animations not smooth
- **Solution**: This is normal on first load - Next.js is compiling
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

## Step 7: Development Workflow

### Edit Components

All component files are in `components/`:
```
components/
├── CourseCard.tsx       # Edit course card styling/animations
├── HeroTile.tsx         # Edit welcome banner
├── ActivityTile.tsx     # Edit activity graph
├── Sidebar.tsx          # Edit navigation
└── ...
```

Changes are hot-reloaded automatically!

### Edit Styles

Global styles are in `app/globals.css`. Tailwind utilities are also available in any component.

### Edit Database Queries

Data fetching functions are in `lib/supabase.ts`:
```typescript
export async function fetchCourses() {
  // Modify this to add filters, sorting, etc.
}
```

### Check Types

Run TypeScript checking:
```bash
npm run type-check
```

## Step 8: Deploy to Vercel (Optional)

### 8.1 Push to GitHub

```bash
git add .
git commit -m "Initial commit: Neural Dashboard"
git push origin main
```

(Make sure `.env.local` is in `.gitignore` and NOT committed!)

### 8.2 Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. Click **"Import"**
5. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **"Deploy"**

Your app will be live at `your-project.vercel.app`!

## Step 9: Customize Your Dashboard

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  neural: {
    950: '#0a0e27',  // Change main background
    // ... other colors
  },
  cyan: {
    glow: '#00d9ff',  // Change accent color
  },
}
```

### Change Courses

In Supabase Table Editor:
1. Click the **courses** table
2. Edit any row directly
3. Changes reflect instantly in the dashboard!

### Modify Animations

Edit component files (e.g., `CourseCard.tsx`):
```typescript
// Change spring stiffness (higher = faster)
transition={{
  type: 'spring',
  stiffness: 300,  // Increase this
  damping: 20,
}}
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/introduction/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Guide](https://supabase.com/docs)

## 🤔 Common Questions

**Q: Can I use a different database?**
A: Yes, replace Supabase with any PostgreSQL provider. Modify `lib/supabase.ts`.

**Q: Can I deploy without Vercel?**
A: Yes, build with `npm run build` and deploy to Netlify, Railway, Docker, etc.

**Q: How do I add authentication?**
A: Supabase has built-in auth. See their docs for implementation.

**Q: Can I add real-time updates?**
A: Yes, Supabase supports real-time subscriptions. See their docs.

## ✅ Checklist

- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed with `npm install`
- [ ] Supabase project created
- [ ] Database tables created with SQL
- [ ] Sample data inserted
- [ ] `.env.local` configured with credentials
- [ ] Dev server running on localhost:3000
- [ ] Dashboard loads without errors
- [ ] Courses appear from database
- [ ] Animations work smoothly

You're all set! Happy coding! 🚀

---

**Need help?** Open an issue on GitHub or check the [main README](./README.md) for more details.
