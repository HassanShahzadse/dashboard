import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Dashboard2 from "../Pages/Dashboard2";
import Login from "../Components/Login";
import Signup from "../Components/SignUp";

const AppRoutes = () => {
  const isAuthenticatedUser = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticatedUser && role === "ADMIN" ? (
            <Dashboard />
          ) : isAuthenticatedUser ? (
            <Dashboard2 />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticatedUser && role === "admin" ? (
            <Dashboard />
          ) : isAuthenticatedUser ? (
            <Dashboard2 />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
