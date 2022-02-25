import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './NavBar.css';

const Nav = function () {
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

  return (
    <nav>
      <Link to="/" className="Nav__logo" onClick={() => window.scrollTo(0, 0)}>
        Grafter
      </Link>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      {error && <h1>{error}</h1>}
    </nav>
  );
};

export default Nav;
