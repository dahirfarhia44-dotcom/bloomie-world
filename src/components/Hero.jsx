import React from 'react'
import styles from './Hero.module.css'

function Hero() {
  return (
    <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to Bloomie World</h1>
        <p>Learn • Play • Grow</p>

        {/* Example floating circles */}
      <div className={styles.circle} style={{ width: '50px', height: '50px', top: '10%', left: '20%' }}><h1 className={styles.fan}>G</h1></div>
      <div className={styles.circle} style={{ width: '30px', height: '30px', top: '50%', left: '70%' }}><h1 className={styles.fano}>O</h1></div>
      <div className={styles.circle} style={{ width: '40px', height: '40px', top: '70%', left: '30%' }}><h1 className={styles.fan}>R</h1></div>
      <div className={styles.circle} style={{ width: '60px', height: '60px', top: '70%', left: '85%' }}><h1 className={styles.fan}>W</h1></div>
      
      {/* Floating emojis with random movement */}
      <div className={`${styles.emojiItem} ${styles.randomMove1}`} style={{top:'20%', left:'40%'}}>🌟</div>
      <div className={`${styles.emojiItem} ${styles.randomMove2}`} style={{top:'70%', left:'70%'}}>🦄</div>
      <div className={`${styles.emojiItem} ${styles.randomMove3}`} style={{top:'80%', left:'45%'}}>🍩</div>
      <div className={`${styles.emojiItem} ${styles.randomMove4}`} style={{top:'05%', left:'4%'}}>🎨</div>
      <div className={`${styles.emojiItem} ${styles.randomMove5}`} style={{top:'60%', left:'20%'}}>🍭</div>
      <div className={`${styles.emojiItem} ${styles.randomMove6}`} style={{top:'10%', left:'90%'}}>🚀</div>
    </div>
  )
}

export default Hero;