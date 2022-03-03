import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import JobForm from '../components/forms/JobForm';
import Footer from '../components/layout/Footer';
import databaseService from '../services/firestore';
import JobPage from './JobPage';

import './JobsListPage.css';

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const navigate = useNavigate();

  useEffect(async () => {
    const dbJobs = await databaseService.getJobs();

    setJobs([...dbJobs]);
    setLoadingJobs(false);
  }, [loadingJobs]);

  const addJob = (job) => {
    if (!job.text || /^\s*$/.test(job.text)) {
      return;
    }

    const newJobs = [job, ...jobs];
    setJobs(newJobs);

    databaseService.addJob(job.text);
    setLoadingJobs(true);
  };

  const removeJob = (id) => {
    databaseService.deleteJob(id);
    setLoadingJobs(true);
  };

  const updateJob = (jobId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    databaseService.updateJob(jobId, { name: newValue.text });
    setLoadingJobs(true);
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
    <>
      {' '}
      <div className="jobs-list__background">
        <div className="jobs-list">
          <FaArrowCircleLeft onClick={() => navigate('/')} className="back-arrow" />
          <h1>Live Jobs</h1>
          <JobForm onSubmit={addJob} />
          <JobPage
            jobs={jobs}
            completeJob={completeJob}
            removeJob={removeJob}
            updateJob={updateJob}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobsList;
