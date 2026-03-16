import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Bloomie from '../components/Bloomie';

function Home() {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem('currentStudent'));
  const level = student?.level;
  const name = student?.name;
  const progress = student?.progress;

  return (
    <div className={styles.home}>

      {/* BASIC */}
      {level === 'basic' && (
        <div className={styles.basicHome}>
          <div className={styles.content}>
            <Bloomie level="basic" progress={progress} />
            <h1 className={styles.welcome}>Hello, {name}! 🌟</h1>
            <p className={styles.subtitle}>Welcome to your learning dashboard.</p>
            <div className={styles.progressContainer}>
              <h2>⭐ Your Stars</h2>
              <div className={styles.stars}>
                <p>📚 Learning: {'⭐'.repeat(Math.ceil(progress.learning / 20))}</p>
                <p>🧼 Hygiene: {'⭐'.repeat(Math.ceil(progress.hygiene / 20))}</p>
                <p>🎮 Games: {'⭐'.repeat(Math.ceil(progress.games / 20))}</p>
              </div>
            </div>
            <div className={styles.quickLinks}>
              <h2>What do you want to do today? 🎉</h2>
              <div className={styles.cards}>
                <div className={styles.card} onClick={() => navigate('/learn')}>
                  <span>📚</span><p>Let's Learn!</p>
                </div>
                <div className={styles.card} onClick={() => navigate('/hygiene')}>
                  <span>🧼</span><p>Stay Clean!</p>
                </div>
                <div className={styles.card} onClick={() => navigate('/games')}>
                  <span>🎮</span><p>Play Games!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERMEDIATE */}
      {level === 'intermediate' && (
        <div className={styles.intermediateHome}>
          <div className={styles.content}>
            <Bloomie level="intermediate" progress={progress} />
            <h1 className={styles.welcome}>Welcome back, {name}! 👋</h1>
            <p className={styles.subtitle}>Keep up the great work!</p>
            <div className={styles.progressSection}>
              <h2>📊 Your Progress</h2>
              <div className={styles.progressItem}>
                <span>📚 Learning</span>
                <div className={styles.bar}><div className={styles.fill} style={{ width: `${progress.learning}%` }} /></div>
                <span>{progress.learning}%</span>
              </div>
              <div className={styles.progressItem}>
                <span>🧼 Hygiene</span>
                <div className={styles.bar}><div className={styles.fill} style={{ width: `${progress.hygiene}%` }} /></div>
                <span>{progress.hygiene}%</span>
              </div>
              <div className={styles.progressItem}>
                <span>🎮 Games</span>
                <div className={styles.bar}><div className={styles.fill} style={{ width: `${progress.games}%` }} /></div>
                <span>{progress.games}%</span>
              </div>
            </div>
            <div className={styles.quickLinks}>
              <h2>Continue Learning 🚀</h2>
              <div className={styles.cards}>
                <div className={styles.card} onClick={() => navigate('/learn')}>
                  <span>📚</span><p>Learning Activities</p>
                </div>
                <div className={styles.card} onClick={() => navigate('/hygiene')}>
                  <span>🧼</span><p>Hygiene Lessons</p>
                </div>
                <div className={styles.card} onClick={() => navigate('/games')}>
                  <span>🎮</span><p>Challenge Games</p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADVANCED */}
      {level === 'advanced' && (
        <div className={styles.advancedHome}>
          <div className={styles.content}>
            <Bloomie level="advanced" progress={progress} />
            <h1 className={styles.welcome}>Hello, {name} 👊</h1>
            <p className={styles.subtitle}>Push your limits today.</p>
            <div className={styles.progressSection}>
              <h2>📈 Performance Stats</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>{progress.learning}%</p>
                  <p>Learning</p>
                </div>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>{progress.hygiene}%</p>
                  <p>Hygiene</p>
                </div>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>{progress.games}%</p>
                  <p>Games</p>
                </div>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>
                    {Math.round((progress.learning + progress.hygiene + progress.games) / 3)}%
                  </p>
                  <p>Overall</p>
                </div>
              </div>
            </div>
            <div className={styles.quickLinks}>
              <h2>Your Activities</h2>
              <div className={styles.cards}>
                <div className={styles.card} onClick={() => navigate('/learn')}>
                  <span>📚</span><p>Advanced Learning</p>
                </div>
                <div className={styles.card} onClick={() => navigate('/hygiene')}>
                  <span>🧼</span><p>Health & Hygiene</p>
                </div>
                <div className={styles.card} onClick={() => navigate('/games')}>
                  <span>🎮</span><p>Advanced Challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home;