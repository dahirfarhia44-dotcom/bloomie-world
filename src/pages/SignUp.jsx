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

const newStudent = {
...student,
level: level
};

console.log('Student registered:', newStudent);

navigate('/home');

};

  return (
    <div className={styles.auth}>
        <h2>Student Sign Up</h2>

        <form onSubmit={handleSubmit}>
            <input 
            type='text'
            placeholder='Name'
            value={student.name}
            onChange={(e) => setStudent({...student, name: e.target.value})}
            required
            />

            <input 
            type='email'
            placeholder='Email'
            value={student.email}
            onChange={(e) => setStudent({...student, email: e.target.value})}
            required
            />

            <input 
            type='password'
            placeholder='Password'
            value={student.password}
            onChange={(e) => setStudent({...student, password: e.target.value})}
            required
            />
            <select
            value={student.grade}
            onChange={(e) => setStudent({...student, grade: e.target.value})}
            required
            >
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

        </form>
    </div>
  )
}

export default SignUp;