import { useState } from 'react';
import styles from './Navbar.module.css'

function Navbar() {
    const [active, setActive] = useState('Home');

    const navItems = [
        { label: 'Home', emoji: '🏠' },
        { label: 'Learn', emoji: '📚'},
        { label: 'Hygiene', emoji: '🧼'},
        { label: 'Games', emoji: '🎮'},
    ];

  return (
    <div >
    </div>
  )
}

export default Navbar;