import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './NavBar.css';

const Nav = function () {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return currentUser ? (
    <nav>
      <Link to="/" className="Nav__logo" onClick={() => window.scrollTo(0, 0)}>
        Grafter
      </Link>

      {error && <h1>{error}</h1>}

      <FaUserAlt className="Nav__user-icon" onClick={() => setDropdownOpen(!dropdownOpen)} />
      <div className={dropdownOpen ? 'Nav__dropdown' : 'Nav__dropdown hidden'}>
        <p className="Nav__dropdown__email">{currentUser.email}</p>

        <Link to="/user" className="Nav__dropdown__account">
          {' '}
          My Account{' '}
        </Link>

        <button className="Nav__dropdown__logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  ) : (
    <nav className="Nav__logo">Welcome to Grafter</nav>
  );
};

export default Nav;
