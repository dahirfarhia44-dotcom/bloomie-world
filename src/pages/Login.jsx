import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get students from localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Check if email and password match any student
    const found = students.find(
      s => s.email === credentials.email && s.password === credentials.password
    );

    if (found) {
      localStorage.setItem('currentStudent', JSON.stringify(found));
      navigate('/home');
    } else {
      setError('Invalid email or password. Please sign up first!');
    }
  };

  return (
    <div className={styles.auth}>
      <h2>Log In</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          required
        />

        <input
          type='password'
          placeholder='Password'
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />

        {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

        <button type='submit'>Log In</button>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            Don't have an account?{' '}
            <span
                onClick={() => navigate('/signup')}
                style={{ color: '#66a6ff', cursor: 'pointer', fontWeight: 'bold' }}
            >
                Sign Up
            </span>
        </p>

      </form>
    </div>
  )
}

export default Login;