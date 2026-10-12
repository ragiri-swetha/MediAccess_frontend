
import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Home from './Home';

export default function App() {
  const [page, setPage] = useState('register');

  if (page === 'register') {
    return (
      <Register
        onLogin={() => setPage('login')}
        onRegister={() => setPage('login')}
      />
    );
  }

  if (page === 'login') {
    return (
      <Login
        onRegister={() => setPage('register')}
        onLogin={() => setPage('home')}
      />
    );
  }

  return <Home />;
}
