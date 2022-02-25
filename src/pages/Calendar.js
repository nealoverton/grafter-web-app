import Calendar from 'react-calendar';
import React, { useState } from 'react';
import './CalendarStyle.css';

const ReactCalendar = function () {
  const [dates, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
  const addEvent = (value) => {
    console.log('clicked day:', value);
  };
  return (
    <div>
      <Calendar
        onChange={onChange}
        value={dates}
        calendarType="US"
        showWeekNumbers
        selectRange
        onClickDay={addEvent}
      />
    </div>
  );
};

export default ReactCalendar;
