import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = function () {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);

      await resetPassword(emailRef.current.value);
    } catch (err) {
      console.log(err);
      setError('Failed to resetPassword');
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
            <button disabled={loading} type="submit" className="form__button btnSmall">
              Reset Password
            </button>
          </div>
        </form>
        <div className="form__login-link">
          <Link to="/login">Login?</Link>
        </div>
        <div className="form__login-link">
          Need an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
