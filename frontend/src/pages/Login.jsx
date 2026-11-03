import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiZap } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import ParticleBackground from '../components/ParticleBackground';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
      <ParticleBackground />

      {/* Grid lines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '440px',
          background: 'rgba(10,10,28,0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative', zIndex: 10,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(108,99,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px',
          background: 'linear-gradient(90deg, transparent, #6c63ff, #ff6b9d, transparent)',
          borderRadius: '2px'
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
              borderRadius: '16px', marginBottom: '1rem',
              boxShadow: '0 8px 30px rgba(108,99,255,0.4)'
            }}
          >
            <FiZap style={{ fontSize: '1.6rem', color: '#fff' }} />
          </motion.div>

          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
            Sign in to your account
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <InputField
              label="Email address"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              icon={FiMail}
              error={errors.email}
              placeholder="you@example.com"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <InputField
              label="Password"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              icon={FiLock}
              error={errors.password}
              placeholder="••••••••"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(108,99,255,0.5)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              width: '100%', padding: '0.9rem',
              background: loading ? 'rgba(108,99,255,0.5)' : 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
              border: 'none', borderRadius: '12px',
              color: '#fff', fontSize: '1rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              marginTop: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(108,99,255,0.3)'
            }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  style={{
                    width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid #fff', borderRadius: '50%'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
              ) : (
                <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Sign In <FiArrowRight />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '1.5rem' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#6c63ff', textDecoration: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Create one
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
