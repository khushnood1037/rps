import { useEffect, type JSX } from "react";
import { useTimer } from "react-timer-hook";
import "./Countdown.scss";

export default function Countdown({
  expiryTimestamp,
  startTimestamp,
  className,
  callBack,

}: {
  expiryTimestamp: number;
  startTimestamp?: number;
  className?: string;
  callBack?: () => void;
}): JSX.Element {


  // Convert UNIX timestamp to Date
  const expiryDate = new Date(expiryTimestamp * 1000);
  const startDate = startTimestamp ? new Date(startTimestamp * 1000) : null;
  const initialExpiry = startDate && +new Date() < +startDate ? startDate : expiryDate;


  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: initialExpiry,
    autoStart: true,
    onExpire: () => {
      setTimeout(() => {
        if (callBack) {
          callBack();
        }
      }, 5000);
    },
  });
  useEffect(() => {
    restart(initialExpiry, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTimestamp, expiryTimestamp]);



  // Format time values
  const dayTime = days < 10 ? `0${days}` : `${days}`;
  const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;



  return (
    <div className={`${className || ''} common_countdown`}>
      <div className="common_countdown_inner">
        <span className="common_countdown_inner_label">Days</span>
        <span className="common_countdown_inner_value">{dayTime}</span>
      </div>
      <div className="common_countdown_inner">
        <span className="common_countdown_inner_label">Hours</span>
        <span className="common_countdown_inner_value">{hourTime}</span>
      </div>
      <div className="common_countdown_inner">
        <span className="common_countdown_inner_label">Minutes</span>
        <span className="common_countdown_inner_value">{minuteTime}</span>
      </div>
      <div className="common_countdown_inner">
        <span className="common_countdown_inner_label">Seconds</span>
        <span className="common_countdown_inner_value">{secondTime}</span>
      </div>
    </div>
  );
}
