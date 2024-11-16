import React from "react";
import "../styles/clockStyle.css";

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({
  hours,
  minutes,
  seconds,
}) => {
  const clockMarks = [];
  for (let i = 1; i <= 12; i++) {
    clockMarks.push(<div className={`hours-marks${i}`} key={i} />);
  }

  return (
    <div className="clock-wrapper">
      <div className="clock">
        <div
          className="hours"
          style={{
            transform: `rotate(${hours * 30 - 90}deg) translateX(-10px)`,
          }}
        ></div>
        <div
          className="minutes"
          style={{
            transform: `rotate(${minutes * 6 - 90}deg) translateX(-15px)`,
          }}
        ></div>
        <div
          className="seconds"
          style={{
            transform: `rotate(${seconds * 6 - 90}deg) translateX(-15px)`,
          }}
        ></div>
        {clockMarks}
      </div>
    </div>
  );
};

export default AnalogClock;
