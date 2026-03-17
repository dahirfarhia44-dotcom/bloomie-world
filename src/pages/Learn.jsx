import React, { useState } from "react";
import lessons from "../data/lessons.json";
import styles from "./Learn.module.css";

function Learn() {
  // Get student and level
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const level = student?.level || "basic";

  // Get subjects for the student level, or empty array if none
  const subjects = lessons[level] ? Object.keys(lessons[level]) : [];

  // Component state
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null); // null / true / false

  // Handle selecting a subject
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentLessonIndex(0);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLastAnswerCorrect(null);
  };

  // Handle quiz answers
  const handleAnswer = (selectedOption) => {
    const lessonQuiz =
      lessons[level][selectedSubject][currentLessonIndex].quiz;
    const correctAnswer = lessonQuiz[currentQuestionIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    setLastAnswerCorrect(isCorrect);
    if (isCorrect) setScore((prev) => prev + 1);

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < lessonQuiz.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setLastAnswerCorrect(null);
      } else {
        alert(
          `Quiz Finished! You scored ${score + (isCorrect ? 1 : 0)} / ${
            lessonQuiz.length
          }`
        );

        // Update student progress in localStorage
        if (student && student.progress) {
          student.progress.learning = Math.min(student.progress.learning + 20, 100);
          localStorage.setItem("currentStudent", JSON.stringify(student));
        }

        setShowQuiz(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setLastAnswerCorrect(null);

        // Auto-move to next lesson or back to subjects
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

  // Determine theme class based on level
  const levelClass =
    level === "basic"
      ? styles.basicLearn
      : level === "intermediate"
      ? styles.intermediateLearn
      : styles.advancedLearn;

  return (
    <div className={`${styles.learnPage} ${levelClass}`}>
      <h1>Learn Page</h1>

      {/* No lessons available */}
      {subjects.length === 0 && (
        <p className={styles.noLessons}>
          Sorry! Lessons for your level ({level}) are not available yet.
        </p>
      )}

      {/* Subject selection */}
      {!selectedSubject &&
        subjects.map((subject) => (
          <button
            key={subject}
            className={styles.subjectButton}
            onClick={() => handleSubjectSelect(subject)}
          >
            {subject}
          </button>
        ))}

      {/* Lesson & Quiz */}
      {selectedSubject &&
        lessons[level][selectedSubject].length > 0 && (
          <div className={styles.lessonContainer}>
            <button
              className={styles.backButton}
              onClick={() => handleSubjectSelect(null)}
            >
              ← Back to Subjects
            </button>

            {/* Current lesson */}
            {!showQuiz && (
              <div>
                <h2 className={styles.lessonTitle}>
                  {lessons[level][selectedSubject][currentLessonIndex].title}
                </h2>
                <p className={styles.lessonContent}>
                  {lessons[level][selectedSubject][currentLessonIndex].content}
                </p>

                {/* Navigation */}
                <div className={styles.lessonButtons}>
                  <button
                    onClick={() =>
                      setCurrentLessonIndex((prev) => prev - 1)
                    }
                    disabled={currentLessonIndex === 0}
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setCurrentLessonIndex((prev) => prev + 1)
                    }
                    disabled={
                      currentLessonIndex ===
                      lessons[level][selectedSubject].length - 1
                    }
                  >
                    Next
                  </button>

                  {/* Start quiz */}
                  {lessons[level][selectedSubject][currentLessonIndex].quiz
                    .length > 0 && (
                    <button onClick={() => setShowQuiz(true)}>
                      Take Quiz 📝
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quiz */}
            {showQuiz && (
              <div className={styles.quizContainer}>
                <h3>
                  Question {currentQuestionIndex + 1} /{" "}
                  {
                    lessons[level][selectedSubject][currentLessonIndex].quiz
                      .length
                  }
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
                  <p
                    className={
                      lastAnswerCorrect
                        ? styles.correct
                        : styles.incorrect
                    }
                  >
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