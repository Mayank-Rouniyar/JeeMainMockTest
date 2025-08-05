import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import { useEffect } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Attempt from "./pages/Attempt.jsx";
import Result from "./pages/Result.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CreateTest from "./pages/CreateTest.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attempt/:testId" element={<Attempt />} />
      <Route path="/test/:testId/result" element={<Result />} />
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
      <Route path="/create" element={<CreateTest/>}/>
    </Routes>
  );
}
export default App;
