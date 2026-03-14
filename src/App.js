import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Splashscreen from "./pages/Splashscreen";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp"; 
import Login from "./pages/Login";  
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Hygiene from "./pages/Hygiene";
import Games from "./pages/Games";

function ProtectedRoute({ children }) {
  const student = localStorage.getItem('currentStudent');
  if (!student) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin');
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  return (
   <Routes>
    <Route path="/" element={<Splashscreen />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* Protected admin route */}
    <Route path="/admin/dashboard" element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    } />

    {/* Protected student routes */}
    <Route path="/home" element={
      <ProtectedRoute>
        <Hero /><Navbar /><Home />
      </ProtectedRoute>
    } />
    <Route path="/learn" element={
      <ProtectedRoute>
        <Hero /><Navbar /><Learn />
      </ProtectedRoute>
    } />
    <Route path="/hygiene" element={
      <ProtectedRoute>
        <Hero /><Navbar /><Hygiene />
      </ProtectedRoute>
    } />
    <Route path="/games" element={
      <ProtectedRoute>
        <Hero /><Navbar /><Games />
      </ProtectedRoute>
    } />
   </Routes>
  );
}

export default App;