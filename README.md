# Smart Task Manager with AI Briefing

> **Rubico Tech Full Stack Developer Technical Task**

A production-ready task management application with AI-powered daily briefings, featuring session-based authentication, PostgreSQL persistence, and real LLM integration.

## 🎯 Project Overview

This application demonstrates full-stack development capabilities with:
- **Backend**: Express.js + TypeScript + Prisma + PostgreSQL
- **Frontend**: React + TypeScript + Tailwind CSS
- **AI Integration**: Groq API (Llama 3.3 70B) with fallback mechanism
- **Authentication**: Session-based with HTTP-only cookies
- **Database**: PostgreSQL with session storage

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
- ✅ **Vector database infrastructure** (embeddings support ready)
- ✅ **RAG pattern** (semantic search capability)
- ✅ User-specific task isolation
- ✅ Responsive mobile-first design

### Core Features
- ✅ **Task Management**: Create, view, and delete tasks with title, description, status, and priority
- 🤖 **AI-Powered Briefings**: Get intelligent daily summaries of your pending tasks using Google Gemini Flash
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🔒 **Type-Safe**: Full TypeScript implementation across frontend and backend
- 📊 **Real-time Updates**: Instant task updates with proper error handling
- 🎯 **Priority Management**: Organize tasks by low, medium, and high priority
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎁 Bonus Features (Assessment Requirements)
- 🔐 **JWT Authentication**: Secure user registration and login with bcrypt password hashing
- 🗄️ **Vector Database**: Task embeddings stored in PostgreSQL for semantic search
- 🧠 **RAG Pattern**: Retrieval-Augmented Generation for context-aware AI briefings
- 👤 **User-Specific Data**: Each user sees only their own tasks
- 🔑 **Token Management**: Automatic JWT token handling with interceptors

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - REST API server
- **TypeScript** - Type-safe backend code
- **Prisma** - Modern ORM for database management
- **PostgreSQL** - Production-grade relational database
- **Google Gemini AI** - AI-powered task summaries & embeddings
- **Zod** - Runtime validation
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **bcryptjs** - Password hashing and verification
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
- **Git** ([Download](https://git-scm.com/)) or use Docker
- **Google Gemini API Key** (free tier available)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd test
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
GEMINI_API_KEY=your_actual_gemini_api_key_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

**### 3. Get Your Groq API Key (Free)

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy your key (starts with `gsk_...`)

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

✅ Frontend running at `http://localhost:3000`

### 6. Access the Application

1. Open browser to `http://localhost:3000`
2. Register a new account
3. Start creating tasks
4. Click "Generate Briefing" to see AI-powered summary**

## 💻 Usage Guide

### Authentication
1. **Register**: Create account with email and password
2. **Login**: Access your personal task workspace
3. **Logout**: Securely end your session

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
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }
  ```

- **POST** `/api/auth/login` - Sign in and get JWT token
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

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

**Authentication:** Include JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## 🗂️ Project Structure

```
test/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── controllers/           # Request handlers
│   │   ├── middleware/            # Express middleware
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic & external APIs
│   │   └── index.ts               # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── services/              # API client
│   │   ├── types/                 # TypeScript types
│   │   ├── App.tsx                # Main app component
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

The AI briefing feature uses a carefully crafted prompt that:
- Summarizes total workload and task breakdown
- Highlights urgent/high-priority items
- Provides motivational insights
- Offers productivity tips
- Maintains a professional yet encouraging tone

The prompt can be customized in `backend/src/services/geminiService.ts`

## 🔒 Environment Variables

### Backend (.env)

```env
DATABASE_URL="file:./dev.db"        # SQLite database path
GEMINI_API_KEY=your_key_here        # Google Gemini API key
PORT=5000                            # Server port
NODE_ENV=development                 # Environment
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000  # Backend API URL
```

## 🚢 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Push code to GitHub
2. Connect repository to your platform
3. Set environment variables
4. For PostgreSQL, update `DATABASE_URL` in schema.prisma:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Run migrations: `npx prisma migrate deploy`

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<your-backend-url>`

## 🐛 Troubleshooting

### Backend won't start
- Ensure all dependencies are installed: `npm install`
- Check if port 5000 is available
- Verify `.env` file exists with valid API key

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in `backend/src/index.ts`
- Verify proxy settings in `frontend/vite.config.ts`

### AI Briefing fails
- Verify your Gemini API key is valid
- Check API key has not exceeded rate limits
- Ensure you have internet connection

### Database errors
- Run `npx prisma generate` to regenerate Prisma client
- Run `npx prisma migrate dev` to apply migrations
- Delete `dev.db` and re-run migrations for fresh start

## 📝 What I Built

This is a production-ready full-stack application demonstrating:

### Core Implementation
- **Clean Architecture**: Separation of concerns with controllers, services, and routes
- **Type Safety**: Full TypeScript coverage with proper typing
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Validation**: Input validation using Zod schemas
- **Modern UI/UX**: Responsive design with loading states and user feedback
- **Real AI Integration**: Actual Google Gemini API calls (not mocked)
- **Database Management**: Prisma ORM with PostgreSQL and migrations
- **Best Practices**: ESLint, proper project structure, environment variables

### Bonus Features (Assessment Requirements)
- **JWT Authentication**: Complete user registration/login system with bcrypt
- **Protected Routes**: Middleware-based authentication on all task endpoints
- **Vector Embeddings**: Google Gemini embedding-001 model for task vectorization
- **RAG Pattern**: Context retrieval using cosine similarity for enhanced AI responses
- **User Isolation**: Tasks filtered by userId, ensuring data privacy
- **Token Management**: Automatic JWT injection via Axios interceptors
- **Session Handling**: Logout functionality with token cleanup

## 🔄 Trade-offs & Future Improvements

### Trade-offs Made
- **Embedding Storage**: JSON strings in PostgreSQL (could use dedicated vector DB like Pinecone)
- **Simple RAG**: Cosine similarity only (could add more sophisticated retrieval)
- **No Task Editing**: Only create/delete (can add update endpoint)
- **Basic UI**: Functional and modern but not pixel-perfect (can enhance)

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

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent task summaries
- Prisma for excellent database tooling
- Tailwind CSS for rapid UI development
- Lucide for beautiful icons

---

**Built for Rubico Tech Technical Assessment**

For questions or issues, please contact the repository owner.
