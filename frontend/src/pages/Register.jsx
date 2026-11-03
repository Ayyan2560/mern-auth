import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiZap, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import ParticleBackground from '../components/ParticleBackground';
import toast from 'react-hot-toast';

const StrengthBar = ({ password }) => {
  const getStrength = () => {
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['', '#ff4d6d', '#ff9500', '#ffcc00', '#00c896', '#6c63ff'];

  if (!password) return null;
  return (
    <div style={{ marginTop: '-0.8rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[1,2,3,4,5].map(i => (
          <motion.div key={i}
            animate={{ backgroundColor: i <= strength ? colors[strength] : 'rgba(255,255,255,0.1)' }}
            style={{ flex: 1, height: '3px', borderRadius: '2px', transition: 'background-color 0.3s' }}
          />
        ))}
      </div>
      <p style={{ fontSize: '0.72rem', color: colors[strength] }}>{labels[strength]}</p>
    </div>
  );
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!agreed) e.terms = 'Please accept terms';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setLoading(true);
    try {
      await register(form.name.trim(), form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
      <ParticleBackground />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,107,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,157,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '460px',
          background: 'rgba(10,10,28,0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,107,157,0.2)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative', zIndex: 10,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,157,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px',
          background: 'linear-gradient(90deg, transparent, #ff6b9d, #6c63ff, transparent)',
          borderRadius: '2px'
        }} />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, #ff6b9d, #6c63ff)',
              borderRadius: '16px', marginBottom: '1rem',
              boxShadow: '0 8px 30px rgba(255,107,157,0.4)'
            }}
          >
            <FiZap style={{ fontSize: '1.6rem', color: '#fff' }} />
          </motion.div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            Create account
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
            Join thousands of users today
          </p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible">
          <InputField label="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} icon={FiUser} error={errors.name} placeholder="John Doe" />
          <InputField label="Email address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} icon={FiMail} error={errors.email} placeholder="you@example.com" />
          <InputField label="Password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} icon={FiLock} error={errors.password} placeholder="Min. 6 characters" />
          <StrengthBar password={form.password} />
          <InputField label="Confirm password" type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} icon={FiLock} error={errors.confirm} placeholder="Repeat password" />

          {/* Terms checkbox */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', marginBottom: '1.2rem' }}
          >
            <div
              onClick={() => setAgreed(!agreed)}
              style={{
                width: '20px', height: '20px', minWidth: '20px', borderRadius: '6px',
                border: `2px solid ${agreed ? '#6c63ff' : errors.terms ? '#ff4d6d' : 'rgba(255,255,255,0.2)'}`,
                background: agreed ? '#6c63ff' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: '2px', transition: 'all 0.2s'
              }}
            >
              <AnimatePresence>
                {agreed && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <FiCheck style={{ color: '#fff', fontSize: '12px' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              I agree to the{' '}
              <span style={{ color: '#6c63ff', cursor: 'pointer' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: '#ff6b9d', cursor: 'pointer' }}>Privacy Policy</span>
              {errors.terms && <span style={{ display: 'block', color: '#ff4d6d', fontSize: '0.72rem' }}>{errors.terms}</span>}
            </p>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(255,107,157,0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '0.9rem',
              background: loading ? 'rgba(255,107,157,0.4)' : 'linear-gradient(135deg, #ff6b9d, #8b5cf6)',
              border: 'none', borderRadius: '12px',
              color: '#fff', fontSize: '1rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(255,107,157,0.3)'
            }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="spin"
                  style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%' }}
                  animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
              ) : (
                <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Create Account <FiArrowRight />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '1.5rem' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#6c63ff', textDecoration: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
