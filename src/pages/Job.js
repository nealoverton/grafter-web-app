import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCamera, FaImage } from 'react-icons/fa';
// import MaterialsList from './MaterialsList';
import { WebcamCapture } from '../components/media/WebcamCapture';
import './Job.css';
import databaseService from '../services/firestore';
import { Attachment } from './Attachment';

const Job = function () {
  const testJob = {
    title: 'Some Job',
    notes: 'got stuff to do, then some more stuff to do.',
    address: 'next door',
    startDate: '28-02-2022',
    endDate: '07-03-2022',
    materials: [
      {
        name: 'wood',
        price: 1.78,
        quantity: 3
      },
      {
        name: 'string',
        price: 2.0,
        quantity: 1
      }
    ],
    attachments: [
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
      'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
      'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
      'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
      'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp'
    ]
  };

  const [job, setJob] = useState(testJob);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  // const [address, setAddress] = useState('');
  const [firstAddressLine, setfirstAddressLine] = useState('');
  const [secondAddressLine, setSecondAddressLine] = useState('');
  const [thirdAddressLine, setThirdAddressLine] = useState('');
  const [postcode, setPostcode] = useState('');
  const [materials, setMaterials] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    window.scrollTo(0, 0);
    const dbJob = await databaseService.getJob(jobId);
    const jobMaterials = await databaseService.getMaterials(jobId);

    setJob(dbJob);
    setTitle(dbJob.name);
    setNotes(dbJob.jobNotes);
    setfirstAddressLine(dbJob.firstAddressLine);
    setSecondAddressLine(dbJob.secondAddressLine);
    setThirdAddressLine(dbJob.thirdAddressLine);
    setPostcode(dbJob.postcode);
    setMaterials(jobMaterials);

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

  const handleChange = (event, func) => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
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
      console.log(attachments);
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

  const updateJob = () => {
    const tempJob = job;
    tempJob.name = title;
    tempJob.firstAddressLine = firstAddressLine;
    tempJob.secondAddressLine = secondAddressLine;
    tempJob.thirdAddressLine = thirdAddressLine;
    tempJob.postcode = postcode;
    tempJob.jobNotes = notes;

    databaseService.updateJob(jobId, tempJob);
  };

  return cameraIsOpen ? (
    <WebcamCapture setCameraIsOpen={setCameraIsOpen} handleCapture={handleCapture} />
  ) : (
    <div className="Job">
      <textarea
        className="Job__text-area title"
        value={title}
        onChange={(e) => handleChange(e, setTitle)}
        onBlur={updateJob}
      >
        {job.title}
      </textarea>

      <div className="Job__address-container">
        <input
          className="Job__address__input"
          type="text"
          value={firstAddressLine}
          onChange={(e) => handleChange(e, setfirstAddressLine)}
          onBlur={updateJob}
        />
        <input
          className="Job__address__input"
          type="text"
          value={secondAddressLine}
          onChange={(e) => handleChange(e, setSecondAddressLine)}
          onBlur={updateJob}
        />
        <input
          className="Job__address__input"
          type="text"
          value={thirdAddressLine}
          onChange={(e) => handleChange(e, setThirdAddressLine)}
          onBlur={updateJob}
        />
        <input
          className="Job__address__input"
          type="text"
          value={postcode}
          onChange={(e) => handleChange(e, setPostcode)}
          onBlur={updateJob}
        />
      </div>

      <div className="Job__calendar-row">
        <p className="dates">
          <FaCalendarAlt />
          {`${job.startDate ? job.startDate : 'Pick a start date'} - ${
            job.endDate ? job.endDate : 'Pick an end date'
          }`}
        </p>
      </div>
      <textarea
        className="Job__text-area"
        value={notes}
        onChange={(e) => handleChange(e, setNotes)}
        onBlur={updateJob}
      >
        {job.notes}
      </textarea>

      {materials.map((material) => (
        <p key={material.name}>{material.name}</p>
      ))}

      <button
        className="Job__materials-button"
        type="button"
        onClick={() => navigate(`/jobs/${jobId}/materials`)}
      >
        Add/remove materials
      </button>

      <div className="Job__attachment-buttons__row">
        <FaCamera className="Job__attachment-icons" onClick={() => setCameraIsOpen(true)} />

        <label htmlFor="file-upload">
          <input name="file-upload" type="file" id="file-upload" onChange={handleFile} hidden />
          <FaImage className="Job__attachment-icons" />
        </label>
      </div>

      <ul className="Job__attachments">
        {attachments.map((attachment, index) => (
          <Attachment attachment={attachment} deleteAttachment={deleteAttachment} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default Job;
