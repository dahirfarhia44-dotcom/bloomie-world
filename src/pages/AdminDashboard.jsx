import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {

const [darkMode, setDarkMode] = useState(true);
const navigate = useNavigate();
const [tab, setTab] = useState('overview');

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.dark : styles.light}`}>

      <div className={styles.sidebar}>
        <div className={styles.logo}>
            <span>👑</span>
            <span>Admin</span>

        </div>

        <button onClick={() => setTab('overview')}>📊 Overview</button>
        <button onClick={() => setTab('students')}>👦 Students</button>
        <button onClick={() => setTab('learn')}>📚 Learning</button>
        <button onClick={() => setTab('hygiene')}>🧼 Hygiene</button>
        <button onClick={() => setTab('games')}>🎮 Games</button>
        
        {/* Dark mode toggle */}
        <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Logout button */}
        <button onClick={() => navigate('/admin/login')}>🚪 Logout</button>

      </div>
        <div className={styles.mainContent}>
            {tab === 'overview' && (
                <div>
                    <h1>📊 Overview</h1>
                    <p>Welcome, Admin 👑</p>
                </div>
             )}
            {tab === 'students' && (
                <div>
                <h1>👦 Students</h1>
                <p>Manage students here</p>
                </div>
            )}
            {tab === 'learn' && (
                <div>
                <h1>📚 Learning</h1>
                <p>Manage learning content here</p>
                </div>
            )}
            {tab === 'hygiene' && (
                <div>
                <h1>🧼 Hygiene</h1>
                <p>Manage hygiene protocols here</p>
                </div>
            )}
            {tab === 'games' && (
                <div>
                <h1>🎮 Games</h1>
                <p>Manage games here</p>
                </div>
            )}

      </div>
      </div>
  );
}

export default AdminDashboard;