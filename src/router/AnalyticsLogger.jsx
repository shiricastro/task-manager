import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsLogger = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pathname.startsWith("/task") ? "Task Management Page" : "Home Page";
    console.log(`User visited: ${page}`);
  }, [pathname]);

  return null;
};

export default AnalyticsLogger;
