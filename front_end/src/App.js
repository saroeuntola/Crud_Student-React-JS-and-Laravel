import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import AddStudent from "./components/Add/AddStudent";
import Students from "./components/Students";
import Edit from "./components/Edit/Edit";
import Navbar from "./components/Navbar/Navbar";
import Index from "./components/Index";
import Swal from 'sweetalert2'
import Register from "./components/auth/Register";
import Contact from "./components/Contect/Contact";
import About from "./components/about/About";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const getToken = localStorage.getItem("token");
    return Boolean(getToken);
  });

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    console.log("User logged out");
    window.location.href = "/";
  };

  const ProtectedRoute = ({element }) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You need to be logged in to access this page."
      })
      return <Navigate to="/login" />;
    }
    return element;
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        {/* Public routes */}
        <Route path="*" element={<Index />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Students />} />
        <Route path="/about" element={<About/>} />

        {/* PrvateRoute */}
        <Route
          path="/add/student"
          element={<ProtectedRoute element={<AddStudent />} />}
        />
        <Route
          path="/student/edit/:id"
          element={<ProtectedRoute element={<Edit />} />}
        />
        <Route
          path= "/contact" 
          element={<ProtectedRoute element={<Contact/>}/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
