import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Splashscreen.module.css';

function Splashscreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    const student = localStorage.getItem('currentStudent');

    if (isAdmin) {
      window.location.replace('/admin/dashboard');
      return;
    } else if (student) {
      window.location.replace('/home');
      return;
    }

    window.history.pushState(null, '', '/');
    window.history.pushState(null, '', '/');
    window.onpopstate = () => {
      window.history.pushState(null, '', '/');
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Welcome to Bloomie</h1>
            <p className={styles.subtitle}>Your gateway to amazing experiences</p>
            <div className={styles.buttonContainer}>
                
                <button
                className={`${styles.button} ${styles.signupButton}`}
                onClick={() => navigate('/signup', { replace: true })}
                >
                Sign Up
                </button>

                <button
                className={`${styles.button} ${styles.loginButton}`}
                onClick={() => navigate('/login', { replace: true })}
                >
                Log In
                </button>

                <button 
                className={`${styles.button} ${styles.adminBtn}`}
                onClick={() => navigate('/admin/login', { replace: true })}
                >
                Admin 👑
                </button>

            </div>

            <div className={styles.floatingEmojis}>
                    <span>🌟</span>
                    <span>🦄</span>
                    <span>🍭</span>
                    <span>🎨</span>
                    <span>🚀</span>
                </div>
        </div>
    </div>  
  )
}

export default Splashscreen;