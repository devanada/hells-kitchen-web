import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import Homepage from "@pages";
import Profile from "@pages/Profile";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";

import { ThemeContext } from "@utils/context";

axios.defaults.baseURL = "https://hells-kitchen.onrender.com/api/v1";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const [cookie] = useCookies(["token"]);
  const checkToken = cookie.token;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: checkToken ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: checkToken ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/u/:username",
      element: <Profile />,
    },
  ]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
