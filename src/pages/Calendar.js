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
      if (jobsFromFirestore.length > 0) {
        const newJob = [
          {
            title: `Bathroom`,
            start: `2022-03-10`,
            end: `2022-03-15`
            // title: `${jobsFromFirestore['0'].name}`,
            // start: `${jobsFromFirestore['0'].jobStartDate}`,
            // end: `${jobsFromFirestore['0'].jobEndDate}`
          },
          {
            title: 'Kitchen',
            start: `2022-03-12`,
            end: `2022-03-20`
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
