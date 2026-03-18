import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import lessons from '../data/lessons.json';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [students, setStudents] = useState([]);

  // ── Modal states ─────────────────────────────────────────────
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', level: 'basic' });
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ── Load students ────────────────────────────────────────────
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => window.history.pushState(null, '', window.location.href);
    return () => { window.onpopstate = null; };
  }, []);

  // ── Persist students helper ──────────────────────────────────
  const saveStudents = (updated) => {
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ── CRUD Operations ──────────────────────────────────────────

  // CREATE
  const handleCreate = () => {
    setFormError('');
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('All fields are required.'); return;
    }
    if (students.find((s) => s.email === formData.email)) {
      setFormError('A student with this email already exists.'); return;
    }
    const newStudent = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      level: formData.level,
      progress: { learning: 0, hygiene: 0, games: 0, completedLessons: {} },
    };
    saveStudents([...students, newStudent]);
    setShowCreateModal(false);
    setFormData({ name: '', email: '', password: '', level: 'basic' });
    showSuccess(`✅ Student "${newStudent.name}" created successfully!`);
  };

  // EDIT
  const openEdit = (student) => {
    setSelectedStudent(student);
    setFormData({ name: student.name, email: student.email, password: student.password, level: student.level });
    setFormError('');
    setShowEditModal(true);
  };

  const handleEdit = () => {
    setFormError('');
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('All fields are required.'); return;
    }
    const emailTaken = students.find((s) => s.email === formData.email && s.email !== selectedStudent.email);
    if (emailTaken) { setFormError('Email already used by another student.'); return; }

    const updated = students.map((s) =>
      s.email === selectedStudent.email
        ? { ...s, name: formData.name, email: formData.email, password: formData.password, level: formData.level }
        : s
    );
    saveStudents(updated);

    // Update currentStudent in localStorage if it's the same user
    const current = JSON.parse(localStorage.getItem('currentStudent'));
    if (current?.email === selectedStudent.email) {
      localStorage.setItem('currentStudent', JSON.stringify({ ...current, name: formData.name, email: formData.email, level: formData.level }));
    }

    setShowEditModal(false);
    showSuccess(`✅ Student "${formData.name}" updated successfully!`);
  };

  // DELETE
  const openDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    const updated = students.filter((s) => s.email !== selectedStudent.email);
    saveStudents(updated);

    // Clear their localStorage data
    localStorage.removeItem(`games_${selectedStudent.email}`);
    localStorage.removeItem(`hygiene_date_${selectedStudent.email}`);

    const current = JSON.parse(localStorage.getItem('currentStudent'));
    if (current?.email === selectedStudent.email) localStorage.removeItem('currentStudent');

    setShowDeleteConfirm(false);
    showSuccess(`🗑️ Student "${selectedStudent.name}" deleted.`);
  };

  // RESET PROGRESS
  const openReset = (student) => {
    setSelectedStudent(student);
    setShowResetConfirm(true);
  };

  const handleReset = () => {
    const updated = students.map((s) =>
      s.email === selectedStudent.email
        ? { ...s, progress: { learning: 0, hygiene: 0, games: 0, completedLessons: {} } }
        : s
    );
    saveStudents(updated);

    // Clear games and hygiene localStorage for this student
    localStorage.removeItem(`games_${selectedStudent.email}`);
    localStorage.removeItem(`hygiene_date_${selectedStudent.email}`);

    const current = JSON.parse(localStorage.getItem('currentStudent'));
    if (current?.email === selectedStudent.email) {
      localStorage.setItem('currentStudent', JSON.stringify({
        ...current,
        progress: { learning: 0, hygiene: 0, games: 0, completedLessons: {} }
      }));
    }

    setShowResetConfirm(false);
    showSuccess(`🔄 Progress reset for "${selectedStudent.name}".`);
  };

  // PROMOTE LEVEL
  const promoteLevel = (student) => {
    const levels = ['basic', 'intermediate', 'advanced'];
    const currentIndex = levels.indexOf(student.level);
    if (currentIndex === levels.length - 1) return;
    const newLevel = levels[currentIndex + 1];
    const updated = students.map((s) =>
      s.email === student.email ? { ...s, level: newLevel } : s
    );
    saveStudents(updated);
    showSuccess(`⬆️ "${student.name}" promoted to ${newLevel}!`);
  };

  // ── Helpers ──────────────────────────────────────────────────
  const totalUsers = students.length;
  const byLevel = { basic: 0, intermediate: 0, advanced: 0 };
  students.forEach((s) => { if (byLevel[s.level] !== undefined) byLevel[s.level]++; });

  const avgProgress = (key) => {
    if (!totalUsers) return 0;
    return Math.round(students.reduce((sum, s) => sum + (s.progress?.[key] || 0), 0) / totalUsers);
  };

  const calcLearningProgress = (student) => {
    const level = student.level || 'basic';
    if (!lessons[level]) return 0;
    const total = Object.values(lessons[level]).reduce((t, arr) => t + arr.length, 0);
    if (!total) return 0;
    const completed = Object.values(student.progress?.completedLessons || {})
      .reduce((t, arr) => t + arr.length, 0);
    return Math.round((completed / total) * 100);
  };

  const getLastActive = (student) => {
    return localStorage.getItem(`hygiene_date_${student.email}`) || 'Never';
  };

  const getLevelBadge = (level) => {
    if (level === 'basic') return { label: 'Basic', color: '#e91e8c' };
    if (level === 'intermediate') return { label: 'Intermediate', color: '#00838f' };
    return { label: 'Advanced', color: '#a78bfa' };
  };

  const MiniBar = ({ value, color }) => (
    <div style={{ background: '#e0e0e033', borderRadius: 50, height: 8, width: '100%', overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 50, transition: 'width 0.4s ease' }} />
    </div>
  );

  const StatCard = ({ icon, label, value, sub }) => (
    <div className={`${styles.statCard} ${darkMode ? styles.statDark : styles.statLight}`}>
      <span className={styles.statIcon}>{icon}</span>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
      {sub && <p className={styles.statSub}>{sub}</p>}
    </div>
  );

  // ── Modal component ──────────────────────────────────────────
  const Modal = ({ title, onClose, onConfirm, confirmLabel, confirmColor, children }) => (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${darkMode ? styles.statDark : styles.statLight}`}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button
            className={styles.confirmBtn}
            style={{ background: confirmColor || '#7c6af7' }}
            onClick={onConfirm}
          >{confirmLabel}</button>
        </div>
      </div>
    </div>
  );

  // ── Form fields ──────────────────────────────────────────────
  const FormFields = ({ showPassword = true }) => (
    <>
      <div className={styles.formGroup}>
        <label>Full Name</label>
        <input className={`${styles.formInput} ${darkMode ? styles.inputDark : styles.inputLight}`}
          value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Student name" />
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input className={`${styles.formInput} ${darkMode ? styles.inputDark : styles.inputLight}`}
          type="email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="student@email.com" />
      </div>
      {showPassword && (
        <div className={styles.formGroup}>
          <label>Password</label>
          <input className={`${styles.formInput} ${darkMode ? styles.inputDark : styles.inputLight}`}
            type="password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password" />
        </div>
      )}
      <div className={styles.formGroup}>
        <label>Level</label>
        <select className={`${styles.formInput} ${darkMode ? styles.inputDark : styles.inputLight}`}
          value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      {formError && <p className={styles.formError}>{formError}</p>}
    </>
  );

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.dark : styles.light}`}>

      {/* ── Sidebar ── */}
      <div className={styles.sidebar}>
        <div className={styles.logo}><span>👑</span><span>Admin</span></div>
        {[
          { key: 'overview', icon: '📊', label: 'Overview' },
          { key: 'students', icon: '👦', label: 'Students' },
          { key: 'learn', icon: '📚', label: 'Learning' },
          { key: 'hygiene', icon: '🧼', label: 'Hygiene' },
          { key: 'games', icon: '🎮', label: 'Games' },
        ].map((item) => (
          <button key={item.key} onClick={() => setTab(item.key)}
            style={{ fontWeight: tab === item.key ? 800 : 600, color: tab === item.key ? '#a78bfa' : undefined }}>
            {item.icon} {item.label}
          </button>
        ))}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button onClick={() => { localStorage.removeItem('isAdmin'); window.location.replace('/admin/login'); }}>
          🚪 Logout
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className={styles.mainContent}>

        {/* Success message */}
        {successMsg && <div className={styles.successBanner}>{successMsg}</div>}

        {/* ══ OVERVIEW TAB ══ */}
        {tab === 'overview' && (
          <div>
            <h1>📊 Overview</h1>
            <p className={styles.welcomeText}>Welcome back, Admin 👑</p>
            <div className={styles.statsGrid}>
              <StatCard icon="👥" label="Total Users" value={totalUsers} />
              <StatCard icon="🟢" label="Basic" value={byLevel.basic}
                sub={`${totalUsers ? Math.round((byLevel.basic / totalUsers) * 100) : 0}% of users`} />
              <StatCard icon="🔵" label="Intermediate" value={byLevel.intermediate}
                sub={`${totalUsers ? Math.round((byLevel.intermediate / totalUsers) * 100) : 0}% of users`} />
              <StatCard icon="🟣" label="Advanced" value={byLevel.advanced}
                sub={`${totalUsers ? Math.round((byLevel.advanced / totalUsers) * 100) : 0}% of users`} />
            </div>

            <h2 className={styles.sectionTitle}>📈 Average Progress</h2>
            <div className={`${styles.avgCard} ${darkMode ? styles.statDark : styles.statLight}`}>
              {[
                { label: '📚 Learning', value: avgProgress('learning'), color: '#4caf50' },
                { label: '🧼 Hygiene', value: avgProgress('hygiene'), color: '#00bcd4' },
                { label: '🎮 Games', value: avgProgress('games'), color: '#a78bfa' },
              ].map((item) => (
                <div key={item.label} className={styles.avgRow}>
                  <span className={styles.avgLabel}>{item.label}</span>
                  <div style={{ flex: 1 }}><MiniBar value={item.value} color={item.color} /></div>
                  <span className={styles.avgValue}>{item.value}%</span>
                </div>
              ))}
            </div>

            <h2 className={styles.sectionTitle}>🕐 Recent Users</h2>
            <div className={`${styles.tableWrap} ${darkMode ? styles.statDark : styles.statLight}`}>
              <table className={styles.table}>
                <thead><tr><th>Name</th><th>Level</th><th>Learning</th><th>Last Active</th></tr></thead>
                <tbody>
                  {students.slice(0, 5).map((s) => {
                    const badge = getLevelBadge(s.level);
                    return (
                      <tr key={s.email}>
                        <td>{s.name}</td>
                        <td><span style={{ color: badge.color, fontWeight: 700 }}>{badge.label}</span></td>
                        <td>{calcLearningProgress(s)}%</td>
                        <td>{getLastActive(s)}</td>
                      </tr>
                    );
                  })}
                  {!students.length && <tr><td colSpan={4} style={{ textAlign: 'center', opacity: 0.5 }}>No users yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ STUDENTS TAB ══ */}
        {tab === 'students' && (
          <div>
            <div className={styles.tabHeader}>
              <div>
                <h1>👦 Students</h1>
                <p className={styles.welcomeText}>{totalUsers} registered user{totalUsers !== 1 ? 's' : ''}</p>
              </div>
              <button className={styles.createBtn} onClick={() => {
                setFormData({ name: '', email: '', password: '', level: 'basic' });
                setFormError('');
                setShowCreateModal(true);
              }}>+ Add Student</button>
            </div>

            <div className={`${styles.tableWrap} ${darkMode ? styles.statDark : styles.statLight}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>Level</th>
                    <th>Learning</th><th>Hygiene</th><th>Games</th>
                    <th>Last Active</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const badge = getLevelBadge(s.level);
                    const levels = ['basic', 'intermediate', 'advanced'];
                    const canPromote = levels.indexOf(s.level) < levels.length - 1;
                    return (
                      <tr key={s.email}>
                        <td style={{ fontWeight: 700 }}>{s.name}</td>
                        <td style={{ fontSize: '0.85rem', opacity: 0.7 }}>{s.email}</td>
                        <td><span style={{ color: badge.color, fontWeight: 700 }}>{badge.label}</span></td>
                        <td>{calcLearningProgress(s)}%</td>
                        <td>{s.progress?.hygiene || 0}%</td>
                        <td>{s.progress?.games || 0}%</td>
                        <td style={{ fontSize: '0.85rem' }}>{getLastActive(s)}</td>
                        <td>
                          <div className={styles.actionBtns}>
                            {/* Edit */}
                            <button className={`${styles.actionBtn} ${styles.editBtn}`}
                              onClick={() => openEdit(s)} title="Edit">✏️</button>
                            {/* Promote */}
                            <button className={`${styles.actionBtn} ${styles.promoteBtn}`}
                              onClick={() => promoteLevel(s)}
                              disabled={!canPromote}
                              title={canPromote ? 'Promote level' : 'Already at highest level'}
                              style={{ opacity: canPromote ? 1 : 0.3 }}>⬆️</button>
                            {/* Reset */}
                            <button className={`${styles.actionBtn} ${styles.resetBtn}`}
                              onClick={() => openReset(s)} title="Reset progress">🔄</button>
                            {/* Delete */}
                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`}
                              onClick={() => openDelete(s)} title="Delete student">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {!students.length && (
                    <tr><td colSpan={8} style={{ textAlign: 'center', opacity: 0.5 }}>No students yet — add one!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ LEARNING TAB ══ */}
        {tab === 'learn' && (
          <div>
            <h1>📚 Learning</h1>
            <p className={styles.welcomeText}>Learning progress per student</p>
            <div className={styles.cardsWrap}>
              {students.map((s) => {
                const progress = calcLearningProgress(s);
                const badge = getLevelBadge(s.level);
                const completedLessons = s.progress?.completedLessons || {};
                return (
                  <div key={s.email} className={`${styles.userCard} ${darkMode ? styles.statDark : styles.statLight}`}>
                    <div className={styles.userCardHeader}>
                      <span style={{ fontWeight: 800 }}>{s.name}</span>
                      <span style={{ color: badge.color, fontWeight: 700, fontSize: '0.85rem' }}>{badge.label}</span>
                    </div>
                    <MiniBar value={progress} color="#4caf50" />
                    <p style={{ fontSize: '0.85rem', marginTop: 6, fontWeight: 700 }}>{progress}% complete</p>
                    <div style={{ marginTop: 10 }}>
                      {Object.entries(completedLessons).map(([subject, ids]) => (
                        <p key={subject} style={{ fontSize: '0.8rem', opacity: 0.75 }}>
                          {subject}: {ids.length} lesson{ids.length !== 1 ? 's' : ''} done
                        </p>
                      ))}
                      {!Object.keys(completedLessons).length && (
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>No lessons completed yet</p>
                      )}
                    </div>
                    {/* Reset button */}
                    <button className={`${styles.actionBtn} ${styles.resetBtn}`}
                      style={{ marginTop: 12, fontSize: '0.8rem', padding: '6px 12px', borderRadius: 8 }}
                      onClick={() => openReset(s)}>🔄 Reset Progress</button>
                  </div>
                );
              })}
              {!students.length && <p style={{ opacity: 0.5 }}>No users yet</p>}
            </div>
          </div>
        )}

        {/* ══ HYGIENE TAB ══ */}
        {tab === 'hygiene' && (
          <div>
            <h1>🧼 Hygiene</h1>
            <p className={styles.welcomeText}>Daily hygiene habits progress</p>
            <div className={styles.cardsWrap}>
              {students.map((s) => {
                const badge = getLevelBadge(s.level);
                return (
                  <div key={s.email} className={`${styles.userCard} ${darkMode ? styles.statDark : styles.statLight}`}>
                    <div className={styles.userCardHeader}>
                      <span style={{ fontWeight: 800 }}>{s.name}</span>
                      <span style={{ color: badge.color, fontWeight: 700, fontSize: '0.85rem' }}>{badge.label}</span>
                    </div>
                    <MiniBar value={s.progress?.hygiene || 0} color="#00bcd4" />
                    <p style={{ fontSize: '0.85rem', marginTop: 6, fontWeight: 700 }}>{s.progress?.hygiene || 0}% today</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: 4 }}>Last active: {getLastActive(s)}</p>
                  </div>
                );
              })}
              {!students.length && <p style={{ opacity: 0.5 }}>No users yet</p>}
            </div>
          </div>
        )}

        {/* ══ GAMES TAB ══ */}
        {tab === 'games' && (
          <div>
            <h1>🎮 Games</h1>
            <p className={styles.welcomeText}>Games progress per student</p>
            <div className={styles.cardsWrap}>
              {students.map((s) => {
                const completedGames = JSON.parse(localStorage.getItem(`games_${s.email}`)) || [];
                const badge = getLevelBadge(s.level);
                const gameNames = { memory: '🧠 Memory', scramble: '🔤 Scramble', dragdrop: '🗂️ Sort It', trivia: '❓ Trivia' };
                return (
                  <div key={s.email} className={`${styles.userCard} ${darkMode ? styles.statDark : styles.statLight}`}>
                    <div className={styles.userCardHeader}>
                      <span style={{ fontWeight: 800 }}>{s.name}</span>
                      <span style={{ color: badge.color, fontWeight: 700, fontSize: '0.85rem' }}>{badge.label}</span>
                    </div>
                    <MiniBar value={s.progress?.games || 0} color="#a78bfa" />
                    <p style={{ fontSize: '0.85rem', marginTop: 6, fontWeight: 700 }}>{s.progress?.games || 0}% complete</p>
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {Object.entries(gameNames).map(([key, label]) => (
                        <span key={key} style={{
                          fontSize: '0.78rem', padding: '3px 10px', borderRadius: 50,
                          background: completedGames.includes(key) ? '#a78bfa22' : '#e0e0e022',
                          color: completedGames.includes(key) ? '#a78bfa' : '#6b7280',
                          fontWeight: 700, border: `1px solid ${completedGames.includes(key) ? '#a78bfa' : '#e0e0e044'}`
                        }}>
                          {label} {completedGames.includes(key) ? '✔' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {!students.length && <p style={{ opacity: 0.5 }}>No users yet</p>}
            </div>
          </div>
        )}
      </div>

      {/* ══ CREATE MODAL ══ */}
      {showCreateModal && (
        <Modal title="➕ Add New Student" onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreate} confirmLabel="Create Student" confirmColor="#4caf50">
          <FormFields showPassword={true} />
        </Modal>
      )}

      {/* ══ EDIT MODAL ══ */}
      {showEditModal && (
        <Modal title="✏️ Edit Student" onClose={() => setShowEditModal(false)}
          onConfirm={handleEdit} confirmLabel="Save Changes" confirmColor="#7c6af7">
          <FormFields showPassword={true} />
        </Modal>
      )}

      {/* ══ DELETE CONFIRM ══ */}
      {showDeleteConfirm && (
        <Modal title="🗑️ Delete Student" onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete} confirmLabel="Yes, Delete" confirmColor="#f87171">
          <p style={{ lineHeight: 1.6 }}>
            Are you sure you want to delete <strong>{selectedStudent?.name}</strong>?
            This will permanently remove their account and all progress data.
          </p>
        </Modal>
      )}

      {/* ══ RESET CONFIRM ══ */}
      {showResetConfirm && (
        <Modal title="🔄 Reset Progress" onClose={() => setShowResetConfirm(false)}
          onConfirm={handleReset} confirmLabel="Yes, Reset" confirmColor="#f59e0b">
          <p style={{ lineHeight: 1.6 }}>
            Are you sure you want to reset all progress for <strong>{selectedStudent?.name}</strong>?
            Their learning, hygiene, and games progress will be set back to 0.
          </p>
        </Modal>
      )}

    </div>
  );
}

export default AdminDashboard;