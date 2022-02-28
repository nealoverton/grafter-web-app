import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function JobPage({ jobs, completeJob, removeJob }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  return jobs.map((job, index) => (
    <div className={job.isComplete ? 'job-row complete' : 'job-row'} key={index}>
      <div key={job.id} onClick={() => completeJob(job.id)} aria-hidden="true">
        {job.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine onClick={() => removeJob(job.id)} className="delete-icon" />
        <TiEdit onClick={() => setEdit({ id: job.id, value: job.text })} className="edit-icon" />
      </div>
    </div>
  ));
}

export default JobPage;
