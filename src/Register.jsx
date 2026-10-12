
import { useState } from 'react';

export default function Register({ onLogin, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Registration is not saved until a backend is connected.
    if (typeof onRegister === 'function') {
      onRegister({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } else if (typeof onLogin === 'function') {
      onLogin();
    } else {
      setError('Registration is not connected yet.');
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.brand}>✚ MediAccess</h1>
        <h2>Create Account</h2>
        <p>Register to continue</p>

        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          style={styles.input}
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          style={styles.input}
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          style={styles.input}
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        {error && (
          <p role="alert" style={styles.error}>
            {error}
          </p>
        )}

        <button style={styles.button} type="submit">
          Create Account
        </button>

        <p style={styles.footer}>
          Already registered?{' '}
          <button
            type="button"
            style={styles.link}
            onClick={onLogin}
          >
            Login
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
