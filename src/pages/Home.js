import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './HomeStyle.css';

const Home = function () {
  const [error] = useState('');

  return (
    <>
      {' '}
      <div className="container">
        {error && <h1>{error}</h1>}
        <div className="homePage__buttons-container">
          <Link to="/jobs">
            <button type="button" className="homePage__buttons">
              Jobs
            </button>
          </Link>
          <Link to="/">
            <button type="button" className="homePage__buttons">
              Sketch
            </button>
          </Link>
          <Link to="/calendar">
            <button type="button" className="homePage__buttons">
              Calendar
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
