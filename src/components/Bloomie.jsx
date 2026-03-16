import styles from './Bloomie.module.css';

const BLOOMIE_DATA = {
  basic: {
    color: '#e91e8c',
    bg: 'linear-gradient(135deg, #ffb3d9, #fff9c4)',
    border: '#ffb3d9',
    accessory: '🎀',
    body: '💛',
    messages: {
      default: "Hi there! Let's learn something fun today! 🌟",
      lowProgress: "Every expert was once a beginner! You got this! 💪",
      highProgress: "Wow, look at you go! You're a superstar! ⭐⭐⭐",
    }
  },
  intermediate: {
    color: '#00838f',
    bg: 'linear-gradient(135deg, #b2ebf2, #e8f5e9)',
    border: '#b2ebf2',
    accessory: '🎯',
    body: '💙',
    messages: {
      default: "Ready to level up today? Let's crush it! 🚀",
      lowProgress: "Consistency is key — keep showing up! 🔑",
      highProgress: "Incredible work! You're setting the bar high! 🌟",
    }
  },
  advanced: {
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, #1c2030, #0d0f14)',
    border: '#272c3d',
    accessory: '🎓',
    body: '💜',
    messages: {
      default: "Excellence is a habit, not an event. Let's build it. 💎",
      lowProgress: "The journey of mastery begins with a single step. 🌱",
      highProgress: "Outstanding. You are becoming who you were meant to be. 🏆",
    }
  }
};

function getMessage(data, progress) {
  const avg = progress
    ? Math.round((progress.learning + progress.hygiene + progress.games) / 3)
    : 0;

  if (avg === 0) return data.messages.default;
  if (avg < 30) return data.messages.lowProgress;
  return data.messages.highProgress;
}


function Bloomie({ level, progress }) {
  const data = BLOOMIE_DATA[level] || BLOOMIE_DATA.basic;
  const message = getMessage(data, progress);

  return (
    <div className={styles.wrapper}>

      {/* Mascot */}
      <div className={styles.mascot} style={{ background: data.bg, borderColor: data.border }}>
        <div className={styles.body}>
          <div className={styles.accessory}>{data.accessory}</div>
          <div className={styles.faceRing} style={{ borderColor: data.color }}>
            <div className={styles.face}>
              <div className={styles.eyes}>
                <span className={styles.eye} style={{ background: data.color }} />
                <span className={styles.eye} style={{ background: data.color }} />
              </div>
              <div className={styles.cheeks}>
                <span className={styles.cheek} style={{ background: data.color + '44' }} />
                <span className={styles.cheek} style={{ background: data.color + '44' }} />
              </div>
              <div className={styles.mouth} style={{ borderColor: data.color }} />
            </div>
          </div>
          <div className={styles.bodyEmoji}>{data.body}</div>
        </div>
        <div className={styles.badge} style={{ background: data.color }}>
          {level}
        </div>
      </div>

      {/* Speech bubble */}
      <div className={styles.bubble} style={{ borderColor: data.border }}>
        <div className={styles.bubbleTail} style={{ borderRightColor: data.border }} />
        <p className={styles.message} style={{ color: data.color }}>{message}</p>
      </div>

    </div>
  );
}


export default Bloomie;