import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create-event", { replace: true });
  };

  const clearUser = () => {
    localStorage.clear();
  };
  return (
    <div className="navbar">
      <div className="events-logos">
        <Link to={"/"}>
          <div className="logo">
            <h2>
              <span style={{ color: "#B0E0A8" }}>מ</span>
              <span style={{ color: "#F3C1C6" }}>ת</span>
              <span style={{ color: "#D8EFF0" }}>נ</span>
              <span style={{ color: "#F0F69F" }}>ד</span>
              <span style={{ color: "#B0E0A8" }}>ב</span>
              <span style={{ color: "#F3C1C6" }}>י</span>
              <span style={{ color: "#D8EFF0" }}>ם</span>
            </h2>
            <img src={require("../../../assets/logo/logo.png")} />{" "}
          </div>
        </Link>

        <ul>
          <li>
            <Link to={"/create-event"}>צור אירוע התנדבות</Link>
          </li>
          <li>
            <Link to={"/my-events"}>ההתנדבויות שלי</Link>
          </li>
          {/* <li>הפרופיל שלי</li> */}
          {/* <li>בדיקה</li>
        <li>בדיקה</li> */}
        </ul>
      </div>
      <ul>
        <li>
          <a href="">הפרופיל שלי</a>
        </li>
        <li onClick={clearUser}>
          <a href="">התנתק</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
