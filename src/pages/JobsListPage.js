import React, { useState } from 'react';
import JobForm from '../components/forms/JobForm';
import JobPage from './JobPage';
import './JobsListPage.css';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    if (!job.text || /^\s*$/.test(job.text)) {
      return;
    }

    const newJobs = [job, ...jobs];

    setJobs(newJobs);
  };

  const removeJob = (id) => {
    const removeArr = [...jobs].filter((job) => job.id !== id);

    setJobs(removeArr);
  };

  const completeJob = (id) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        job.isComplete = !job.isComplete;
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  return (
    <div className="jobs-list">
      <h1>What jobs do you have today?</h1>
      <JobForm onSubmit={addJob} />
      <JobPage jobs={jobs} completeJob={completeJob} removeJob={removeJob} />
    </div>
  );
}

export default JobsList;
