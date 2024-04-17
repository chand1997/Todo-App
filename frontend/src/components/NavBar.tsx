import { NavBarElement } from "./NavBarElement";
import { LogoutButton } from "./LogoutButton";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const params = window.location.pathname.split("/");

  return (
    <div className="flex items-center justify-between bg-slate-100 p-4 font-mono space-x-1">
      <div className="flex items-center ">
        <div className="bg-black text-white text-xl px-4 py-2 rounded-md italic">
          <Link to={"/"} className="text-white">
            Todo
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        {params.includes("todos") && (
          <>
            <NavBarElement to={"/add-todo"} label={"AddTodo"} />
            <LogoutButton />
          </>
        )}
        {params.includes("add-todo") && (
          <>
            <NavBarElement to={"/todos"} label={"MyTodos"} />
            <LogoutButton />
          </>
        )}
        {params.includes("signin") && (
          <>
            <NavBarElement to={"/signup"} label={"Login"} />
          </>
        )}
        {params.includes("signup") && (
          <>
            <NavBarElement to={"/signin"} label={"Register"} />
          </>
        )}
        {params.includes("edit") && (
          <>
            <NavBarElement to={"/todos"} label={"MyTodos"} />
            <LogoutButton />
          </>
        )}
      </div>
    </div>
  );
};
