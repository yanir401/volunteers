import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";
import { useAuth } from "../context/auth-context";

const PrivateRoutes = ({ currentUser }) => {
  const [user, setUser] = useState(null);
  const auth = useAuth();

  //   return user ? <Outlet /> : <Navigate to={"/register"} />;
  return auth.user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/register"} />
  );
};

export default PrivateRoutes;

// if (!auth.user) {
//   auth.login(user);
// } else user = auth;

// console.log("auth", user, auth);
