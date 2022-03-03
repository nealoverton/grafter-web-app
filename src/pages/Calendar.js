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
      console.log(jobsFromFirestore);
      jobsFromFirestore['0'].jobStartDate = dateHelper(jobsFromFirestore['0'].jobStartDate);
      jobsFromFirestore['0'].jobEndDate = dateHelper(jobsFromFirestore['0'].jobEndDate);
      if (jobsFromFirestore.length > 0) {
        const newJob = [
          {
            title: `${jobsFromFirestore['0'].name}`,
            start: jobsFromFirestore['0'].jobStartDate,
            end: jobsFromFirestore['0'].jobEndDate
          }
        ];
        setJob(newJob);
      }
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
