import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobsList from './pages/JobsListPage';
import Nav from './components/layout/Navbar';
import Job from './pages/Job';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/:jobId"
            element={
              <PrivateRoute>
                <Job />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
