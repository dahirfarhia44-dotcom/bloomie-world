import React from 'react'
import styles from './Hero.module.css'

function Hero() {
  return (
    <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to Bloomie World</h1>
        <p>Learn • Play • Grow</p>

        {/* Example floating circles */}
      <div className={styles.circle} style={{ width: '50px', height: '50px', top: '10%', left: '20%' }}><h1 className={styles.fan}>G</h1></div>
      <div className={styles.circle} style={{ width: '30px', height: '30px', top: '50%', left: '70%' }}><h1 className={styles.fan}>O</h1></div>
      <div className={styles.circle} style={{ width: '40px', height: '40px', top: '70%', left: '30%' }}><h1 className={styles.fan}>R</h1></div>
      <div className={styles.circle} style={{ width: '60px', height: '60px', top: '70%', left: '85%' }}><h1 className={styles.fan}>W</h1></div>
      
      {/* Floating emojis */}
      <div className={styles.emojiItem} style={{ position: 'absolute', top: '20%', left: '8%', fontSize: '2rem' }}>🌟</div>
      <div className={styles.emojiItem} style={{ position: 'absolute', top: '40%', left: '80%', fontSize: '2.5rem' }}>🦄</div>
      <div className={styles.emojiItem} style={{ position: 'absolute', top: '80%', left: '45%', fontSize: '1.8rem' }}>🍩</div>
      <div className={styles.emojiItem} style={{ position: 'absolute', top: '15%', left: '40%', fontSize: '2rem' }}>🎨</div>
      <div className={styles.emojiItem} style={{ position: 'absolute', top: '60%', left: '20%', fontSize: '2rem' }}>🍭</div>
      <div className={styles.emojiItem} style={{ position: 'absolute', top: '10%', left: '90%', fontSize: '2rem' }}>🚀</div>
    </div>
  )
}

export default Hero;