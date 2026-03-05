import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'

function Navbar() {
    const navItems = [
        { label: 'Home', emoji: '🏠', path: '/' },
        { label: 'Learn', emoji: '📚', path: '/learn' },
        { label: 'Hygiene', emoji: '🧼', path: '/hygiene' },
        { label: 'Games', emoji: '🎮', path: '/games' },
    ];

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

    </nav>
  );
}

export default Navbar;