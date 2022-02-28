import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { databaseService } from '../services/firestore';

import './HomeStyle.css';

const Home = function () {
  const [error, setError] = useState('');
  const { logout, currentUser } = useAuth();

  const navigate = useNavigate();

  const addJob = () => {
    const { uid } = currentUser;
    databaseService.getJobs(uid).then((data) => {
      console.log(data);
    });
  };

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
      <h1 className="Header">Welcome!</h1>
      <button type="button" onClick={addJob}>
        HI
      </button>
      {error && <h1>{error}</h1>}
      <div className="homePage__buttons">
        <Link to="/jobs">
          <button type="button" className="JobsButton">
            Jobs
          </button>
        </Link>
        <Link to="/">
          <button type="button" className="sketch">
            Sketch
          </button>
        </Link>
        <Link to="/calendar">
          <button type="button" className="calendar">
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
