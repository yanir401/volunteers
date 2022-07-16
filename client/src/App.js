import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./style/globalStyle.css";
import "./style/general.css";
import { useContext, useEffect, useState } from "react";
import PrivateRoutes from "./routes/PrivateRoute";
import { AuthProvider, useAuth } from "./context/auth-context";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const { user, login } = useAuth();

  useEffect(() => {
    setLoading(true);
    const isUser = JSON.parse(localStorage.getItem("userData"));
    if (isUser) {
      login(isUser);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        "loading.."
      ) : (
        <div className="app">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
