import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";
import { AuthProvider, useAuth } from "../context/auth-context";
import EventItem from "../pages/events/eventPage/EventItem";
import { NewEvent } from "../pages/events/NewEvent";
import UserEvent from "../pages/events/userEvents/UserEvent";
import HomePage from "../pages/homePage/HomePage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoutes from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-event" element={<NewEvent />} />
          <Route path="/event/:id" element={<EventItem />} />
          <Route path="/my-events" element={<UserEvent />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
