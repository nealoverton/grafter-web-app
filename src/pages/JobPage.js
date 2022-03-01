import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
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
      <div key={job.id} onClick={() => completeJob(job.id)} aria-hidden="true">
        {job.name}
      </div>
      <div className="icons">
        <RiCloseCircleLine onClick={() => removeJob(job.id)} className="delete-icon" />
        <TiEdit onClick={() => setEdit({ id: job.id, value: job.text })} className="edit-icon" />
      </div>
    </div>
  ));
}

export default JobPage;
