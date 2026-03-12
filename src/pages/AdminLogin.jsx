import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css'

function AdminLogin() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Login:', credentials);
    navigate('/admin/dashboard');
  };

  return (
    <div className={styles.auth}>
      <h2>Admin 👑</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Admin Email'
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

        <button type='submit'>Enter 👑</button>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            {' '}
            <span
                onClick={() => navigate('/')}
                style={{ color: '#66a6ff', cursor: 'pointer', fontWeight: 'bold' }}
            >
                Go Back!
            </span>
        </p>

      </form>
    </div>
  )
}

export default AdminLogin;