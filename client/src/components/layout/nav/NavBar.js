import React from "react";
import { connect } from "react-redux";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@material-ui/core";

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
