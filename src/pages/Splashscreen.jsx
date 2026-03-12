import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Splashscreen.module.css';

function Splashscreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Welcome to MyApp</h1>
            <p className={styles.subtitle}>Your gateway to amazing experiences</p>
            <div className={styles.buttonContainer}>
                
                <button
                className={`${styles.button} ${styles.signupButton}`}
                onClick={() => navigate('/signup')}
                >
                Sign Up
                </button>

                <button
                className={`${styles.button} ${styles.loginButton}`}
                onClick={() => navigate('/login')}
                >
                Log In
                </button>

                <button 
                className={`${styles.button} ${styles.adminBtn}`}
                onClick={() => navigate('/admin/login')}
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