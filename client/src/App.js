import React from "react";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// MUI
import { useMediaQuery } from "@mui/material";

// Components
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import AppAuth from "./components/layout/auth/AppAuth";
import NavBar from "./components/layout/nav/NavBar";
import Alert from "./components/layout/alert/Alert";
import LoadingScreen from "./components/layout/loading/LoadingScreen";
import Community from "./components/pages/Community/Community";
import Search from "./components/pages/Search/Search";
import Sets from "./components/pages/Sets/Sets";
import ProtectedRoute from "./components/layout/auth/ProtectedRoute";
import NotFound from "./components/pages/NotFound/NotFound";
import ComingSoon from "./components/pages/ComingSoon/ComingSoon";
import Set from "./components/pages/Set/Set";
import Create from "./components/pages/Create/Create";
import Edit from "./components/pages/Edit/Edit";
import Flashcards from "./components/pages/Flashcards/Flashcards";
import SmallDeviceAlert from "./components/layout/alert/SmallDeviceAlert";

function App() {
  const isSmallDevice = useMediaQuery("(max-width:767px)", { noSsr: true });
  if (isSmallDevice) {
    return (
      <div id="App">
        <SmallDeviceAlert />
      </div>
    );
  }

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

        {/* Routes */}
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* Auth & User */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/settings" element={<ComingSoon />} />

          {/* Extra */}
          <Route exact path="/about" element={<ComingSoon />} />
          <Route exact path="/tos" element={<ComingSoon />} />
          <Route exact path="/privacy" element={<ComingSoon />} />

          {/* Community */}
          <Route
            exact
            path="/community"
            element={<ProtectedRoute Component={<Community />} />}
          />
          <Route
            exact
            path="/search/:query"
            element={<ProtectedRoute Component={<Search />} />}
          />

          {/* Sets */}
          <Route
            exact
            path="/create"
            element={<ProtectedRoute Component={<Create />} />}
          />
          <Route
            exact
            path="/edit"
            element={<ProtectedRoute Component={<Edit />} />}
          />
          <Route
            exact
            path="/sets"
            element={<ProtectedRoute Component={<Sets />} />}
          />
          <Route
            exact
            path="/set/:setId"
            element={<ProtectedRoute Component={<Set />} />}
          />
          <Route exact path="/schedule" element={<ComingSoon />} />

          {/* Study Tools & Games */}
          <Route
            exact
            path="/set/:setId/flashcards"
            element={<ProtectedRoute Component={<Flashcards />} />}
          />
          <Route exact path="/set/:setId/match" element={<ComingSoon />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
