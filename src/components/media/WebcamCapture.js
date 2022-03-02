import Webcam from 'react-webcam';
import React, { useState } from 'react';
import uuid from 'react-uuid';
import { FaArrowCircleLeft, FaCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Webcam.css';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment' //uses rear camera on phone, webcam on pc
};

export const WebcamCapture = function ({ handleCapture, setCameraIsOpen }) {
  const [image, setImage] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const handleImageChoice = (isSaved = false) => {
    if (isSaved) {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], uuid(), { type: 'image/png' });
          handleCapture(file);
        });
    }

    setImage(null);
  };

  return image !== null ? (
    <div className="Webcam__container">
      <img src={image} alt="captured snap" className="Webcam__centered-image" />
      <div className="Webcam__save-photo">
        <FaTimesCircle className="Webcam__save-photo__icon" onClick={handleImageChoice} />
        <h2 className="Webcam__save-photo__text">Attach photo?</h2>
        <FaCheckCircle className="Webcam__save-photo__icon" onClick={handleImageChoice} />
      </div>
    </div>
  ) : (
    <div className="Webcam__container">
      <FaArrowCircleLeft onClick={() => setCameraIsOpen(false)} className="Webcam__back-arrow" />
      <FaCircle className="Webcam__shutter-icon" onClick={capture} />
      <Webcam
        className="Webcam__centered-image"
        audio={false}
        ref={webcamRef}
        height={window.outerHeight}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        forceScreenshotSourceSize="true"
      />
    </div>
  );
};

export default WebcamCapture;
