import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Sparkles, LogOut, LayoutDashboard, ListTodo } from 'lucide-react';
import { authService } from './services/authService';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './components/Dashboard';
import TasksPage from './pages/TasksPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    const isAuth = await authService.checkAuth();
    setIsAuthenticated(isAuth);
    setAuthChecked(true);
    
    // Redirect to login if not authenticated and not on auth pages
    if (!isAuth && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };


  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isAuthenticated && (
        <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/tasks" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">Smart Task Manager</h1>
              </Link>
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  to="/tasks"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <ListTodo className="w-4 h-4" />
                  <span className="hidden sm:inline">Tasks</span>
                </Link>
                <Link
                  to="/smartwork"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className={isAuthenticated ? 'py-6 px-4' : ''}>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/tasks" replace />} 
          />
          <Route 
            path="/signup" 
            element={!isAuthenticated ? <SignupPage /> : <Navigate to="/tasks" replace />} 
          />
          <Route 
            path="/tasks" 
            element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/smartwork" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>

      {isAuthenticated && (
        <footer className="mt-8 text-center text-gray-600 text-sm px-4 pb-6">
          <p>Built with React, TypeScript, Express, Prisma & Groq AI</p>
          <p className="mt-2 text-xs">🔒 Session Auth • 🤖 AI Briefings • 📊 PostgreSQL • 📈 Smart Dashboard</p>
        </footer>
      )}
    </div>
  );
}

export default App;
