import React, { useState } from "react";
import lessons from "../data/lessons.json";
import styles from "./Learn.module.css";

function Learn() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const level = student?.level || "basic";
  const subjects = lessons[level] ? Object.keys(lessons[level]) : [];

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);

  // ── Progress helpers ──────────────────────────────────────────────
  const getTotalLessons = () => {
    if (!lessons[level]) return 0;
    return Object.values(lessons[level]).reduce(
      (total, subjectLessons) => total + subjectLessons.length,
      0
    );
  };

  const getTotalCompleted = (studentData) => {
    const completedLessons = studentData?.progress?.completedLessons || {};
    return Object.values(completedLessons).reduce(
      (total, arr) => total + arr.length,
      0
    );
  };

  const calcLearningProgress = (studentData) => {
    const total = getTotalLessons();
    if (total === 0) return 0;
    return Math.round((getTotalCompleted(studentData) / total) * 100);
  };
  // ─────────────────────────────────────────────────────────────────

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentLessonIndex(0);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLastAnswerCorrect(null);
  };

  const markLessonCompleted = () => {
    if (!student || !student.progress) return;

    const subjectLessons = lessons[level]?.[selectedSubject];
    if (!subjectLessons || !subjectLessons[currentLessonIndex]) return;

    const lessonId = subjectLessons[currentLessonIndex].id;
    const completedLessons = student.progress.completedLessons || {};
    const subjectCompleted = completedLessons[selectedSubject] || [];

    if (!subjectCompleted.includes(lessonId)) {
      const updatedCompletedLessons = {
        ...completedLessons,
        [selectedSubject]: [...subjectCompleted, lessonId],
      };

      const updatedStudent = {
        ...student,
        progress: {
          ...student.progress,
          completedLessons: updatedCompletedLessons,
          learning: calcLearningProgress({
            ...student,
            progress: {
              ...student.progress,
              completedLessons: updatedCompletedLessons,
            },
          }),
        },
      };

      localStorage.setItem("currentStudent", JSON.stringify(updatedStudent));

      const students = JSON.parse(localStorage.getItem("students")) || [];
      const updatedStudents = students.map((s) =>
        s.email === updatedStudent.email ? updatedStudent : s
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  const handleAnswer = (selectedOption) => {
    const lessonQuiz = lessons[level][selectedSubject][currentLessonIndex].quiz;
    const correctAnswer = lessonQuiz[currentQuestionIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    setLastAnswerCorrect(isCorrect);
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestionIndex < lessonQuiz.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setLastAnswerCorrect(null);
      } else {
        alert(
          `Quiz Finished! You scored ${score + (isCorrect ? 1 : 0)} / ${lessonQuiz.length}`
        );

        markLessonCompleted();

        setShowQuiz(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setLastAnswerCorrect(null);

        if (currentLessonIndex < lessons[level][selectedSubject].length - 1) {
          setCurrentLessonIndex((prev) => prev + 1);
        } else {
          alert("You completed all lessons in this subject!");
          setSelectedSubject(null);
          setCurrentLessonIndex(0);
        }
      }
    }, 800);
  };

  const levelClass =
    level === "basic"
      ? styles.basicLearn
      : level === "intermediate"
      ? styles.intermediateLearn
      : styles.advancedLearn;

  // Helper function to get completed lessons count for a subject
  const getCompletedCount = (subject) => {
    return student?.progress?.completedLessons?.[subject]?.length || 0;
  };

  return (
    <div className={`${styles.learnPage} ${levelClass}`}>
      <h1 className={styles.pageTitle}>Learn Page</h1>

      {subjects.length === 0 && (
        <p className={styles.noLessons}>
          Sorry! Lessons for your level ({level}) are not available yet.
        </p>
      )}

      {!selectedSubject && (
        <div className={styles.subjectsGrid}>
          {subjects.map((subject) => {
            const completedCount = getCompletedCount(subject);
            const totalLessons = lessons[level][subject]?.length || 0;
            
            return (
              <button
                key={subject}
                className={`${styles.subjectButton} ${completedCount > 0 ? styles.completed : ''}`}
                onClick={() => handleSubjectSelect(subject)}
              >
                <span className={styles.subjectName}>{subject}</span>
                {completedCount > 0 && (
                  <span className={styles.completionBadge}>
                    <span className={styles.checkmark}>✓</span> {completedCount} done
                  </span>
                )}
                {completedCount === 0 && totalLessons > 0 && (
                  <span className={styles.lessonCount}>
                    {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {selectedSubject && lessons[level][selectedSubject].length > 0 && (
        <div className={styles.lessonContainer}>
          <button
            className={styles.backButton}
            onClick={() => handleSubjectSelect(null)}
          >
            ← Back to Subjects
          </button>

          {!showQuiz && (
            <div>
              <h2 className={styles.lessonTitle}>
                {lessons[level][selectedSubject][currentLessonIndex].title}{" "}
                {student?.progress?.completedLessons?.[selectedSubject]?.includes(
                  lessons[level][selectedSubject][currentLessonIndex].id
                )
                  ? "✔"
                  : ""}
              </h2>
              <p className={styles.lessonContent}>
                {lessons[level][selectedSubject][currentLessonIndex].content}
              </p>

              <div className={styles.lessonButtons}>
                <button
                  onClick={() => setCurrentLessonIndex((prev) => prev - 1)}
                  disabled={currentLessonIndex === 0}
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrentLessonIndex((prev) => prev + 1)}
                  disabled={
                    currentLessonIndex ===
                    lessons[level][selectedSubject].length - 1
                  }
                >
                  Next
                </button>

                {lessons[level][selectedSubject][currentLessonIndex].quiz
                  .length > 0 && (
                  <button onClick={() => setShowQuiz(true)}>
                    Take Quiz 📝
                  </button>
                )}
              </div>
            </div>
          )}

          {showQuiz && (
            <div className={styles.quizContainer}>
              <h3>
                Question {currentQuestionIndex + 1} /{" "}
                {lessons[level][selectedSubject][currentLessonIndex].quiz.length}
              </h3>
              <p>
                {
                  lessons[level][selectedSubject][currentLessonIndex].quiz[
                    currentQuestionIndex
                  ].question
                }
              </p>

              {lessons[level][selectedSubject][currentLessonIndex].quiz[
                currentQuestionIndex
              ].options.map((option, idx) => (
                <button
                  key={idx}
                  className={styles.quizOption}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}

              {lastAnswerCorrect !== null && (
                <p className={lastAnswerCorrect ? styles.correct : styles.incorrect}>
                  {lastAnswerCorrect ? "✔ Correct!" : "✖ Wrong!"}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Learn;