import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useState } from 'react';

export const Calendar = (props: {}) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => date && setStartDate(date)}
    />
  );
};
