import Webcam from 'react-webcam';
import React from 'react';
import { FaArrowCircleLeft, FaCircle } from 'react-icons/fa';
import './Webcam.css';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment' //uses rear camera on phone, webcam on pc
};

export const WebcamCapture = function ({ handleCapture, setCameraIsOpen }) {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    handleCapture(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Webcam__container">
      <FaArrowCircleLeft onClick={() => setCameraIsOpen(false)} className="Webcam__back-arrow" />
      <FaCircle className="Webcam__shutter-icon" onClick={capture} />
      <Webcam
        className="Webcam__view"
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
