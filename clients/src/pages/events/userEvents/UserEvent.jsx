import React, { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import volunteerApi from "../../../apis/volunteerApi";
import Spinner from "../../../components/spinner/Spinner";
import { useAuth } from "../../../context/auth-context";
import "./userEvent.css";
const UserEvent = () => {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState();

  const fetchEvents = async () => {
    const userObj = user;

    try {
      const { data } = await volunteerApi({
        url: `/events/userEvents/`,
        method: "GET",
        headers: { Authorization: user.token },
      });
      setUserEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderUserEvents = () => {
    return userEvents.map((event) => {
      return (
        <div className="user-event text-bold-size-1-8">
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
        </div>
      );
    });
  };

  const handleClick = async (eventId) => {
    try {
      const { status } = await volunteerApi({
        url: `/events/leaveEvent/`,
        method: "PATCH",
        headers: { Authorization: user.token },
        params: { eventId },
      });
      if (status === 200) fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };
  const renderUserEvents2 = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="title-row">
              <TableCell align="right">
                {" "}
                <span>שם האירוע</span>
              </TableCell>
              <TableCell align="right">
                <span>כתובת</span>
              </TableCell>
              <TableCell align="right">
                <span>תאריך</span>
              </TableCell>
              <TableCell align="right">
                <span>שעה</span>
              </TableCell>
              <TableCell align="center">
                <span>מספר המתנדבים כרגע</span>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userEvents.map((event) => (
              <TableRow
                key={event._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" component="th" scope="row">
                  <span className="event-content">{event.eventName}</span>
                </TableCell>
                <TableCell align="right">
                  <span className="event-content">{event.address} </span>
                </TableCell>
                <TableCell align="right">
                  <span className="event-content"> {event.dateString}</span>
                </TableCell>
                <TableCell align="right">
                  <span className="event-content">{event.time} </span>
                </TableCell>
                <TableCell align="center">
                  <span className="event-content">
                    {" "}
                    {event.volunteers.length}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <button
                    className="btn btn-lightPrimary leave-btn"
                    onClick={() => handleClick(event._id)}
                  >
                    עזוב התנדבות
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <div className="user-events-container">
      <h2>ההתנדבויות שלי</h2>
      <div className="table-wrapper">
        {userEvents ? renderUserEvents2() : <Spinner />}
      </div>
    </div>
  );
};

export default UserEvent;
