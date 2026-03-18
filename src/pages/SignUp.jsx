import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css'

function SignUp() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
      name: '',
      email: '',
      password: '',
      grade: '',
      level: ''
  });

  const getLevel = (grade) => {
      if (grade >= 1 && grade <= 3) return 'basic';
      if (grade >= 4 && grade <= 6) return 'intermediate';
      if (grade >= 7) return 'advanced';
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const level = getLevel(Number(student.grade));

      // Initialize progress with completedLessons
      const newStudent = {
          ...student,
          level: level,
          id: Date.now(),
          progress: {
              learning: 0,
              hygiene: 0,
              games: 0,
              completedLessons: {
                  Math: [],
                  English: [],
                  Science: [],
                  LifeSkills: []
              }
          }
      };

      const existing = JSON.parse(localStorage.getItem('students')) || [];
      const updatedStudents = [...existing, newStudent];
      localStorage.setItem('students', JSON.stringify(updatedStudents));

      // Save currentStudent to session
      localStorage.setItem('currentStudent', JSON.stringify(newStudent));

      window.location.replace('/login');
  };

  return (
      <div className={styles.auth}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Name' value={student.name} onChange={(e) => setStudent({...student, name: e.target.value})} required />
              <input type='email' placeholder='Email' value={student.email} onChange={(e) => setStudent({...student, email: e.target.value})} required />
              <input type='password' placeholder='Password' value={student.password} onChange={(e) => setStudent({...student, password: e.target.value})} required />
              <select value={student.grade} onChange={(e) => setStudent({...student, grade: e.target.value})} required>
                  <option value="">Select Grade</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                  <option value="4">Grade 4</option>
                  <option value="5">Grade 5</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
              </select>
              <button type='submit'>Sign Up</button>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                  Already have an account?{' '}
                  <span onClick={() => navigate('/login', { replace: true })} style={{ color: '#66a6ff', cursor: 'pointer', fontWeight: 'bold' }}>Log In</span>
              </p>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                  <span onClick={() => {
                      localStorage.removeItem('currentStudent');
                      localStorage.removeItem('isAdmin');
                      window.location.replace('/');
                  }} style={{ color: '#66a6ff', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Home</span>
              </p>
          </form>
      </div>
  )
}

export default SignUp;