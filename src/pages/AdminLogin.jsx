import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css'

const ADMIN = {
  email: 'admin@bloomie.com',
  password: 'admin123'
};

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email === ADMIN.email && credentials.password === ADMIN.password) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid admin credentials!');
    }
  };

  return (
    <div className={styles.auth}>
      <h2>Admin 👑</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Admin Email' value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} required />
        <input type='password' placeholder='Password' value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
        {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
        <button type='submit'>Enter 👑</button>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
          <span onClick={() => { 
            localStorage.removeItem('currentStudent');
            localStorage.removeItem('isAdmin');
            navigate('/', { replace: true })}} style={{ color: '#66a6ff', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Home</span>
        </p>
      </form>
    </div>
  )
}

export default AdminLogin;