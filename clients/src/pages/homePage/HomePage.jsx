import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import volunteerApi from "../../apis/volunteerApi";
import Spinner from "../../components/spinner/Spinner";
import { useAuth } from "../../context/auth-context";
import { EventNearby } from "../events/eventsNearby/EventNearby";
import "./homePage.css";

const HomePage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState(false);
  const [eventsEmptyMsg, setEventsEmptyMsg] = useState(false);

  const fetchEvents = async () => {
    const userObj = user;

    try {
      const { data } = await volunteerApi({
        url: `/events/userEvents/`,
        method: "GET",
        headers: { Authorization: user.token },
      });
      if (data.length === 0) setEventsEmptyMsg("עדיין לא הצטרפת להתנדבויות");
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEvents = () => {
    return events.map(
      ({ eventName, dateString, time, address, _id }, index) => {
        return (
          <div className="card" key={index}>
            {" "}
            <h4>{eventName}</h4>
            <p>{dateString}</p>
            <p>{time}</p>
            <p>{address}</p>
            {/* <img
            src="https://urbanplacejlm.spaces.nexudus.com/en/blog/getimage?id=638136499&w=700"
            width="200px"
            height="200px"
            alt=""
          /> */}
            {/* <br />
          <br /> */}{" "}
            <button className="btn btn-lightGreen">
              <Link to={`/event/${_id}`} className="btn">
                פרטים נוספים
              </Link>
            </button>
          </div>
        );
      }
    );
  };
  return (
    <div>
      {/* <Navbar /> */}

      <div className="dashboard">
        {events ? (
          <div className="my-up-coming-events">
            <h2>האירועים הקרובים שלי</h2>
            <div className="my-up-coming-events-list">{renderEvents()} </div>
            {eventsEmptyMsg && <h4>{eventsEmptyMsg}...</h4>}
          </div>
        ) : (
          <Spinner />
        )}

        <div
          className="new-events-nearby"
          // style={{
          //   overflowY: "auto",
          //   height: "900px",
          //   direction: "ltr",
          //   textAlign: "center",
          //   boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          // }}
        >
          <h4>:אירועים חדשים באיזורך</h4>
          <EventNearby />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
