import React, { useEffect } from "react";
import { connect } from "react-redux";

// React Router
import { NavLink, useLocation } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import AuthedNav from "./AuthedNav";
import NotAuthedNav from "./NotAuthedNav";

function NavBar(props) {
  const {
    user: {
      auth: { loggedIn },
    },
  } = props;
  const navLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Community",
      path: "/community",
    },
    {
      label: "Vocab Sets",
      path: "/sets",
    },
    {
      label: "Schedule",
      path: "/schedule",
    },
  ];

  // Resetting Scroll Position on Page Change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <header
      id={loggedIn ? "authed-nav" : "not-authed-nav"}
      className="nav-bar between-row"
    >
      <Box className="row">
        <NavLink to="/" className="nav-title">
          StudyWiz
        </NavLink>

        {/* Nav Link */}
        {navLinks.map((link) => {
          const { label, path } = link;

          return (
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : "not-active"}`
              }
              to={path}
              key={label + "-nav-link"}
            >
              {label}
            </NavLink>
          );
        })}
      </Box>

      {/* Authed Section */}
      {loggedIn ? <AuthedNav /> : <NotAuthedNav />}
    </header>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(NavBar);
