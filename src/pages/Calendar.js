import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import databaseService from '../services/firestore';

export const reactCalendar = function () {
  const [job, setJob] = useState([]);

  useEffect(() => {
    databaseService.getJobs('EBRklWxRHARgMY3PADB7omUiLuC2').then((jobsFromFirestore) => {
      console.log(jobsFromFirestore);
      setJob(jobsFromFirestore);
    });
  }, []);

  // console.log(job);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends
        events={(job.jobStartDate, job.jobEndDate)}
      />
    </div>
  );
};
export default reactCalendar;
