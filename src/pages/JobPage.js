import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit, TiTick } from 'react-icons/ti';
import JobForm from '../components/forms/JobForm';

function JobPage({ jobs, completeJob, removeJob, updateJob }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = (value) => {
    updateJob(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <JobForm edit={edit} onSubmit={submitUpdate} />;
  }

  return jobs.map((job, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className={job.isComplete ? 'job-row complete' : 'job-row'} key={index}>
      <Link to={`/jobs/${job.id}`} className="job-row__name" key={job.id} aria-hidden="true">
        {job.name}
      </Link>
      <div className="icons">
        <TiTick onClick={() => completeJob(job.id)} className="tick-icon" />
        <RiCloseCircleLine onClick={() => removeJob(job.id)} className="delete-icon" />
        <TiEdit onClick={() => setEdit({ id: job.id, value: job.text })} className="edit-icon" />
      </div>
    </div>
  ));
}

export default JobPage;
