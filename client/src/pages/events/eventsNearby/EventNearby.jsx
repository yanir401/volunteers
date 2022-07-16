import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/auth-context";
import volunteerApi from "../../../apis/volunteerApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { TbCalendarTime } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import "./eventNearby.css";
moment.locale("he");
const format = "DD/MM/YYYY";
export const EventNearby = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState();

  useEffect(() => {
    const fetchNearbyEvents = async () => {
      try {
        const { data } = await volunteerApi({
          url: "/events/nearby-event",
          method: "GET",
          headers: { Authorization: user.token },
        });
        if (data) {
          const nearbyEvents = data.filter(
            (event) => event.author._id !== user.user._id
          );
          setEvents(nearbyEvents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNearbyEvents();
  }, []);

  const renderRecommendedEvents = () => {
    return events.map(({ eventName, date, address, time, _id }, index) => {
      return (
        <Link to={`/event/${_id}`} key={_id}>
          <hr />
          <div className="recommend-event">
            <h5>{eventName}</h5>
            <div className="content-with-icons">
              <p>
                {time} {moment(date).format(format)}{" "}
              </p>
              <TbCalendarTime />
            </div>
            <p className="content-with-icons">
              {address} <IoLocationSharp />
            </p>
          </div>
          <hr />
          <br />
        </Link>
      );
    });
  };
  return <>{events && renderRecommendedEvents()}</>;
};
