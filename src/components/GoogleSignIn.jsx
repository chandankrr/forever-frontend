import { useCallback } from "react";
import { API_BASE_URL } from "../api/constant.js";
import GoogleIcon from "./Icon/GoogleIcon";

const GoogleSignIn = () => {
  const handleClick = useCallback(() => {
    window.location.href = API_BASE_URL + "/oauth2/authorization/google";
  }, []);

  return (
    <button
      className="inline-flex items-center justify-center gap-2 px-4 py-2 border bg-gray-50"
      onClick={handleClick}
    >
      <GoogleIcon />
      <p>Continue with Google</p>
    </button>
  );
};

export default GoogleSignIn;
