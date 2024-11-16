import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Timezone } from "../store/timezone.slice";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";

interface ClockProps {
  clockId: number;
  timezoneId: string;
}

const Clock: React.FC<ClockProps> = ({ timezoneId }) => {
  const timezones = useSelector((state: AppState) => state.timezone.timezones);

  const [localTime, setLocalTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  const getLocalTime = (): {
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const timezone: Timezone | undefined = timezones.find(
      (tz) => tz.timezone === timezoneId,
    );
    if (!timezone) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const offsetHours = parseInt(timezone.timezone, 10);
    const now = new Date();
    const localTime = new Date(
      now.getTime() +
        (now.getTimezoneOffset() / 60 + offsetHours) * 60 * 60 * 1000,
    );
    return {
      hours: localTime.getHours(),
      minutes: localTime.getMinutes(),
      seconds: localTime.getSeconds(),
    };
  };

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(getLocalTime());
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timezones, timezoneId]);

  return (
    <div>
      <AnalogClock
        hours={localTime.hours}
        minutes={localTime.minutes}
        seconds={localTime.seconds}
      />
      <DigitalClock
        hours={localTime.hours}
        minutes={localTime.minutes}
        seconds={localTime.seconds}
      />
    </div>
  );
};

export default Clock;
