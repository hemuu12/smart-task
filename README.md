# Smart Task Manager with AI Briefing

> **Production-Ready Full-Stack Application**

A modern task management application with AI-powered daily briefings, featuring session-based authentication, PostgreSQL persistence, and real LLM integration. Built with React, TypeScript, Express, and deployed on Vercel.

## 🎯 Project Overview

This application demonstrates full-stack development capabilities with:
- **Backend**: Express.js + TypeScript + Prisma + PostgreSQL + Session-based Auth
- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **AI Integration**: Groq API (Llama 3.3 70B) & Hugging Face Inference
- **Authentication**: Session-based with HTTP-only cookies (SameSite=None for cross-origin)
- **Database**: PostgreSQL with session storage and vector support
- **Deployment**: Vercel (frontend) + Vercel Serverless (backend)

## ✨ Features

### Core Requirements ✅
- ✅ REST API with POST/GET/DELETE endpoints
- ✅ PostgreSQL database persistence
- ✅ Real LLM API integration (Groq AI)
- ✅ Clean, responsive UI
- ✅ Generate Briefing button with loading states
- ✅ Comprehensive error handling
- ✅ Full TypeScript implementation

### Bonus Features ✅
- ✅ **Session-based authentication** (PostgreSQL session store)
- ✅ User-specific task isolation
- ✅ Responsive mobile-first design

### Core Features
- ✅ **Task Management**: Create, view, and delete tasks with title, description, status, and priority
- 🤖 **AI-Powered Briefings**: Get intelligent daily summaries using Groq AI (Llama 3.3 70B)
- 🔐 **Session Authentication**: Secure login/signup with PostgreSQL session store
- 🎨 **Modern UI**: Beautiful, responsive interface with separate login/signup pages
- 🔒 **Type-Safe**: Full TypeScript implementation across frontend and backend
- 📊 **Real-time Updates**: Instant task updates with proper error handling
- 🎯 **Priority Management**: Organize tasks by low, medium, and high priority
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Production Ready**: Deployed on Vercel with cross-origin cookie support

