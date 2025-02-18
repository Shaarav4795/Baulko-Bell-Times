import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "./styles.css";

dayjs.extend(duration);

const bellSchedule = {
  Monday: [
    { name: "Roll Call", time: "08:38 AM" },
    { name: "Period 1", time: "08:44 AM" },
    { name: "Period 2", time: "09:23 AM" },
    { name: "Assembly", time: "10:00 AM" },
    { name: "Recess", time: "10:24 AM" },
    { name: "Period 3", time: "10:43 AM" },
    { name: "Period 4", time: "11:20 AM" },
    { name: "Break", time: "11:57 AM" },
    { name: "Period 5", time: "12:02 PM" },
    { name: "Period 6", time: "12:39 PM" },
    { name: "Lunch", time: "01:16 PM" },
    { name: "Period 7", time: "01:52 PM" },
    { name: "Period 8", time: "02:29 PM" },
    { name: "End", time: "03:06 PM" },
  ],
  Tuesday: [
    { name: "Roll Call", time: "08:38 AM" },
    { name: "Period 1", time: "08:44 AM" },
    { name: "Period 2", time: "09:26 AM" },
    { name: "Recess", time: "10:06 AM" },
    { name: "Period 3", time: "10:25 AM" },
    { name: "Period 4", time: "11:05 AM" },
    { name: "Break", time: "11:45 AM" },
    { name: "Period 5", time: "11:50 AM" },
    { name: "Period 6", time: "12:30 PM" },
    { name: "Lunch", time: "01:10 PM" },
    { name: "Period 7", time: "01:46 PM" },
    { name: "Period 8", time: "02:26 PM" },
    { name: "End", time: "03:06 PM" },
  ],
  Wednesday: [
    { name: "Roll Call", time: "08:38 AM" },
    { name: "Period 1", time: "08:44 AM" },
    { name: "Period 2", time: "09:23 AM" },
    { name: "Recess", time: "10:00 AM" },
    { name: "Period 3", time: "10:15 AM" },
    { name: "Period 4", time: "10:52 AM" },
    { name: "Period 5", time: "11:29 AM" },
    { name: "Lunch", time: "12:06 PM" },
    { name: "Sport", time: "12:39 PM" },
    { name: "Period 6", time: "12:39 PM" },
    { name: "Period 7", time: "01:16 PM" },
    { name: "Period 8", time: "01:53 PM" },
    { name: "End", time: "02:30 PM" },
  ],
  Thursday: [
    { name: "Roll Call", time: "08:38 AM" },
    { name: "Period 1", time: "08:44 AM" },
    { name: "Period 2", time: "09:26 AM" },
    { name: "Recess", time: "10:06 AM" },
    { name: "Period 3", time: "10:25 AM" },
    { name: "Period 4", time: "11:05 AM" },
    { name: "Break", time: "11:45 AM" },
    { name: "Period 5", time: "11:50 AM" },
    { name: "Period 6", time: "12:30 PM" },
    { name: "Lunch", time: "01:10 PM" },
    { name: "Period 7", time: "01:46 PM" },
    { name: "Period 8", time: "02:26 PM" },
    { name: "End", time: "03:06 PM" },
  ],
  Friday: [
    { name: "Roll Call", time: "08:38 AM" },
    { name: "Period 1", time: "08:44 AM" },
    { name: "Period 2", time: "09:26 AM" },
    { name: "Recess", time: "10:05 AM" },
    { name: "Period 3", time: "10:30 AM" },
    { name: "Period 4", time: "11:09 AM" },
    { name: "Break", time: "11:48 AM" },
    { name: "Period 5", time: "11:53 AM" },
    { name: "Period 6", time: "12:32 PM" },
    { name: "Lunch", time: "01:11 PM" },
    { name: "Period 7", time: "01:47 PM" },
    { name: "Period 8", time: "02:27 PM" },
    { name: "End", time: "03:06 PM" },
  ],
};

export default function BellTimes() {
  const today = dayjs().format("dddd");
  const [selectedDay, setSelectedDay] = useState(
    today in bellSchedule ? today : "Monday"
  );
  const [nextPeriod, setNextPeriod] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCountdownFullscreen, setIsCountdownFullscreen] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs();
      const schedule = bellSchedule[selectedDay];
      const upcoming = schedule.find((period) =>
        dayjs(period.time, "hh:mm A").isAfter(now)
      );
      if (upcoming) {
        setNextPeriod(upcoming);
        setTimeRemaining(
          dayjs
            .duration(dayjs(upcoming.time, "hh:mm A").diff(now))
            .format("HH:mm:ss")
        );
      } else {
        setNextPeriod(null);
        setTimeRemaining("Done for the day");
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleCountdownFullscreen = () => {
    setIsCountdownFullscreen(!isCountdownFullscreen);
  };

  return (
    <div
      className={`p-6 min-h-screen flex flex-col items-center ${
        isFullscreen ? "fullscreen" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Baulko Bell Times</h1>
      <select
        className="mb-4 p-2 border rounded"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        {Object.keys(bellSchedule).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <div className="container">
        <Card className={`card ${isCountdownFullscreen ? "fullscreen" : ""}`}>
          <CardContent className="card-content">
            <h2 className="card-header text-red-600">Next Period</h2>
            {nextPeriod ? (
              <>
                <p className="card-next-period">{nextPeriod.name}</p>
                <p className="card-time">{timeRemaining}</p>
                <button
                  onClick={toggleCountdownFullscreen}
                  className="card-button"
                >
                  {isCountdownFullscreen
                    ? "Exit Countdown Fullscreen"
                    : "Fullscreen Countdown"}
                </button>
                <button onClick={toggleFullscreen} className="card-button">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
              </>
            ) : (
              <p className="card-time">Done for the day</p>
            )}
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="card-content">
            <h2 className="card-header text-blue-600">{selectedDay}</h2>
            {bellSchedule[selectedDay].map((item, index) => (
              <div key={index} className="schedule-item">
                <span className="schedule-item-time">{item.time}</span> -{" "}
                {item.name}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
