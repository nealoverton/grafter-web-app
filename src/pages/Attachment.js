import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Attachment.css';

export const Attachment = function ({ attachment, deleteAttachment, index }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <li key={attachment.url} className={isFullscreen ? 'fullscreen' : 'Attachment__container'}>
      <button
        type="button"
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="Attachment__button"
      >
        <img
          src={attachment.url}
          alt="Attached job info"
          className={isFullscreen ? 'fullscreen' : 'Attachment__img'}
        />
        <FaTimes className="Attachment__delete-icon" onClick={() => deleteAttachment(index)} />
      </button>
    </li>
  );
};

export default Attachment;
