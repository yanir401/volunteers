import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import volunteerApi from "../../../apis/volunteerApi";
import Spinner from "../../../components/spinner/Spinner";
import { useAuth } from "../../../context/auth-context";
import "./eventItem.css";

const EventItem = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [myEvent, setMyEvent] = useState(false);
  const [alreadySign, setAlreadySign] = useState(false);
  const [eventMsg, setEventMsg] = useState(false);

  const fetchEvent = async () => {
    try {
      const { data } = await volunteerApi({
        url: `/events/event/`,
        method: "GET",
        params: { id },
        headers: { Authorization: user.token },
      });
      setEvent(data);

      if (data.author._id === user.user._id)
        setEventMsg("אירוע התנדבות נוצר על ידך");
      else {
        const isVolunteers = data.volunteers.find(
          (volunteerId) => volunteerId === user.user._id
        );
        if (isVolunteers) setEventMsg("נרשמת להתנדבות זו");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, []);

  const handleClick = async () => {
    const isVolunteers = event.volunteers.find(
      (volunteerId) => volunteerId === user.user._id
    );
    if (!isVolunteers)
      try {
        const { status } = await volunteerApi({
          url: `/events/joinToEvent/`,
          method: "PATCH",
          headers: { Authorization: user.token },
          params: event,
        });
        fetchEvent();
      } catch (error) {
        console.log(error);
      }
    else {
      console.log("object");
      setMyEvent("נרשמת בהצלחה");
    }
  };
  return (
    <div className="flex flex-col event-container">
      {event ? (
        <>
          <h2>התנדבות באיזור שלך</h2>
          <div className="card event-item">
            <h3>{event.eventName}</h3>
            <p>{event.summary}</p>
            <p>
              <span>בתאריך: </span>
              {event.dateString}
            </p>
            <p>
              <span>בשעה:</span> {event.time}
            </p>
            <p>
              <span>כתובת:</span> {event.address}
            </p>
            <p>
              <span>מספר המתנדבים כרגע:</span> {event.volunteers.length}
            </p>
            {!eventMsg ? (
              <button className="btn btn-purple" onClick={handleClick}>
                אני רוצה להתנדב
              </button>
            ) : (
              <p className="text-bold-size-2-2 text-purple ">{eventMsg}</p>
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default EventItem;
