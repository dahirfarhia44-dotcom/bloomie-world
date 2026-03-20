import styles from './Footer.module.css';

function Footer() {
  const student = JSON.parse(localStorage.getItem('currentStudent'));
  const level = student?.level || 'basic';

  const levelClass =
    level === 'basic' ? styles.basicFooter
    : level === 'intermediate' ? styles.intermediateFooter
    : styles.advancedFooter;

  return (
    <footer className={`${styles.footer} ${levelClass}`}>
      <div className={styles.inner}>
        <span className={styles.logo}>🌸 Bloomie World</span>
        <span className={styles.tagline}>Learn • Play • Grow</span>
        <span className={styles.copy}>© 2026 Bloomie World. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;