import React, { useState } from "react";
import hygieneData from "../data/hygiene.json";
import styles from "./Hygiene.module.css";

function Hygiene() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const level = student?.level || "basic";
  const habits = hygieneData[level] || [];

  const today = new Date().toDateString();
  const todayKey = `hygiene_${student?.email}_${today}`;
  const savedChecked = JSON.parse(localStorage.getItem(todayKey)) || [];
  const [checked, setChecked] = useState(savedChecked);

  // ── Reset hygiene progress if it's a new day ──────────────────
  const lastHygieneDate = localStorage.getItem(`hygiene_date_${student?.email}`);

  if (lastHygieneDate !== today) {
    const resetStudent = {
      ...student,
      progress: {
        ...student.progress,
        hygiene: 0,
      },
    };
    localStorage.setItem("currentStudent", JSON.stringify(resetStudent));
    localStorage.setItem(`hygiene_date_${student?.email}`, today);

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const updatedStudents = students.map((s) =>
      s.email === resetStudent.email ? resetStudent : s
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  }
  // ──────────────────────────────────────────────────────────────

  const toggleHabit = (id) => {
    const updated = checked.includes(id)
      ? checked.filter((h) => h !== id)
      : [...checked, id];

    setChecked(updated);

    // Save today's checklist
    localStorage.setItem(todayKey, JSON.stringify(updated));

    // Update hygiene progress in student
    const progress = Math.round((updated.length / habits.length) * 100);

    const updatedStudent = {
      ...student,
      progress: {
        ...student.progress,
        hygiene: progress,
      },
    };

    localStorage.setItem("currentStudent", JSON.stringify(updatedStudent));
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const updatedStudents = students.map((s) =>
      s.email === updatedStudent.email ? updatedStudent : s
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const completedCount = checked.length;
  const totalCount = habits.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const levelClass =
    level === "basic"
      ? styles.basicHygiene
      : level === "intermediate"
      ? styles.intermediateHygiene
      : styles.advancedHygiene;

  const getMessage = () => {
    if (progressPercent === 100) return "🎉 Amazing! All habits done today!";
    if (progressPercent >= 60) return "💪 Great job! Keep going!";
    if (progressPercent >= 30) return "😊 Good start! Keep checking off!";
    return "👋 Let's build healthy habits today!";
  };

  return (
    <div className={`${styles.hygienePage} ${levelClass}`}>
      <h1 className={styles.pageTitle}>Hygiene Habits 🧼</h1>
      <p className={styles.subtitle}>{getMessage()}</p>

      {/* Progress bar */}
      <div className={styles.progressBox}>
        <div className={styles.progressHeader}>
          <span>Today's Progress</span>
          <span>{completedCount} / {totalCount} done</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className={styles.progressPercent}>{progressPercent}%</p>
      </div>

      {/* Habits checklist */}
      <div className={styles.habitsGrid}>
        {habits.map((habit) => {
          const isDone = checked.includes(habit.id);
          return (
            <div
              key={habit.id}
              className={`${styles.habitCard} ${isDone ? styles.habitDone : ""}`}
              onClick={() => toggleHabit(habit.id)}
            >
              <span className={styles.habitIcon}>{habit.icon}</span>
              <p className={styles.habitText}>{habit.habit}</p>
              <span className={styles.habitCheck}>
                {isDone ? "✔" : "○"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hygiene;