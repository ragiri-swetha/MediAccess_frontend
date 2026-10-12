
import { useState } from 'react';

export default function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError('Please enter email and password.');
      return;
    }

    if (typeof onLogin === 'function') {
      onLogin({ email: cleanEmail, password });
    } else {
      setError('Login is not connected yet.');
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.brand}>✚ MediAccess</h1>
        <h2>Login</h2>
        <p>Sign in to continue</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <p role="alert" style={styles.error}>
            {error}
          </p>
        )}

        <button style={styles.button} type="submit">
          Login
        </button>

        <p style={styles.footer}>
          New user?{' '}
          <button
            type="button"
            style={styles.link}
            onClick={onRegister}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    background: '#eaf7f1',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '360px',
    padding: '28px',
    boxSizing: 'border-box',
    background: 'white',
    borderRadius: '14px',
    boxShadow: '0 4px 15px #0001',
  },
  brand: {
    color: '#087f5b',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '8px 0 16px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '7px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    background: '#087f5b',
    color: 'white',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
  },
  error: {
    color: '#b42318',
    fontSize: '14px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#087f5b',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

