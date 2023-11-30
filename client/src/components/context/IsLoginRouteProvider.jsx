import React, { useState, useEffect } from "react";
import IsLoginRouteContext from "./IsLoginRouteContext";
import { useNavigate } from "react-router-dom";

const IsLoginRouteProvider = ({ children }) => {
  const [isLoginRoute, setIsLoginRoute] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = window.location.pathname;
    const updatedIsLoginRoute = pathname === "/adminlogin" || pathname === "/userlogin";

    if (isLoginRoute !== updatedIsLoginRoute) {
      setIsLoginRoute(updatedIsLoginRoute);
      navigate(pathname, { replace: true }); // Use `replace: true` to avoid adding a new entry to the browser history
    }
  }, [window.location.pathname]);

  return (
    <IsLoginRouteContext.Provider value={{ isLoginRoute }}>{children}</IsLoginRouteContext.Provider>
  );
};

export default IsLoginRouteProvider;
