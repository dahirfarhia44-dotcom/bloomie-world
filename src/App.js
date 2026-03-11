import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";  
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Hygiene from "./pages/Hygiene";
import Games from "./pages/Games";

function App() {
  return (

   <Routes>
    {/*1st page to appear*/}
   <Route path="/" element={<SignUp />} />
    
    {/* Main app content after sign up */}
    <Route
    path="/home"
    element={
      <>
      <Hero />
      <Navbar />
      <Home />
      </>
    }
    />
      <Route
    path="/learn"
    element={
      <>
      <Hero />
      <Navbar />
      <Learn />
      </>
    }
    />

    <Route
    path="/hygiene"
    element={
      <>
      <Hero />
      <Navbar />
      <Hygiene />
      </>
    }
    />

    <Route
    path="/games"
    element={
      <>
      <Hero />
      <Navbar />
      <Games />
      </>
    }
    />
   </Routes>
  );
}

export default App;