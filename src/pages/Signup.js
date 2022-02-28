import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import databaseService from '../services/firestore';

const Signup = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);

      signup(emailRef.current.value, passwordRef.current.value).then((data) => {
        const { uid } = data.user;
        databaseService.addUser(uid);
      });

      navigate('/');
    } catch (err) {
      setError('Failed to Signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form__container">
        <form onSubmit={(e) => handleSubmit(e)}>
          {error && <div>{error}</div>}
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email :
              <input type="text" id="email" className="form__control" ref={emailRef} required />
            </label>
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password :
              <input
                type="password"
                id="password"
                className="form__control"
                ref={passwordRef}
                required
              />
            </label>
          </div>
          <div className="form__group">
            <button disabled={loading} type="submit" className="form__button">
              Signup
            </button>
          </div>
        </form>
        <div className="form__login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
