import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import databaseService from '../services/firestore';
import Footer from '../components/layout/Footer';
import './CalendarStyle.css';

export const reactCalendar = function () {
  const [job, setJob] = useState([]);

  useEffect(() => {
    databaseService.getJobs().then((jobsFromFirestore) => {
      const dateHelper = (originalDate) => {
        const dates = originalDate.split('/');
        return [dates[2], dates[1], dates[0]].join('-');
      };
      const newJobs = [];
      jobsFromFirestore.forEach((jobData) => {
        jobData.jobStartDate = dateHelper(jobData.jobStartDate);
        jobData.jobEndDate = dateHelper(jobData.jobEndDate);
        const newJob = {
          title: `${jobData.name}`,
          start: jobData.jobStartDate,
          end: jobData.jobEndDate
        };
        newJobs.push(newJob);
      });
      setJob(newJobs);
    });
  }, []);

  return (
    <>
      <div className="Calendar__container">
        <FullCalendar
          height={533}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends
          events={job}
        />
      </div>
      <Footer />
    </>
  );
};
export default reactCalendar;
