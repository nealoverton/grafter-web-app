import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import databaseService from '../services/firestore';
import './Forms.css';

const UpdateProfile = function () {
  const passwordRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState({});
  const { updateUserPassword } = useAuth();

  useEffect(() => {
    databaseService.getUser().then((data) => {
      const userData = { ...data };
      setUser(userData);
    });
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('');
    setLoading(true);
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const company = companyRef.current.value;

    if (!(password || name || company)) return;

    try {
      if (password.length > 0) {
        await updateUserPassword(password);
      }
      if (name.length > 0 && company.length > 0) {
        await databaseService.updateUser({ name, company });
      } else if (name.length > 0) {
        await databaseService.updateUser({ name });
      }
      if (company.length > 0) {
        await databaseService.updateUser({ company });
      }
      setError('');
      setSuccess('Update successful');
      setLoading(false);
    } catch (err) {
      setError('Failed to Update details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form__container">
        <form onSubmit={(e) => handleSubmit(e)} className="form__element">
          {error && <div>{error}</div>}
          {success && <div>{success}</div>}
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Name :
            </label>
            <input
              type="text"
              id="name"
              className="form__control"
              ref={nameRef}
              placeholder={user.name}
            />
          </div>
          <div className="form__group">
            <label htmlFor="company" className="form__label">
              Company :
            </label>
            <input
              type="text"
              id="company"
              className="form__control"
              ref={companyRef}
              placeholder={user.company}
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password :
            </label>
            <input type="password" id="password" className="form__control" ref={passwordRef} />
          </div>
          <div className="form__group">
            <button disabled={loading} type="submit" className="form__button btnSmall">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
