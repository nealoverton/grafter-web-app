import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import databaseService from '../services/firestore';
import './Forms.css';

const Signup = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);

      signup(emailRef.current.value, passwordRef.current.value)
        .then((data) => {
          const { uid } = data.user;
          return databaseService.addUser(uid, nameRef.current.value, companyRef.current.value);
        })
        .then(() => {
          navigate('/');
        });
    } catch (err) {
      setError('Failed to Signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form__container">
        <form onSubmit={(e) => handleSubmit(e)} className="form__element">
          {error && <div>{error}</div>}
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email :
            </label>
            <input type="text" id="email" className="form__control" ref={emailRef} required />
          </div>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Name :
            </label>
            <input type="text" id="name" className="form__control" ref={nameRef} required />
          </div>
          <div className="form__group">
            <label htmlFor="company" className="form__label">
              Company :
            </label>
            <input type="text" id="company" className="form__control" ref={companyRef} required />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password :
            </label>
            <input
              type="password"
              id="password"
              className="form__control"
              ref={passwordRef}
              required
            />
          </div>
          <div className="form__group">
            <button disabled={loading} type="submit" className="form__button btnSmall">
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
