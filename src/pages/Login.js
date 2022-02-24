import { useRef, useState } from 'react';

const Login = function () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);
    } catch (err) {
      setError('Failed to login');
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
      </div>
    </div>
  );
};

export default Login;
