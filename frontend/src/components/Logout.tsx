import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to login page
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
