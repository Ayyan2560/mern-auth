import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function InputField({ label, type = 'text', value, onChange, icon: Icon, error, placeholder }) {
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPass ? 'text' : 'password') : type;

  return (
    <motion.div
      style={{ marginBottom: '1.2rem', position: 'relative' }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <label style={{
        display: 'block',
        fontSize: '0.78rem',
        fontWeight: 500,
        color: focused ? '#6c63ff' : 'rgba(255,255,255,0.5)',
        marginBottom: '0.4rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        transition: 'color 0.2s'
      }}>
        {label}
      </label>

      <div style={{ position: 'relative' }}>
        {Icon && (
          <Icon style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? '#6c63ff' : 'rgba(255,255,255,0.3)',
            fontSize: '1rem', transition: 'color 0.2s', zIndex: 1
          }} />
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: `0.85rem ${isPassword ? '2.8rem' : '1rem'} 0.85rem ${Icon ? '2.8rem' : '1rem'}`,
            background: focused ? 'rgba(108,99,255,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? '#ff4d6d' : focused ? '#6c63ff' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '12px',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.15)' : 'none'
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{
              position: 'absolute', right: '1rem', top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontSize: '1rem',
              display: 'flex', alignItems: 'center', padding: '0.2rem'
            }}
          >
            {showPass ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#ff4d6d', fontSize: '0.75rem', marginTop: '0.3rem' }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
