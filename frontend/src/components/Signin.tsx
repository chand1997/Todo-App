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
  name: string;
  email: string;
  password: string;
}
export const Signin = () => {
  const navigate = useNavigate();
  const [signinDetails, setSigninDetails] = useState<SigninProps>({
    name: "",
    email: "",
    password: "",
  });
  const onClickEventHandler = async () => {
    try {
      console.log(BACKEND_URL);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signinDetails
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      navigate("/todos");
      alert("Registered!!");
    } catch (e) {
      console.error(e);
      // alert("Something went wrong");
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="space-y-4 w-full max-w-md bg-slate-100 p-5 rounded-xl shadow-lg justify-center items-center">
          <Header heading={"Welcome!! Register Here"} />
          <Input
            label={"Name"}
            placeholder={"JohnDoe"}
            type={"string"}
            onChange={(e) => {
              setSigninDetails({ ...signinDetails, name: e.target.value });
            }}
          />
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
          <Button onClick={onClickEventHandler} label={"Register"} />
          <Footer
            footer={"Already have an account?"}
            linkLabel={"Login"}
            link={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
