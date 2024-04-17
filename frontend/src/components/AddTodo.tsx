import { useState } from "react";
import { Input } from "./Input";
import { Header } from "./Header";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
 const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
interface TodoProps {
  title: string;
  content: string;
}
export const AddTodo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState<TodoProps>({
    title: "",
    content: "",
  });

  const onClickHandler = async () => {
    if (!localStorage.getItem("token")) {
      alert("Not Loggedin");
      navigate("/signup");
    }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/todo`,
        {
          title: todo.title,
          content: todo.content,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert(res.data.msg);
      navigate("/todos");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="space-y-4 md:w-[800px] w-full mx-5 md:mx-auto bg-slate-100 p-5 rounded-xl shadow-lg justify-center items-center">
          <Header heading={"Add-Todo"} />
          <Input
            label={"Title"}
            placeholder={"title"}
            type={"string"}
            onChange={(e) => {
              setTodo({ ...todo, title: e.target.value });
            }}
          />

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            onChange={(e) => {
              setTodo({ ...todo, content: e.target.value });
            }}
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your content here..."
          ></textarea>

          <Button label={"Add"} onClick={onClickHandler} />
        </div>
      </div>
    </div>
  );
};
