import axios from "axios";
import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Todo } from "./Todo";
import { NavBar } from "./NavBar";
import { useNavigate } from "react-router-dom";

export interface TodoProps {
  id: string;
  title: string;
  content: string;
}

export const Todos = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [todos, setTodos] = useState<TodoProps[]>([]);
  useEffect(() => {
    if (!userId) {
      alert("User id not found");
      navigate("/signup");
    }
    if (!localStorage.getItem("token")) {
      alert("Not Loggedin");
      navigate("/signup");
    }
    (async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/todo/userId/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setTodos(res.data.todos);
        if (res.data.todos.length === 0) {
          alert("You have not added anything yet!");
          navigate("/add-todo");
        }
      } catch (e) {
        alert("Something went wrong!");
      }
    })();
  }, []);

  return (
    <div className="space-y-5">
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-5 font-mono">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
          />
        ))}
      </div>
    </div>
  );
};
