import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'

function Navbar() {
    const navigate = useNavigate();
    
    const navItems = [
        { label: 'Home', emoji: '🏠', path: '/home' },
        { label: 'Learn', emoji: '📚', path: '/learn' },
        { label: 'Hygiene', emoji: '🧼', path: '/hygiene' },
        { label: 'Games', emoji: '🎮', path: '/games' },
    ];

    const handleLogout = () => {
        
      //redirect to sign up page
        navigate('/');
    };

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <NavLink
        key={item.label} 
        to={item.path}
        className={({ isActive }) =>
            `${styles.btn} ${isActive ? styles.active : ""}`
          }
          >
          {item.label} {item.emoji}
        </NavLink>
      ))}

       {/* Logout Button */}
            <button 
                onClick={handleLogout}
                className={`${styles.btn} ${styles.logoutBtn}`}
            >
                Logout 🚪
            </button>

    </nav>
  );
}

export default Navbar;