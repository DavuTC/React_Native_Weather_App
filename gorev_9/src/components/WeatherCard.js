import React, { useEffect, useState } from "react";
import "./WeatherCard.css";
import { LiaEllipsisVSolid } from "react-icons/lia";

import { IconContext } from "react-icons";
function WeatherCard(props) {
  const [currentDate, setCurrentDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", { day: "numeric" });
    const day = date.toLocaleDateString("en-US", { weekday: "long" });

    setCurrentDate(formattedDate);
    setCurrentDay(day);
  }, []);
  return (
    <div className="card">
      <div className="card-container center">
        <div className="card-img"></div>
        <div className="options">
          <IconContext.Provider value={{ color: "white", size: "2em" }}>
            <LiaEllipsisVSolid />
          </IconContext.Provider>
        </div>
        <div className="weather-content">
          <div className="date center">
            <p className="day">{currentDay}</p>
            <p className="numday">{currentDate}</p>
          </div>

          <div className="center">
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/w/${props.weatherIcon}.png`}
              alt=""
            ></img>
          </div>
          <div className="region center">
            <p className="city">
              {props.cityName} <span className="iso">{props.iso}</span>
            </p>

            <p className="sky">{props.description}</p>
          </div>

          <div className="details">
            <div className="detail-box">
              <p className="detail-header">Current Temp.</p>
              <p className="rate">{props.currentTemp}°C</p>
            </div>
            <div className="detail-box">
              <p className="detail-header">Feels Like</p>
              <p className="rate">{props.feelsLike}°C</p>
            </div>
            <div className="detail-box">
              <p className="detail-header">Humidity</p>
              <p className="rate">{props.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
