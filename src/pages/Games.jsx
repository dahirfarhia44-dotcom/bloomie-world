import React, { useState, useEffect } from "react";
import styles from "./Games.module.css";

// ── Game Data per level ──────────────────────────────────────────
const gameData = {
  basic: {
    memory: [
      { id: 1, emoji: "🐶" }, { id: 2, emoji: "🐱" },
      { id: 3, emoji: "🐸" }, { id: 4, emoji: "🐥" },
      { id: 5, emoji: "🌸" }, { id: 6, emoji: "🍎" },
    ],
    wordScramble: [
      { word: "CAT", hint: "A furry pet 🐱" },
      { word: "DOG", hint: "Man's best friend 🐶" },
      { word: "SUN", hint: "Shines in the sky ☀️" },
      { word: "BEE", hint: "Makes honey 🐝" },
    ],
    dragDrop: [
      { id: 1, item: "🐶", category: "Animals", options: ["Animals", "Fruits", "Colors"] },
      { id: 2, item: "🍎", category: "Fruits", options: ["Animals", "Fruits", "Colors"] },
      { id: 3, item: "🔴", category: "Colors", options: ["Animals", "Fruits", "Colors"] },
      { id: 4, item: "🐱", category: "Animals", options: ["Animals", "Fruits", "Colors"] },
    ],
    trivia: [
      { question: "What color is the sky?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Blue" },
      { question: "How many legs does a dog have?", options: ["2", "4", "6", "8"], answer: "4" },
      { question: "What sound does a cow make?", options: ["Moo", "Baa", "Woof", "Meow"], answer: "Moo" },
      { question: "Which fruit is yellow and long?", options: ["Apple", "Grape", "Banana", "Mango"], answer: "Banana" },
      { question: "What do plants need to grow?", options: ["Sunlight", "Darkness", "Sand", "Metal"], answer: "Sunlight" },
      { question: "How many days are in a week?", options: ["5", "6", "7", "8"], answer: "7" },
    ],
  },

  intermediate: {
    memory: [
      { id: 1, emoji: "🌍" }, { id: 2, emoji: "🔬" },
      { id: 3, emoji: "📐" }, { id: 4, emoji: "🎨" },
      { id: 5, emoji: "🏆" }, { id: 6, emoji: "🚀" },
      { id: 7, emoji: "🎵" }, { id: 8, emoji: "⚡" },
      { id: 9, emoji: "🧲" }, { id: 10, emoji: "🌊" },
    ],
    wordScramble: [
      { word: "SCIENCE", hint: "Study of the natural world 🔬" },
      { word: "PLANET", hint: "Orbits the sun 🌍" },
      { word: "ENERGY", hint: "Powers everything ⚡" },
      { word: "FRACTION", hint: "Part of a whole 📐" },
      { word: "GRAVITY", hint: "Pulls things down 🌎" },
      { word: "VOLCANO", hint: "Erupts with lava 🌋" },
    ],
    dragDrop: [
      { id: 1, item: "H2O", category: "Science", options: ["Science", "Math", "English", "History"] },
      { id: 2, item: "12 × 3", category: "Math", options: ["Science", "Math", "English", "History"] },
      { id: 3, item: "Adjective", category: "English", options: ["Science", "Math", "English", "History"] },
      { id: 4, item: "World War II", category: "History", options: ["Science", "Math", "English", "History"] },
      { id: 5, item: "Photosynthesis", category: "Science", options: ["Science", "Math", "English", "History"] },
      { id: 6, item: "1/2 of 8", category: "Math", options: ["Science", "Math", "English", "History"] },
    ],
    trivia: [
      { question: "What is H2O commonly known as?", options: ["Salt", "Water", "Air", "Sugar"], answer: "Water" },
      { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
      { question: "What planet is closest to the Sun?", options: ["Earth", "Mars", "Mercury", "Venus"], answer: "Mercury" },
      { question: "What is 12 × 3?", options: ["24", "36", "30", "18"], answer: "36" },
      { question: "What is the past tense of 'run'?", options: ["Runned", "Ran", "Running", "Runs"], answer: "Ran" },
      { question: "What force pulls objects to Earth?", options: ["Magnetism", "Gravity", "Friction", "Tension"], answer: "Gravity" },
      { question: "Which is a prime number?", options: ["4", "6", "7", "9"], answer: "7" },
      { question: "What is 1/4 of 40?", options: ["4", "8", "10", "12"], answer: "10" },
    ],
  },

  advanced: {
    memory: [
      { id: 1, emoji: "⚛️" }, { id: 2, emoji: "🧬" },
      { id: 3, emoji: "📊" }, { id: 4, emoji: "🌐" },
      { id: 5, emoji: "🔭" }, { id: 6, emoji: "💡" },
      { id: 7, emoji: "🧮" }, { id: 8, emoji: "📡" },
      { id: 9, emoji: "🛸" }, { id: 10, emoji: "🧪" },
      { id: 11, emoji: "🏛️" }, { id: 12, emoji: "⚗️" },
    ],
    wordScramble: [
      { word: "ALGEBRA", hint: "Uses letters for numbers 🔢" },
      { word: "ECOSYSTEM", hint: "Plants and animals living together 🌿" },
      { word: "HYPOTHESIS", hint: "An educated guess before testing 🔬" },
      { word: "DEMOCRACY", hint: "A system of government 🗳️" },
      { word: "CHROMOSOME", hint: "Carries genetic information 🧬" },
      { word: "TRAJECTORY", hint: "Path of a moving object 🚀" },
      { word: "EQUILIBRIUM", hint: "State of balance ⚖️" },
    ],
    dragDrop: [
      { id: 1, item: "x² + 2x = 0", category: "Algebra", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 2, item: "Mitochondria", category: "Biology", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 3, item: "Amazon River", category: "Geography", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 4, item: "H₂SO₄", category: "Chemistry", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 5, item: "Photosynthesis equation", category: "Biology", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 6, item: "Longitude & Latitude", category: "Geography", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 7, item: "Quadratic formula", category: "Algebra", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
      { id: 8, item: "NaCl compound", category: "Chemistry", options: ["Algebra", "Biology", "Geography", "Chemistry"] },
    ],
    trivia: [
      { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"], answer: "Mitochondria" },
      { question: "Solve: 3x - 7 = 14, x = ?", options: ["5", "6", "7", "8"], answer: "7" },
      { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "CO2", "Hydrogen"], answer: "CO2" },
      { question: "What is 15% of 320?", options: ["42", "46", "48", "52"], answer: "48" },
      { question: "Which layer of Earth is liquid?", options: ["Crust", "Mantle", "Outer core", "Inner core"], answer: "Outer core" },
      { question: "What is the chemical formula for water?", options: ["HO", "H2O", "H2O2", "HO2"], answer: "H2O" },
      { question: "What is the value of π (pi) to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
      { question: "Who developed the theory of relativity?", options: ["Newton", "Darwin", "Einstein", "Curie"], answer: "Einstein" },
      { question: "What is the derivative of x²?", options: ["x", "2x", "x²", "2"], answer: "2x" },
      { question: "Which organelle makes proteins?", options: ["Nucleus", "Ribosome", "Lysosome", "Golgi body"], answer: "Ribosome" },
    ],
  },
};

// ── Helper: shuffle array ────────────────────────────────────────
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ════════════════════════════════════════════════════════════════
// MEMORY MATCH GAME
// ════════════════════════════════════════════════════════════════
function MemoryGame({ cards, onComplete }) {
  const [board, setBoard] = useState(() =>
    shuffle([...cards, ...cards].map((c, i) => ({ ...c, uid: i, flipped: false, matched: false })))
  );
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const flip = (uid) => {
    if (locked) return;
    const card = board.find((c) => c.uid === uid);
    if (!card || card.flipped || card.matched) return;

    const newBoard = board.map((c) => c.uid === uid ? { ...c, flipped: true } : c);
    setBoard(newBoard);
    const newSelected = [...selected, uid];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = newSelected.map((id) => newBoard.find((c) => c.uid === id));
      if (a.emoji === b.emoji) {
        const matched = newBoard.map((c) =>
          c.uid === a.uid || c.uid === b.uid ? { ...c, matched: true } : c
        );
        setBoard(matched);
        setSelected([]);
        setLocked(false);
        if (matched.every((c) => c.matched)) onComplete(moves + 1);
      } else {
        setTimeout(() => {
          setBoard((prev) =>
            prev.map((c) => newSelected.includes(c.uid) ? { ...c, flipped: false } : c)
          );
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className={styles.memoryGrid}>
      {board.map((card) => (
        <div
          key={card.uid}
          className={`${styles.memoryCard} ${card.flipped || card.matched ? styles.flipped : ""} ${card.matched ? styles.matched : ""}`}
          onClick={() => flip(card.uid)}
        >
          {card.flipped || card.matched ? card.emoji : "❓"}
        </div>
      ))}
      <p className={styles.movesLabel}>Moves: {moves}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// WORD SCRAMBLE GAME
// ════════════════════════════════════════════════════════════════
function WordScramble({ words, onComplete }) {
  const [index, setIndex] = useState(0);
  const [scrambled, setScrambled] = useState(() => shuffle(words[0].word.split("")).join(""));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const check = () => {
    if (input.toUpperCase() === words[index].word) {
      setFeedback("correct");
      setScore((s) => s + 1);
      setTimeout(() => {
        if (index + 1 < words.length) {
          const next = index + 1;
          setIndex(next);
          setScrambled(shuffle(words[next].word.split("")).join(""));
          setInput("");
          setFeedback(null);
        } else {
          onComplete(score + 1);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className={styles.scrambleContainer}>
      <p className={styles.scrambleHint}>{words[index].hint}</p>
      <p className={styles.scrambleWord}>{scrambled}</p>
      <input
        className={styles.scrambleInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Type your answer..."
        maxLength={words[index].word.length + 2}
      />
      <button className={styles.scrambleBtn} onClick={check}>Check ✅</button>
      {feedback === "correct" && <p className={styles.correct}>✔ Correct!</p>}
      {feedback === "wrong" && <p className={styles.incorrect}>✖ Try again!</p>}
      <p className={styles.scoreLabel}>{index + 1} / {words.length}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// DRAG & DROP (click-based) GAME
// ════════════════════════════════════════════════════════════════
function DragDropGame({ items, onComplete }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const pick = (option) => {
    const correct = option === items[index].category;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (index + 1 < items.length) {
        setIndex((i) => i + 1);
        setFeedback(null);
      } else {
        onComplete(correct ? score + 1 : score);
      }
    }, 800);
  };

  return (
    <div className={styles.dragContainer}>
      <p className={styles.dragLabel}>Which category does this belong to?</p>
      <div className={styles.dragItem}>{items[index].item}</div>
      <div className={styles.dragOptions}>
        {items[index].options.map((opt) => (
          <button key={opt} className={styles.dragOption} onClick={() => pick(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {feedback === "correct" && <p className={styles.correct}>✔ Correct!</p>}
      {feedback === "wrong" && <p className={styles.incorrect}>✖ Wrong!</p>}
      <p className={styles.scoreLabel}>{index + 1} / {items.length}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TRIVIA GAME
// ════════════════════════════════════════════════════════════════
function TriviaGame({ questions, onComplete }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const answer = (option) => {
    const correct = option === questions[index].answer;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setFeedback(null);
      } else {
        onComplete(correct ? score + 1 : score);
      }
    }, 800);
  };

  return (
    <div className={styles.triviaContainer}>
      <p className={styles.triviaQuestion}>{questions[index].question}</p>
      <div className={styles.triviaOptions}>
        {questions[index].options.map((opt) => (
          <button key={opt} className={styles.triviaOption} onClick={() => answer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {feedback === "correct" && <p className={styles.correct}>✔ Correct!</p>}
      {feedback === "wrong" && <p className={styles.incorrect}>✖ Wrong!</p>}
      <p className={styles.scoreLabel}>{index + 1} / {questions.length}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN GAMES PAGE
// ════════════════════════════════════════════════════════════════
function Games() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const level = student?.level || "basic";
  const data = gameData[level];

  const [activeGame, setActiveGame] = useState(null);
  const [completedGames, setCompletedGames] = useState(
    JSON.parse(localStorage.getItem(`games_${student?.email}`)) || []
  );

  const saveProgress = (gameName) => {
    const updated = completedGames.includes(gameName)
      ? completedGames
      : [...completedGames, gameName];

    setCompletedGames(updated);
    localStorage.setItem(`games_${student?.email}`, JSON.stringify(updated));

    const progress = Math.round((updated.length / 4) * 100);
    const updatedStudent = {
      ...student,
      progress: { ...student.progress, games: progress },
    };
    localStorage.setItem("currentStudent", JSON.stringify(updatedStudent));
    const students = JSON.parse(localStorage.getItem("students")) || [];
    localStorage.setItem(
      "students",
      JSON.stringify(students.map((s) => s.email === updatedStudent.email ? updatedStudent : s))
    );
  };

  const handleComplete = (gameName, score) => {
    alert(`🎉 Game complete! Score: ${score}`);
    saveProgress(gameName);
    setActiveGame(null);
  };

  const levelClass =
    level === "basic" ? styles.basicGames
    : level === "intermediate" ? styles.intermediateGames
    : styles.advancedGames;

  const games = [
    { key: "memory", label: "Memory Match", icon: "🧠", desc: "Flip cards and find pairs!" },
    { key: "scramble", label: "Word Scramble", icon: "🔤", desc: "Unscramble the letters!" },
    { key: "dragdrop", label: "Sort It Out", icon: "🗂️", desc: "Match items to categories!" },
    { key: "trivia", label: "Trivia Quiz", icon: "❓", desc: "Test your knowledge!" },
  ];

  return (
    <div className={`${styles.gamesPage} ${levelClass}`}>
      <h1 className={styles.pageTitle}>Games 🎮</h1>

      {!activeGame && (
        <>
          <p className={styles.subtitle}>
            {completedGames.length === 4
              ? "🏆 You've completed all games!"
              : `${completedGames.length} / 4 games completed`}
          </p>

          {/* Progress bar */}
          <div className={styles.progressBox}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.round((completedGames.length / 4) * 100)}%` }}
              />
            </div>
            <p className={styles.progressPercent}>
              {Math.round((completedGames.length / 4) * 100)}%
            </p>
          </div>

          {/* Game cards grid */}
          <div className={styles.gamesGrid}>
            {games.map((g) => (
              <div
                key={g.key}
                className={`${styles.gameCard} ${completedGames.includes(g.key) ? styles.gameDone : ""}`}
                onClick={() => setActiveGame(g.key)}
              >
                <span className={styles.gameIcon}>{g.icon}</span>
                <h3 className={styles.gameLabel}>{g.label}</h3>
                <p className={styles.gameDesc}>{g.desc}</p>
                {completedGames.includes(g.key) && (
                  <span className={styles.doneTag}>✔ Done</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Active game */}
      {activeGame && (
        <div className={styles.activeGame}>
          <button className={styles.backBtn} onClick={() => setActiveGame(null)}>
            ← Back to Games
          </button>

          {activeGame === "memory" && (
            <>
              <h2 className={styles.gameTitle}>🧠 Memory Match</h2>
              <MemoryGame
                cards={data.memory}
                onComplete={(moves) => handleComplete("memory", moves)}
              />
            </>
          )}

          {activeGame === "scramble" && (
            <>
              <h2 className={styles.gameTitle}>🔤 Word Scramble</h2>
              <WordScramble
                words={data.wordScramble}
                onComplete={(score) => handleComplete("scramble", score)}
              />
            </>
          )}

          {activeGame === "dragdrop" && (
            <>
              <h2 className={styles.gameTitle}>🗂️ Sort It Out</h2>
              <DragDropGame
                items={data.dragDrop}
                onComplete={(score) => handleComplete("dragdrop", score)}
              />
            </>
          )}

          {activeGame === "trivia" && (
            <>
              <h2 className={styles.gameTitle}>❓ Trivia Quiz</h2>
              <TriviaGame
                questions={data.trivia}
                onComplete={(score) => handleComplete("trivia", score)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Games;