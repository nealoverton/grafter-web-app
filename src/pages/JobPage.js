import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function JobPage({ jobs, completeJob }) {
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
        <RiCloseCircleLine />
        <TiEdit />
      </div>
    </div>
  ));
}

export default JobPage;
