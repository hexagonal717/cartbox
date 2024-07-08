import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogInRedirectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  return <div>You will be redirected to the Login Page.</div>;
};

export default LogInRedirectPage;
