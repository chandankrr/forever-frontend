import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";

const DateSelector = ({ onDateSelect }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const threeDaysLater = addDays(today, 3);
    const fiveDaysLater = addDays(today, 5);

    setDates([
      {
        value: threeDaysLater,
        label: format(threeDaysLater, "d MMMM, yyyy"),
      },
      {
        value: fiveDaysLater,
        label: format(fiveDaysLater, "d MMMM, yyyy"),
      },
    ]);

    setSelectedDate(threeDaysLater);
    onDateSelect(threeDaysLater);
  }, [onDateSelect]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="flex max-w-md gap-4 mt-3">
      {dates.map((date, index) => (
        <div
          key={index}
          className={`px-4 py-3 cursor-pointer border ${
            selectedDate === date.value ? "border border-black" : ""
          }`}
          onClick={() => handleDateSelect(date.value)}
        >
          {date.label}
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
