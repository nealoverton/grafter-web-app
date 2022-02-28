import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobsList from './pages/JobsListPage';
import Nav from './components/layout/Navbar';
import Job from './pages/Job';
import { AuthProvider } from './contexts/AuthContext';
import MaterialsList from './pages/MaterialsList';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/job" element={<Job />} />
          <Route path="/materials" element={<MaterialsList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
