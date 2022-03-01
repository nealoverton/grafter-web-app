import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import databaseService from '../services/firestore';

export const reactCalendar = function () {
  const [job, setJob] = useState([]);

  useEffect(() => {
    databaseService.getJobs('EBRklWxRHARgMY3PADB7omUiLuC2').then((jobsFromFirestore) => {
      console.log(jobsFromFirestore, '<<<<');
      if (jobsFromFirestore.length > 0) {
        const newJob = [
          {
            title: `${jobsFromFirestore['0'].name}`,
            start: `${jobsFromFirestore['0'].jobStartDate}`,
            end: `${jobsFromFirestore['0'].jobEndDate}`
          }
        ];
        setJob(newJob);
      }
    });
  }, []);

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" weekends events={job} />
    </div>
  );
};
export default reactCalendar;
