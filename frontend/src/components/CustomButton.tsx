import { MouseEventHandler } from "react";

interface CustomButtonProps {
  type: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export const CustomButton = ({ type, onClick }: CustomButtonProps) => {
  let bg;
  switch (type) {
    case "Edit":
      bg = "bg-blue-500 hover:bg-blue-600";
      break;
    case "Delete":
      bg = "bg-red-500 hover:bg-red-600";
      break;
    default:
      bg = "bg-blue-500 hover:bg-blue-600";
  }
  return (
    <button
      onClick={onClick}
      className={`${bg}  text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out `}
    >
      {type}
    </button>
  );
};
