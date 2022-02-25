import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
