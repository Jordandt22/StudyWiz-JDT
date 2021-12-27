import React from "react";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import AppAuth from "./components/layout/auth/AppAuth";
import NavBar from "./components/layout/nav/NavBar";
import Alert from "./components/layout/alert/Alert";
import LoadingScreen from "./components/layout/loading/LoadingScreen";

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        {/* App Auth */}
        <AppAuth />

        {/* Nav Bar */}
        <NavBar />

        {/* Alerts */}
        <Alert />

        {/* Loading Screen */}
        <LoadingScreen />

        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* Auth */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
