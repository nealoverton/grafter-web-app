import Calendar from 'react-calendar';
import React, { useState } from 'react';
import './CalendarStyle.css';

const ReactCalendar = function () {
  const [dates, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
  return (
    <div>
      <Calendar onChange={onChange} value={dates} />
    </div>
  );
};

export default ReactCalendar;
