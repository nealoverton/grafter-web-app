import React, { useState } from 'react';
import JobForm from '../components/forms/JobForm';
import './JobsListPage.css';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    if (!job.text || /^\s*$/.test(job.text)) {
      return;
    }

    const newJobs = [job, ...jobs];

    setJobs(newJobs);
    console.log(...jobs);
  };

  return (
    <div className="jobs-list">
      <h1>What jobs do you have today?</h1>
      <JobForm onSubmit={addJob} />
    </div>
  );
}

export default JobsList;
