import React from "react";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EventCard.css";

const EventCard = ({ title, place, category, startdate, enddate, price }) => {
  let date;
  if (format(parseISO(startdate), "d") === format(parseISO(enddate), "d")) {
    date = <p className="dates">{format(parseISO(startdate), "dd")}</p>;
  } else {
    date = (
      <p className="dates">
        {format(parseISO(startdate), "dd")}
        <span> - </span>
        {format(parseISO(enddate), "dd")}
      </p>
    );
  }
  return (
    <div className="eventcard">
      <div className="date">
        <p className="startmonth"> {format(parseISO(startdate), "LLL")}</p>
        <span className="dateclass">{date}</span>
      </div>
      <div className="details">
        <p className="title">{title}</p>
        <p className="category">{category}</p>
        <p className="place">
          <FontAwesomeIcon
            className="location"
            icon="fa-solid fa-location-dot"
          />
          {place}
        </p>
        <p>
          <FontAwesomeIcon className="ticket" icon="fa-solid fa-ticket" />
          <span className="price">INR {price}</span>
        </p>
        <p className="starttime">
          {format(parseISO(startdate), "iii LLL dd y")} at{" "}
          <span className="time">{format(parseISO(startdate), "K:mm a")}</span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
