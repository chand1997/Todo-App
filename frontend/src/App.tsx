import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AddTodo } from "./components/AddTodo";
import { Todos } from "./components/Todos";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { EditTodo } from "./components/EditTodo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

