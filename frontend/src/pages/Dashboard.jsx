import { motion } from 'framer-motion';
import { FiLogOut, FiUser, FiMail, FiCalendar, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, boxShadow: `0 20px 40px ${color}25` }}
    style={{
      background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}30`,
      borderRadius: '16px', padding: '1.4rem',
      display: 'flex', flexDirection: 'column', gap: '0.8rem'
    }}
  >
    <div style={{
      width: '44px', height: '44px', borderRadius: '12px',
      background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Icon style={{ color, fontSize: '1.2rem' }} />
    </div>
    <div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{label}</p>
      <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', wordBreak: 'break-word' }}>{value}</p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user, logout } = useAuth();

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem', position: 'relative' }}>
      <ParticleBackground />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%', background: '#00c896',
              boxShadow: '0 0 12px #00c896'
            }} />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Dashboard</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(255,77,109,0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              background: 'rgba(255,77,109,0.08)',
              border: '1px solid rgba(255,77,109,0.2)',
              borderRadius: '10px', color: '#ff4d6d',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s'
            }}
          >
            <FiLogOut /> Logout
          </motion.button>
        </motion.div>

        {/* Profile hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(10,10,28,0.85)', backdropFilter: 'blur(30px)',
            border: '1px solid rgba(108,99,255,0.2)', borderRadius: '24px',
            padding: '2rem', marginBottom: '1.2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
            background: 'linear-gradient(90deg, transparent, #6c63ff, #ff6b9d, transparent)'
          }} />

          {/* Glow orb */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '80px', height: '80px', borderRadius: '20px',
                background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
                boxShadow: '0 8px 30px rgba(108,99,255,0.5)', flexShrink: 0
              }}
            >
              {initials}
            </motion.div>

            <div style={{ flex: 1 }}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.3rem' }}
              >
                {user?.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}
              >
                {user?.email}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.8rem', background: 'rgba(0,200,150,0.12)',
                  border: '1px solid rgba(0,200,150,0.25)', borderRadius: '20px' }}
              >
                <FiShield style={{ color: '#00c896', fontSize: '0.75rem' }} />
                <span style={{ color: '#00c896', fontSize: '0.75rem', fontWeight: 600 }}>Verified Account</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <StatCard icon={FiUser}     label="Full Name"   value={user?.name || '—'}    color="#6c63ff" delay={0.3} />
          <StatCard icon={FiMail}     label="Email"       value={user?.email || '—'}   color="#ff6b9d" delay={0.4} />
          <StatCard icon={FiCalendar} label="Member Since" value={joinDate}             color="#00d4ff" delay={0.5} />
          <StatCard icon={FiShield}   label="Status"      value="Active & Secure"      color="#00c896" delay={0.6} />
        </div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: '1.2rem',
            background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(255,107,157,0.08))',
            border: '1px solid rgba(108,99,255,0.15)',
            borderRadius: '16px', padding: '1.4rem',
            textAlign: 'center'
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            🎉 You're successfully logged in! This is your protected dashboard.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
              Your JWT token is stored securely in localStorage.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
