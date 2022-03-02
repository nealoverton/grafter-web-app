import './Footer.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const Footer = function (props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const { onJobPage } = props;

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
    <div className={onJobPage ? 'tests' : 'footer'}>
      {error && <span>{error}</span>}
      <div className="logout__button-container">
        <button type="button" onClick={handleLogout} className="logout__button">
          logout
        </button>
      </div>
      <div>
        Project by:
        <div className="footer__creators-container">
          <div>Jimmy Hockless</div>
          <div>Jordon Richmond</div>
          <div>Neal Overton</div>
        </div>
        <div className="footer__creators-container">
          <div>James Barnes</div>
          <div>John Barrett</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
