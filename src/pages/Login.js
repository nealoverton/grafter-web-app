import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import app from '../services/firebase';

const Login = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(app);

    try {
      setError('');
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Failed to Login');
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
              Login
            </button>
          </div>
        </form>
        <div className="form__login-link">
          Need an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
