import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaCamera, FaImage } from 'react-icons/fa';
import MaterialsList from './MaterialsList';
import { WebcamCapture } from '../components/media/WebcamCapture';
import './Job.css';
import databaseService from '../services/firestore';

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
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [address, setAddress] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);

  useEffect(async () => {
    window.scrollTo(0, 0);
    const dbJob = await databaseService.getJob(jobId);
    console.log(dbJob);
    setJob(dbJob);
    setTitle(dbJob.name);
    setNotes(dbJob.jobNotes);
    setAddress(dbJob.firstAddressLine);

    const dbJobImages = await databaseService.getImages(jobId);
    setAttachments(dbJobImages);
  }, []);

  const handleChange = (event, func) => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
    func(event.target.value);
  };

  const handleFile = async (e) => {
    //send file to db then request job with new url added to attachements
    // databaseService.uploadImage(jobId, file);

    console.log('handling file');
    const file = e.target.files[0];
    if (e === null) return;

    try {
      await databaseService.uploadImage(jobId, file);
      const dbJobImages = await databaseService.getImages(jobId);
      console.log(dbJobImages);
      await setAttachments(dbJobImages);
      console.log(attachments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCapture = async (file) => {
    console.log(file.toString().slice(23));
    //send file to db then request job with new url added to attachements
    try {
      await databaseService.uploadImage(jobId, file);
      const dbJobImages = await databaseService.getImages(jobId);
      console.log(dbJobImages);
      await setAttachments(dbJobImages);
      console.log(attachments);
    } catch (err) {
      console.log(err);
    }
  };

  const updateJob = () => {
    const tempJob = job;
    tempJob.name = title;
    tempJob.firstAddressLine = address;
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

      <div className="Job__address-row">
        <textarea
          className="Job__text-area address"
          value={address}
          onChange={(e) => handleChange(e, setAddress)}
          onBlur={updateJob}
        >
          {job.address}
        </textarea>
      </div>
      <div className="Job__calendar-row">
        <p className="dates">
          <FaCalendarAlt />
          {`${job.startDate} - ${job.endDate}`}
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

      <MaterialsList jobId={jobId} />

      <div className="Job__attachment-buttons__row">
        <FaCamera className="Job__attachment-icons" onClick={() => setCameraIsOpen(true)} />

        <label htmlFor="file-upload">
          <input name="file-upload" type="file" id="file-upload" onChange={handleFile} hidden />
          <FaImage className="Job__attachment-icons" />
        </label>
      </div>

      <ul className="Job__attachments">
        {attachments.map((attachment) => (
          <li key={attachment.url}>
            <img src={attachment.url} alt="Attached job info" className="Job__img" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Job;
