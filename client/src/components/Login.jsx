import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(email, password);
        alert('Signup successful! Please login.');
        setIsSignup(false);
      } else {
        await login(email, password);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px 20px", margin: "10px" }}>
          {isSignup ? 'Signup' : 'Login'}
        </button>
      </form>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: "10px" }}>
          {isSignup ? 'Already have an account? Login' : 'No account? Signup'}
        </button>
      </div>
    </div>
  );
};

export default Login;
