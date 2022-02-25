import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = function () {
  const [error, setError] = useState('');
  const { logout, currentUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Failed to log out');
    }
  };

  return (
    <div className="container">
      <h1>HI {currentUser && currentUser.email}</h1>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
      {error && <h1>{error}</h1>}
      <div className="homePage__buttons">
        <Link to="/jobs">
          <button type="button">Jobs</button>
        </Link>
        <button type="button">Sketch</button>
        <Link to="/calendar">
          <button type="button">Calendar</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
