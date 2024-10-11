import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/jwtHelper";

const AuthProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      navigate("/");
    }
  }, [navigate]);
  return <div>{children}</div>;
};

export default AuthProtectedRoute;
