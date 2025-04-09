import { useState, useEffect } from "react";

import "../stylesheets/clothes-page-countdown.css";
export default function CountdownTimer({ startDate }) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(startDate))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(new Date(startDate)));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  function calculateTimeLeft(start) {
    const endDate = new Date(start);
    endDate.setMonth(endDate.getMonth() + 1); // 1 month later
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <div className="clothes-page-countdown">
      <div className="clothes-page-countdown-inner">
        {/* <h2>Questa <span>selezione</span> di capi è <span>disponibile</span> per: </h2> */}
        <h2>Questa selezione di capi è <span>disponibile</span> a questi prezzi <span>per</span>: </h2>
        <div className="countdown">
          <div className="countdown-time">
            {timeLeft.days}
            <span className="countdown-block">giorni</span>
          </div>
          <div className="countdown-time">
            {timeLeft.hours}
            <span className="countdown-block">ore</span>
          </div>
          <div className="countdown-time">
            {" "}
            {timeLeft.minutes}
            <span className="countdown-block">minuti</span>
          </div>
          <div className="countdown-time">
            {" "}
            {timeLeft.seconds}
            <span className="countdown-block">secondi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
