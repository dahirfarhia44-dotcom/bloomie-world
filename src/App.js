import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Hygiene from "./pages/Hygiene";
import Games from "./pages/Games";

function App() {
  return (
    <div>
      <Hero />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/hygiene" element={<Hygiene />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  );
}

export default App;