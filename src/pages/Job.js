import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaCamera, FaImage } from 'react-icons/fa';
import MaterialsList from './MaterialsList';
import { WebcamCapture } from '../components/media/WebcamCapture';
import './Job.css';

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
  const [title, setTitle] = useState(job.title);
  const [notes, setNotes] = useState(job.notes ? job.notes : null);
  const [address, setAddress] = useState(job.address ? job.address : null);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleChange = (event, func) => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
    func(event.target.value);
  };

  const handleFile = () => {
    //send file to db then request job with new url added to attachements
  };

  const handleCapture = () => {
    //send file to db then request job with new url added to attachements
  };

  const updateJob = () => {
    const tempJob = job;
    tempJob.title = title;
    tempJob.address = address;
    tempJob.notes = notes;

    setJob(tempJob);
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

        <div>
          <label onChange={handleFile} htmlFor="formId">
            <input name="" type="file" id="formId" hidden />
            <FaImage className="Job__attachment-icons" />
          </label>
        </div>
      </div>

      <ul className="Job__attachments">
        {job.attachments.map((attachment, index) => (
          <li key={attachment + index.toString()}>
            <img src={attachment} alt="Attached job info" className="Job__img" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Job;
