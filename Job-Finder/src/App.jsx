import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Candidate from "./components/Candidate";
import Home from "./components/Home";
import Registration from "./components/registration";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

  const ProtectedRoute = ({ role, children }) => {
    if (userRole !== role) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} onLogout={handleLogout} />
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            userRole ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/candidate"} />
            ) : (
              <Home />
            )
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            userRole ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/candidate"} />
            ) : (
              <Login setUserRole={setUserRole} />
            )
          }
        />R
        {/* Registration Page */}
        <Route path="/registration" element={<Registration />} />

        {/* Admin Portal */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Candidate Portal */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute role="candidate">
              <Candidate />
            </ProtectedRoute>
          }
        />

        {/* Logout */}
        <Route path="/logout" element={<Navigate to="/login" />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
