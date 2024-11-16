import React from "react";

interface DigitalClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const DigitalClock: React.FC<DigitalClockProps> = ({
  hours,
  minutes,
  seconds,
}) => {
  const formatTime = (time: number): string => time.toString().padStart(2, "0");

  return (
    <div style={{ fontSize: "20px", marginTop: "10px" }}>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
};

export default DigitalClock;
