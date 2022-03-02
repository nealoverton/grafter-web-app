import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import databaseService from '../services/firestore';

export const reactCalendar = function () {
  const [job, setJob] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    databaseService.getJobs('EBRklWxRHARgMY3PADB7omUiLuC2').then((jobsFromFirestore) => {
      console.log(jobsFromFirestore, '<<<<');

      if (jobsFromFirestore.length > 0) {
        const newJob = [
          {
            title: `${jobsFromFirestore['0'].name} ${jobsFromFirestore['1'].firstAddressLine} ${jobsFromFirestore['1'].postcode} `,

            start: `${jobsFromFirestore['0'].jobStartDate}`,
            end: `${jobsFromFirestore['0'].jobEndDate}`
          }
        ];
        const newInfo = [
          {
            Address: `${jobsFromFirestore['1'].firstAddressLine}`,
            Postcode: `${jobsFromFirestore['1'].postcode}`
          }
        ];
        setJob(newJob);
        setInfo(newInfo);
      }
    });
  }, []);

  console.log(info);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends
        events={job}
        eventClick
      />
    </div>
  );
};

export default reactCalendar;
