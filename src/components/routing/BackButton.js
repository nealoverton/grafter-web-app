import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './BackButton.css';

const BackButton = function () {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleGoBack} className="backButton__BackButton">
      <IoArrowBack />
    </button>
  );
};

export default BackButton;