### 🎁 Advanced Features
- 🔐 **Session-based Authentication** (PostgreSQL session store with HTTP-only cookies)
- 🗄️ **Vector Database Infrastructure** (pgvector for embeddings support)
- 🧠 **RAG Pattern** (semantic search capability ready)
- 👤 **User-Specific Data** (Each user sees only their own tasks)
- 🌐 **Cross-Origin Support** (SameSite=None cookies for Vercel deployment)
- 🔄 **Auto-Redirect Logic** (Smart routing based on authentication state)
- 📝 **Separate Auth Pages** (Dedicated login and signup pages)

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - REST API server
- **TypeScript** - Type-safe backend code
- **Prisma** - Modern ORM for database management
- **PostgreSQL** - Production-grade relational database (Supabase)
- **Groq AI** - AI-powered task summaries (Llama 3.3 70B)
- **Hugging Face** - Alternative AI inference
- **Zod** - Runtime validation
- **express-session** - Session-based authentication
- **connect-pg-simple** - PostgreSQL session store
- **pgvector** - Vector similarity search support

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe frontend code
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** v20 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v14 or higher ([Download](https://www.postgresql.org/download/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Groq API Key** (free tier available at [console.groq.com](https://console.groq.com/))
- **Hugging Face Token** (optional, for fallback AI at [huggingface.co](https://huggingface.co/))

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hemuu12/smart-task.git
cd smart-task
```

### 2. Database Setup

**Option A: Local PostgreSQL**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE taskmanager;
\q
```

**Option B: Cloud PostgreSQL (Recommended)**
- [Supabase](https://supabase.com/) - Free tier, instant setup
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Railway](https://railway.app/) - One-click deployment

Copy your connection string for the next step.

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskmanager?schema=public"
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
HF_TOKEN=your_huggingface_token_here
SESSION_SECRET=your_super_secret_session_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Get Your API Keys

**Groq API Key (Required)**
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy your key (starts with `gsk_...`)

**Hugging Face Token (Optional)**
1. Visit [Hugging Face](https://huggingface.co/)
2. Sign up and go to Settings → Access Tokens
3. Create a new token
4. Copy your token (starts with `hf_...`)

**Note**: Groq offers free tier with fast inference. The app also works without an API key (uses static summary fallback).

```bash
# Generate Prisma client and create database
npx prisma generate
npx prisma migrate dev --name init

# Start the backend server
npm run dev
```

The backend will run on **http://localhost:5000**

### 5. Frontend Setup

**Open a new terminal:**

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional for local dev)
cp .env.example .env

# Start frontend development server
npm run dev
```

Frontend running at `http://localhost:3000`

### 5. Access the Application

1. Open browser to `http://localhost:3000`
2. You'll be redirected to `/login` if not authenticated
3. Register a new account at `/signup`
4. Login with your credentials
5. Start creating tasks and generating AI briefings

## 💻 Usage Guide

### Authentication Flow
1. **Register**: Visit `/signup` to create account
2. **Login**: Visit `/login` to sign in
3. **Auto-Redirect**: Authenticated users auto-redirect to `/tasks`
4. **Session Management**: Cookies stored with SameSite=None for cross-origin
5. **Logout**: Ends session and redirects to `/login`

### Task Management
1. **Create Task**: Click "Add Task" button
   - Enter title (required)
   - Add description (optional)
   - Set status: Pending, In Progress, or Completed
   - Set priority: Low, Medium, or High

2. **View Tasks**: All tasks displayed with:
   - Status badges (color-coded)
   - Priority indicators
   - Creation timestamps

3. **Delete Task**: Click trash icon to remove

### AI Briefing
1. Click "Generate Briefing" button
2. Wait for AI analysis (2-3 seconds)
3. View intelligent summary with:
   - Task overview and statistics
   - High-priority item highlights
   - Productivity recommendations

## 📡 API Endpoints

### Authentication (Public)

- **POST** `/api/auth/register` - Create new user account
- **POST** `/api/auth/login` - Sign in and create session
- **POST** `/api/auth/logout` - End session
- **GET** `/api/auth/me` - Check authentication status

### Tasks (Protected - Requires JWT)

- **POST** `/api/tasks` - Create a new task (auto-generates embedding)
  ```json
  {
    "title": "Task title",
    "description": "Optional description",
    "status": "pending",
    "priority": "medium"
  }
  ```

- **GET** `/api/tasks` - Get user's tasks (filtered by userId)
- **DELETE** `/api/tasks/:id` - Delete a task (ownership verified)
- **GET** `/api/tasks/summary` - Get AI-powered task summary with RAG

### Health Check

- **GET** `/health` - Check API status

**Authentication**: Uses session cookies (HTTP-only, SameSite=None, Secure)
```
Cookie: connect.sid=...; HttpOnly; Secure; SameSite=None
```

## 🗂️ Project Structure

```
smart-task/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── config/                # Session configuration
│   │   ├── controllers/           # Request handlers
│   │   ├── middleware/            # Express middleware
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic & external APIs
│   │   └── index.ts               # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json                # Vercel deployment config
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── pages/                 # Page components (Login, Signup, Tasks)
│   │   ├── services/              # API client
│   │   ├── types/                 # TypeScript types
│   │   ├── App.tsx                # Main app component with routing
│   │   └── main.tsx               # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
└── README.md
```

## 🧪 Development

### Backend Development

```bash
cd backend

# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

### Frontend Development

```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 AI Prompt Engineering

The AI briefing feature uses carefully crafted prompts that:
- Summarizes total workload and task breakdown
- Highlights urgent/high-priority items
- Provides motivational insights
- Offers productivity tips
- Maintains a professional yet encouraging tone

The prompts can be customized in `backend/src/services/groqService.ts` and `backend/src/services/hfService.ts`

## 🔒 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://...           # PostgreSQL connection string
GROQ_API_KEY=gsk_...                   # Groq API key
HF_TOKEN=hf_...                         # Hugging Face token (optional)
SESSION_SECRET=your_secret_key         # Session encryption key
PORT=5000                               # Server port
NODE_ENV=development                    # Environment
FRONTEND_URL=http://localhost:3000     # Frontend URL for CORS
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000    # Backend API URL
```

## � Deployment

### Vercel Deployment (Recommended)

**Backend Deployment**
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com/)
3. Set root directory to `backend`
4. Add environment variables:
   - `DATABASE_URL` (Supabase connection string)
   - `GROQ_API_KEY`
   - `SESSION_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend.vercel.app`
5. Deploy

**Frontend Deployment**
1. Connect same repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable:
   - `VITE_API_URL=https://your-backend.vercel.app`
4. Deploy

### Database Setup (Supabase)
1. Create account at [Supabase](https://supabase.com/)
2. Create new project
3. Get connection string from Settings → Database
4. Use pooler URL with `?pgbouncer=true` for serverless
5. Run migrations automatically via Vercel build

## 🐛 Troubleshooting

### Backend won't start
- Ensure all dependencies are installed: `npm install`
- Check if port 5000 is available
- Verify `.env` file exists with valid API keys
- Run `npx prisma generate` to create Prisma client

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in `backend/src/index.ts`
- Verify proxy settings in `frontend/vite.config.ts`
- Check `VITE_API_URL` in frontend `.env`

### AI Briefing fails
- Verify your Groq API key is valid
- Check API key has not exceeded rate limits
- Ensure you have internet connection
- Try Hugging Face fallback if Groq fails

### Cookie Issues (Production)
- Ensure `NODE_ENV=production` is set in Vercel
- Check `SameSite=None` and `Secure=true` in session config
- Verify `FRONTEND_URL` matches your Vercel domain
- Check `trust proxy` is enabled in Express

### Database errors
- Run `npx prisma generate` to regenerate Prisma client
- Run `npx prisma migrate dev` to apply migrations
- Check PostgreSQL connection string format
- Use Supabase pooler URL with `?pgbouncer=true`

## 📝 What I Built

This is a production-ready full-stack application demonstrating:

### Core Implementation
- **Clean Architecture**: Separation of concerns with controllers, services, and routes
- **Type Safety**: Full TypeScript coverage with proper typing
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Validation**: Input validation using Zod schemas
- **Modern UI/UX**: Responsive design with loading states and user feedback
- **Real AI Integration**: Groq AI API calls with Hugging Face fallback
- **Database Management**: Prisma ORM with PostgreSQL and migrations
- **Session Authentication**: Secure HTTP-only cookie-based sessions
- **Cross-Origin Support**: SameSite=None cookies for Vercel deployment
- **Smart Routing**: Automatic redirects based on authentication state

### Advanced Features
- **Session-based Authentication**: Complete user registration/login system
- **Protected Routes**: Middleware-based authentication on all task endpoints
- **User Isolation**: Tasks filtered by userId, ensuring data privacy
- **Session Management**: Automatic session handling with PostgreSQL store
- **Production Deployment**: Vercel serverless deployment configuration

## 🔄 Trade-offs & Future Improvements

### Trade-offs Made
- **Session vs JWT**: Used session-based auth for simpler cookie management
- **Embedding Storage**: JSON strings in PostgreSQL (could use dedicated vector DB)
- **Simple RAG**: Basic infrastructure ready (could add sophisticated retrieval)
- **No Task Editing**: Only create/delete (can add update endpoint)
- **UI Framework**: Tailwind CSS (could use component library like shadcn/ui)

### Future Improvements
- � Due dates and calendar integration
- � Task editing and status updates
- 🔔 Task notifications and reminders
- 🏷️ Tags and categories
- 🔍 Search and filtering
- 📊 Analytics dashboard
- 🌙 Dark mode toggle
- 📱 Progressive Web App (PWA)
- 🧪 Unit and integration tests
- 📈 Task completion tracking
- 🔄 Task editing/updating
- 💾 Task archiving
- 🎯 Subtasks and checklists

## 👨‍💻 Development Notes

This project was built following modern best practices:
- Incremental git commits showing development progress
- Clean, readable code with proper TypeScript types
- Comprehensive error handling and user feedback
- Production-ready structure and configuration
- Real AI integration with proper error handling
- Responsive design for all screen sizes

## 🌟 Live Demo

**Frontend**: [smart-task-chi.vercel.app](https://smart-task-3gwn.vercel.app)
**Backend**: [smart-task-xws9.vercel.app](https://smart-task-chi.vercel.app/)

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

## 🙏 Acknowledgments

- Groq AI for fast, intelligent task summaries
- Prisma for excellent database tooling
- Tailwind CSS for rapid UI development
- Lucide for beautiful icons
- Vercel for seamless deployment

---

**Built with ❤️ using modern web technologies**

For questions or issues, please visit the [GitHub repository](https://github.com/hemuu12/smart-task).
