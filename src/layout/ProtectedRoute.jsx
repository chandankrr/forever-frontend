import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/jwtHelper";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/login");
    }
  }, [navigate]);
  return <div>{children}</div>;
};

export default ProtectedRoute;
