import React from "react";
import { connect } from "react-redux";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";

// Components
import UserPhoto from "../../templates/UserPhoto";
import SetsFilter from "./SetsFilter";
import SetsWrapper from "./SetsWrapper";

function Sets(props) {
  const {
    user: {
      displayName,
      email,
      photoURL,
      auth: { fbId },
    },
  } = props;

  return (
    <Container className="page-container sets-container">
      {/* User Profile */}
      <Box className="between-row">
        <Box className="profile-box row">
          <UserPhoto
            alt="sets-profile-photo"
            photoURL={photoURL}
            displayName={displayName}
            fbId={fbId}
          />
          <Box className="profile-info">
            <h2>{displayName}</h2>
            <p>{email}</p>
          </Box>
        </Box>

        {/* Create Link */}
        <NavLink to="/create" className="primary-btn">
          Create Set
        </NavLink>
      </Box>

      {/* Filter */}
      <SetsFilter />

      {/* Sets */}
      <SetsWrapper />
    </Container>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(Sets);
