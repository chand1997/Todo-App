import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      label={"Logout"}
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        alert("Logged out");
        navigate("/");
      }}
    />
  );
};
