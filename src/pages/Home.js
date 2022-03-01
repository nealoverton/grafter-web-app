import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import databaseService from '../services/firestore';

import './HomeStyle.css';

const Home = function () {
  const [error, setError] = useState('');
  const { logout } = useAuth();

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

  const testFunc = async () => {
    const userId = 'EBRklWxRHARgMY3PADB7omUiLuC2';
    await databaseService.addJobDEV(userId);
  };

  return (
    <div className="container">
      <button type="button" onClick={testFunc}>
        HI
      </button>
      {error && <h1>{error}</h1>}
      <div className="homePage__buttons-container">
        <Link to="/jobs">
          <button type="button" className="homePage__buttons">
            Jobs
          </button>
        </Link>
        <Link to="/">
          <button type="button" className="homePage__buttons">
            Sketch
          </button>
        </Link>
        <Link to="/calendar">
          <button type="button" className="homePage__buttons">
            Calendar
          </button>
        </Link>
      </div>
      <div className="footer">
        <button type="button" className="logOut" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Home;
