import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from 'react-calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobsList from './pages/JobsListPage';
import Diary from './pages/Calendar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/diary" element={<Diary />} />
=======
          <Route path="/calendar" element={<Calendar />} />
>>>>>>> 44e6047e300b399dadbea55c702b92d4212e85a1
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
