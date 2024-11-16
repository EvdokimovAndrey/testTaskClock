import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Timezone, selectTimezone } from "../store/timezone.slice";
import { AppDispatch, AppState } from "../store/store";
import "../styles/selectorStyle.css";

interface TimezoneSelectorProps {
  clockId: number;
}

const TimezoneSelector = ({ clockId }: TimezoneSelectorProps) => {
  const timezones = useSelector((state: AppState) => state.timezone.timezones);
  const dispatch = useDispatch<AppDispatch>();

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedTimezone = event.target.value;
    dispatch(selectTimezone({ timezoneId: selectedTimezone, clockId }));
  };

  return (
    <select className="select" onChange={handleTimezoneChange}>
      <option style={{ display: "none" }}>Выберете временную зону</option>
      {timezones.map((timezone: Timezone) => (
        <option key={timezone.timezone} value={timezone.timezone}>
          {timezone.name}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
