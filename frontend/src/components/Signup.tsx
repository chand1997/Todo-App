import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Header } from "./Header";
import { Footer } from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { NavBar } from "./NavBar";
interface SigninProps {
  email: string;
  password: string;
}
export const Signup = () => {
  const navigate = useNavigate();
  const [signinDetails, setSigninDetails] = useState<SigninProps>({
    email: "",
    password: "",
  });
  const onClickEventHandler = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinDetails
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      navigate("/todos");
      alert("LoggedIn!!!");
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="space-y-4 w-full max-w-md bg-slate-100 p-5 rounded-xl shadow-lg justify-center items-center">
          <Header heading={"Welcome!! Login Here"} />

          <Input
            label={"Email"}
            placeholder={"JohnDoe@dev.in"}
            type={"email"}
            onChange={(e) => {
              setSigninDetails({ ...signinDetails, email: e.target.value });
            }}
          />
          <Input
            label={"Password"}
            placeholder={"*******"}
            type={"password"}
            onChange={(e) => {
              setSigninDetails({ ...signinDetails, password: e.target.value });
            }}
          />
          <Button onClick={onClickEventHandler} label={"Login"} />
          <Footer
            footer={"Don't have an account?"}
            linkLabel={"Register"}
            link={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
