import React, { useEffect, useState } from "react";
import HomeNav from "./HomeNav";
import EventCard from "./EventCard";
import axios from "axios";
import LoggedNav from "./LoggedNav";
import { Container } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [logout, setLogout] = useState(false);
  const [filterSelect, setFilterSelect] = useState("");

  let allEvent;

  const getFilterValue = (value) => {
    setFilterSelect(() => {
      return value;
    });
  };

  const logoutFunc = () => {
    setLogout(() => {
      return !logout;
    });
  };
  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/viewallevents"
      );

      setAllEvents(() => {
        return response.data;
      });
      console.log(response.data)
      
    };
    getAllEvents();
  }, []);

  if (!filterSelect || filterSelect === "allevents") {
    allEvent = allEvents.map((item) => {
      return (
        <EventCard
          key={item.eventid}
          title={item.title}
          place={item.place}
          category={item.category}
          startdate={item.startDate}
          enddate={item.endDate}
          price={item.price}
          favourite={item.favourite}
        />
      );
    });
  } else {
    const allEventfiltered = allEvents.filter((item) => {
      return item.category === filterSelect;
    });

    allEvent = allEventfiltered.map((item) => {
      return (
        <EventCard
          key={item.eventid}
          title={item.title}
          place={item.place}
          category={item.category}
          startdate={item.startDate}
          enddate={item.endDate}
          price={item.price}
          favourite={item.favourite}
        />
      );
    });
  }

  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <LoggedNav logout={logoutFunc} getFilterValue={getFilterValue} />
      ) : (
        <HomeNav getFilterValue={getFilterValue} />
      )}

      <div className="events">{allEvent}</div>
    </>
  );
};

export default Home;
