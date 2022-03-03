import { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'react-calendar/dist/Calendar.css';
import './Datepicker.css';

dayjs.extend(customParseFormat);

const DatePicker = function ({
  startDate = dayjs(),

  endDate = dayjs(),
  handleDateSelection,
  setDatePickerIsOpen
}) {
  const [value, setValue] = useState([
    dayjs(startDate, 'DD/MM/YYYY'),
    dayjs(endDate, 'DD/MM/YYYY')
  ]);

  const handleChange = (dates) => {
    setValue(dates);
    handleDateSelection([
      dates[0].toLocaleDateString('en-GB'),
      dates[1].toLocaleDateString('en-GB')
    ]);
  };

  return (
    <div className="DatePicker__container">
      <div className="DatePicker__header">
        <p className="DatePicker__header__text">{`${startDate} - ${endDate}`}</p>
        <FaTimesCircle
          className="DatePicker__header__close-icon"
          onClick={() => setDatePickerIsOpen(false)}
        />
      </div>
      <Calendar onChange={handleChange} initialValue={value} selectRange />
    </div>
  );
};

export default DatePicker;
