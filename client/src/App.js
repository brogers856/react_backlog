import "bootstrap/dist/css/bootstrap.css";
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavHeader, Home, NotFound, NavFooter, Auth, Register, Login, UserContext } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { useNavigate } from "react-router";

function App() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
        <NavHeader />
        <ToastContainer />
        <Routes>
          {context.state
            ? <Route index element={<Home />} />
            : <Route index element={<Auth />} />
          }
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <NavFooter />
    </>
  );
}

export default App;
