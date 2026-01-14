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
  const nowMs = Date.now();
  const shouldCountToStart = !!startDate && nowMs < startDate.getTime();
  const targetDate = shouldCountToStart ? (startDate as Date) : expiryDate;

  // eslint-disable-next-line no-console
  console.log("[Countdown][debug] props", { startTimestamp, expiryTimestamp, shouldCountToStart });


  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: targetDate,
    autoStart: true,
    onExpire: () => {
      // If we were counting down to the start time, automatically restart to count down to the end time.
      if (startDate && startDate.getTime() !== expiryDate.getTime()) {
        const now = Date.now();
        if (now >= startDate.getTime() && now < expiryDate.getTime()) {
          restart(expiryDate, true);
          // optional refresh to update UI/state after phase flip
          if (callBack) setTimeout(callBack, 500);
          return;
        }
      }

      setTimeout(() => {
        if (callBack) callBack();
      }, 5000);
    },
  });
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[Countdown][debug] restart ->", {
      target: Math.floor(targetDate.getTime() / 1000),
      now: Math.floor(Date.now() / 1000),
    });
    restart(targetDate, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTimestamp, expiryTimestamp, targetDate.getTime()]);



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
