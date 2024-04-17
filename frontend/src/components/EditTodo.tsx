import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import { NavBar } from "./NavBar";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UpdateTodoProps {
  title?: string;
  content?: string;
}
export const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateTodo, setUpdateTodo] = useState<UpdateTodoProps>({
    title: "",
    content: "",
  });
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/todo/id/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data.todo.title);
      setUpdateTodo({
        ...updateTodo,
        content: res.data.todo.content,
        title: res.data.todo.title,
      });
    })();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-screen font-mono -mt-20">
        <div className="space-y-4 w-full md:w-[400px] bg-slate-100 p-5 rounded-xl shadow-lg justify-center items-center">
          <div className="text-xl text-center">Edit-Todo</div>

          <TextArea
            label={"Title"}
            value={updateTodo.title || ""}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />

          <TextArea
            label={"Content"}
            value={updateTodo.content || ""}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, content: e.target.value });
            }}
          />
          <Button
            label={"Save"}
            onClick={async () => {
              try {
                const res = await axios.put(
                  `${BACKEND_URL}/api/v1/todo`,
                  {
                    id,
                    title: updateTodo.title,
                    content: updateTodo.content,
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
                alert("Something went wrong");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
