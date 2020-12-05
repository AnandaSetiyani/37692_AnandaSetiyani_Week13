import './App.css';
import {TimeIcon, CaretUpIcon, CaretDownIcon, IconButton, Button} from 'evergreen-ui';
import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [started, setStarted] = useState(false);
  const [showBoom, setShowBoom] = useState(false);
  const [paused, setPaused] = useState(false);
  const { hours, minutes, seconds } = time;
  const [status, setStatus] = useState(0);
  let interval;
  useEffect(() => {
    if (started) {
      interval = setInterval(() => {
        //console.log("test");
        if (seconds > 0) {
          setTime({
            ...time,
            seconds: seconds - 1,
          });
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              setStarted(false);
              setShowBoom(true);
              setStatus(2);
            } else {
              setTime({
                ...time,
                hours: hours - 1,
                minutes: 59,
                seconds: 59,
              });
            }
          } else {
            setTime({
              ...time,
              minutes: minutes - 1,
              seconds: 59,
            });
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, started]);

  const startCountdown = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }
    setStatus(1);
    setStarted(true);
    setPaused(false);
  };

  const resetCountdown = () => {
    setStarted(false);
    setStatus(0);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const handleChange = (type, waktu) => {
    setShowBoom(false);
    if (type === "increment" && waktu === "h") {
      if (hours + 1 > 24) {
        return;
      }
      setTime({ ...time, hours: hours + 1 });
    }

    if (type === "decrement" && waktu === "h") {
      if (hours - 1 < 0) {
        return;
      }
      setTime({ ...time, hours: hours - 1 });
    }

    if (type === "increment" && waktu === "m") {
      if (minutes + 1 > 59) {
        return;
      }
      setTime({ ...time, minutes: minutes + 1 });
    }

    if (type === "decrement" && waktu === "m") {
      if (minutes - 1 < 0) {
        return;
      }
      setTime({ ...time, minutes: minutes - 1 });
    }

    if (type === "increment" && waktu === "s") {
      if (seconds + 1 > 59) {
        return;
      }
      setTime({ ...time, seconds: seconds + 1 });
    }

    if (type === "decrement" && waktu === "s") {
      if (seconds - 1 < 0) {
        return;
      }
      setTime({ ...time, seconds: seconds - 1 });
    }
  };

  const pauseCountdown = () => {
    clearInterval(interval);
    setPaused(true);
    if (started) {
      setStarted(false);
    } else {
      setStarted(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      {(status === 2)?
      <style>{'body{background-color: #66ff66;}'}</style>: 
      <style>{'body{background-color: rgb(13, 240, 240);}'}</style>
      }
        <p className="Title">
          <TimeIcon/>Simple Countdown<TimeIcon/>
        </p>
        {(status === 2)? 
        <div className="boom2">BOOOM!!!!!</div>:""}
        <div className="boom">{started && !showBoom && "Remaining:"}</div>
        <div className="panah">
        <IconButton appearance="minimal"icon={CaretUpIcon} margin={24} onClick={(e) => handleChange("increment", "h")}></IconButton>
        <IconButton appearance="minimal"icon={CaretUpIcon} margin={16} onClick={(e) => handleChange("increment", "m")}></IconButton>
        <IconButton appearance="minimal"icon={CaretUpIcon} margin={24} onClick={(e) => handleChange("increment", "s")}></IconButton>
        </div>
        <div className="hour">
          {hours}<a style={{ marginRight: '1.8rem' }}></a> : <a style={{ marginLeft: '1rem' }}></a>{minutes} <a style={{ marginLeft: '2rem' }}></a>:<a style={{ marginLeft: '0.7rem' }}></a> {seconds}
        </div>
        <div className="panah">
        <IconButton appearance="minimal"icon={CaretDownIcon} margin={24} onClick={(e) => handleChange("decrement", "h")}></IconButton>
        <IconButton appearance="minimal"icon={CaretDownIcon} margin={16} onClick={(e) => handleChange("decrement", "m")}></IconButton>
        <IconButton appearance="minimal"icon={CaretDownIcon} margin={24} onClick={(e) => handleChange("decrement", "s")}></IconButton>
        </div>
        <Button onClick={startCountdown}>{paused ? "RESUME" : "START"}</Button>
        <Button onClick={resetCountdown}>RESET</Button>
        {started && <Button onClick={pauseCountdown}> PAUSE</Button>}
      </header>
    </div>
  );
}

export default App;