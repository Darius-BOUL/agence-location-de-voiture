import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/datepicker.css";


export default function DateRangePicker({ onChange }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);

    if (onChange) {
      onChange({ startDate, endDate });
    }
  };

  return (
    <div className="date-picker-wrapper">
      <h3 className="picker-title">Sélectionnez vos dates</h3>

      <div className="calendar-card">
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={range}
          onChange={handleSelect}
          minDate={new Date()}
        />
      </div>
    </div>
  );
}
