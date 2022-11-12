import React from "react";
import { connect } from "react-redux";

// MUI
import { Box } from "@mui/material";
import { Close } from "@mui/icons-material";

// Contexts
import { useNav } from "../../../context/nav/Nav.context";

// Components
import UserPhoto from "../../templates/UserPhoto";
import UserNavMenu from "./UserNavMenu";
import NavSearchBar from "./NavSearchBar";

function AuthedNav(props) {
  const {
    user: {
      displayName,
      photoURL,
      auth: { fbId },
    },
  } = props;
  const { menuOpen, toggleMenu } = useNav();

  return (
    <Box className="row">
      {/* Search Bar */}
      <NavSearchBar />

      {/* User Profile Photo */}
      {!menuOpen ? (
        <UserPhoto
          onClick={toggleMenu}
          alt="nav-user-photo"
          displayName={displayName}
          photoURL={photoURL}
          className="nav-user-photo"
          fbId={fbId}
        />
      ) : (
        <Close className="nav-user-close" onClick={toggleMenu} />
      )}

      {/* User Menu */}
      {menuOpen && <UserNavMenu />}
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(AuthedNav);
