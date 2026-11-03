import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '40px', height: '40px',
        border: '3px solid rgba(108,99,255,0.2)',
        borderTop: '3px solid #6c63ff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(15,15,35,0.95)',
              color: '#fff',
              border: '1px solid rgba(108,99,255,0.3)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontFamily: 'Inter, sans-serif'
            },
            success: { iconTheme: { primary: '#00c896', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ff4d6d', secondary: '#fff' } }
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
