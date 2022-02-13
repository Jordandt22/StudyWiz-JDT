import React from "react";
import { connect } from "react-redux";

// React Router
import { NavLink } from "react-router-dom";

// Redux
import { signOut } from "../../../redux/user/user.actions";

// MUI
import { Box } from "@mui/material";
import { ClickAwayListener } from "@mui/material";

// Contexts
import { useNav } from "../../../context/nav/Nav.context";

// Components
import UserPhoto from "../../templates/UserPhoto";

function UserNavMenu(props) {
  const {
    user: {
      displayName,
      email,
      photoURL,
      auth: { fbId },
    },
    signOut,
  } = props;
  const { contentLinks, siteInfoLinks, toggleMenu } = useNav();

  return (
    <ClickAwayListener onClickAway={toggleMenu}>
      <Box className="user-menu">
        {/* Menu Header */}
        <header className="user-menu-header row">
          <UserPhoto
            fbId={fbId}
            displayName={displayName}
            photoURL={photoURL}
          />
          <Box className="user-info">
            <h3 className="text-overflow">{displayName}</h3>
            <h4 className="text-overflow">{email}</h4>
          </Box>
        </header>

        {/* Content Links */}
        <Box className="user-menu-links-box">
          {contentLinks.map((link) => {
            const { label, path } = link;

            return (
              <NavLink
                to={path}
                key={label + "-user-menu-link"}
                className="user-menu-link"
                onClick={toggleMenu}
              >
                {label}
              </NavLink>
            );
          })}
        </Box>

        {/* Site Info Links */}
        <Box className="user-menu-links-box">
          {siteInfoLinks.map((link) => {
            const { label, path } = link;

            return (
              <NavLink
                to={path}
                key={label + "-user-menu-link"}
                className="user-menu-link"
                onClick={toggleMenu}
              >
                {label}
              </NavLink>
            );
          })}
        </Box>

        {/* Sign Out */}
        <Box className="user-menu-links-box">
          <Box
            className="signout-btn"
            onClick={() => {
              toggleMenu();
              signOut();
            }}
          >
            Sign Out
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

const ReduxActions = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(ReduxState, ReduxActions)(UserNavMenu);
