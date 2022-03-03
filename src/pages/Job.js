import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCamera, FaImage, FaArrowCircleLeft } from 'react-icons/fa';
import MaterialsList from './MaterialsList';
import { WebcamCapture } from '../components/media/WebcamCapture';
import './Job.css';
import databaseService from '../services/firestore';
import Attachment from './Attachment';
import DatePicker from '../components/forms/Datepicker';
import Footer from '../components/layout/Footer';

const Job = function () {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // const [job, setJob] = useState({});
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [firstAddressLine, setfirstAddressLine] = useState('');
  const [secondAddressLine, setSecondAddressLine] = useState('');
  const [thirdAddressLine, setThirdAddressLine] = useState('');
  const [postcode, setPostcode] = useState('');
  const [startDate, setStartDate] = useState('Pick start ');
  const [endDate, setEndDate] = useState(' end dates');
  const [attachments, setAttachments] = useState([]);

  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const titleRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(async () => {
    // window.scrollTo(0, 0);

    notesRef.current.style.height = 'inherit';
    notesRef.current.style.height = `${notesRef.current.scrollHeight + 10}px`;

    console.log(notesRef.current.scrollHeight);

    const dbJob = await databaseService.getJob(jobId);

    // setJob(dbJob);
    setTitle(dbJob.name);
    setNotes(dbJob.jobNotes);
    setfirstAddressLine(dbJob.firstAddressLine);
    setSecondAddressLine(dbJob.secondAddressLine);
    setThirdAddressLine(dbJob.thirdAddressLine);
    setPostcode(dbJob.postcode);
    if (dbJob.jobStartDate) setStartDate(dbJob.jobStartDate);
    if (dbJob.jobEndDate) setEndDate(dbJob.jobEndDate);

    const dbJobImages = await databaseService.getImages(jobId);
    setAttachments(dbJobImages);
  }, []);

  useEffect(() => {
    const imageTimout = () => {
      databaseService
        .getImages(jobId)
        .then((dbJobImages) => {
          setAttachments(dbJobImages);
        })
        .then(() => {
          setLoading(false);
        });
    };
    // to account for time needed for image to be uploaded to cloud
    setTimeout(imageTimout, 2000);
  }, [loading]);

  const updateJob = (data) => {
    const tempJob = {};
    tempJob.name = title;
    tempJob.firstAddressLine = firstAddressLine;
    tempJob.secondAddressLine = secondAddressLine;
    tempJob.thirdAddressLine = thirdAddressLine;
    tempJob.postcode = postcode;
    tempJob.jobNotes = notes;
    tempJob.jobStartDate = data.startDate || startDate;
    tempJob.jobEndDate = data.endDate || endDate;

    databaseService.updateJob(jobId, tempJob);
  };

  const handleDateSelection = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
    const newData = { startDate: dates[0], endDate: dates[1] };
    updateJob(newData);
  };

  const handleTextChange = (event, func) => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight + 10}px`;

    console.log(notesRef.current.style.height);

    func(event.target.value);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (e === null) return;

    try {
      await databaseService.uploadImage(jobId, file);
      const dbJobImages = await databaseService.getImages(jobId);

      await setAttachments(dbJobImages);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCapture = async (file) => {
    try {
      await databaseService.uploadImage(jobId, file);
      const dbJobImages = await databaseService.getImages(jobId);

      await setAttachments(dbJobImages);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAttachment = async (index) => {
    databaseService.deleteImage(jobId, attachments[index].name, attachments[index].id);
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return cameraIsOpen ? (
    <WebcamCapture setCameraIsOpen={setCameraIsOpen} handleCapture={handleCapture} />
  ) : (
    <div className="Job">
      <FaArrowCircleLeft onClick={() => navigate('/jobs')} className="back-arrow" />
      <textarea
        className="Job__text-area title"
        value={title}
        onChange={(e) => handleTextChange(e, setTitle)}
        onBlur={updateJob}
        ref={titleRef}
      >
        {title}
      </textarea>
      <div className="Job__address-container">
        <p className="Job__address__hint">Address:</p>
        <input
          className="Job__address__input address"
          type="text"
          value={firstAddressLine}
          onChange={(e) => handleTextChange(e, setfirstAddressLine)}
          onBlur={updateJob}
        />
        <input
          className="Job__address__input"
          type="text"
          value={secondAddressLine}
          onChange={(e) => handleTextChange(e, setSecondAddressLine)}
          onBlur={updateJob}
        />
        <input
          className="Job__address__input"
          type="text"
          value={thirdAddressLine}
          onChange={(e) => handleTextChange(e, setThirdAddressLine)}
          onBlur={updateJob}
        />
        <label>
          Postcode:
          <input
            className="Job__address__input__postcode"
            type="text"
            value={postcode}
            onChange={(e) => handleTextChange(e, setPostcode)}
            onBlur={updateJob}
          />
        </label>
      </div>

      {datePickerIsOpen ? (
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          handleDateSelection={handleDateSelection}
          setDatePickerIsOpen={setDatePickerIsOpen}
        />
      ) : (
        <div className="Job__calendar-row">
          <p className="Job__calendar-dates">{`${startDate} - ${endDate}`}</p>
          <FaCalendarAlt className="Job__calendar-icon" onClick={() => setDatePickerIsOpen(true)} />
        </div>
      )}

      <div>
        <textarea
          placeholder="Notes about the job"
          className="Job__text-area__notes"
          value={notes}
          onChange={(e) => handleTextChange(e, setNotes)}
          onBlur={updateJob}
          ref={notesRef}
        >
          {notes}
        </textarea>
      </div>

      <MaterialsList jobId={jobId} />
      <div className="Job__attachment-buttons__row">
        <div className="Job__attachment-icons__container">
          <FaCamera className="Job__attachment-icons" onClick={() => setCameraIsOpen(true)} />
        </div>
        <div className="Job__attachment-icons__container">
          <label htmlFor="file-upload">
            <input name="file-upload" type="file" id="file-upload" onChange={handleFile} hidden />
            <FaImage className="Job__attachment-icons" />
          </label>
        </div>
      </div>
      <ul className="Job__attachments">
        {attachments.map((attachment, index) => (
          <Attachment
            key={attachment.id}
            attachment={attachment}
            deleteAttachment={deleteAttachment}
            index={index}
          />
        ))}
      </ul>
      <Footer onJobPage={true} />
    </div>
  );
};

export default Job;
