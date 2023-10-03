import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithGuard = ({ children, info }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fname = localStorage.getItem("fname");

  useEffect(() => {
    !token && navigate("/login");
    info === "completeInfo" && fname && navigate("/profile");
  }, [token, info, navigate, fname]);

  return children;
};

export default WithGuard;
