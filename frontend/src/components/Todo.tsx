import { useNavigate } from "react-router-dom";
import { TodoProps } from "./Todos";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { CustomButton } from "./CustomButton";

export const Todo = ({ id, title, content }: TodoProps) => {
  const navigate = useNavigate();
  const onClickDeleteHandler = async () => {
    const result = confirm("Are you sure??");
    if (!result) {
      return;
    }
    const res = await axios.delete(`${BACKEND_URL}/api/v1/todo/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    alert(res.data.msg);
    navigate("/todos");
  };
  return (
    <div key={id} className="bg-gray-200 rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">{content}</p>
      <div className="flex items-center space-x-4">
        <CustomButton
          type={"Edit"}
          onClick={() => {
            navigate(`/edit/${id}`);
          }}
        />
        <CustomButton type={"Delete"} onClick={onClickDeleteHandler} />
      </div>
    </div>
  );
};
