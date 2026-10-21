import { useState } from 'react';
import Login from './Login.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import './index.css';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  if (!role) return <Login onLogin={setRole} />;
  if (role === 'admin') return <AdminDashboard />;
  return <StudentDashboard />;
}

export default App;
