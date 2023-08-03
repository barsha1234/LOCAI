import React from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/" element={<Landing />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
