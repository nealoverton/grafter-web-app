import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Signup = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err);
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
      </div>
    </div>
  );
};

export default Signup;
