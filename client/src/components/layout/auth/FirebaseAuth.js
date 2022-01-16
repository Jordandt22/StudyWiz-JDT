import React, { useEffect } from "react";
import { connect } from "react-redux";

// React Router
import { useNavigate } from "react-router-dom";

// Firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fb } from "../../../firebase/firebase";
import { uiConfig } from "../../../firebase/firebase";

// MUI
import { Container, Box } from "@material-ui/core";

function FirebaseAuth(props) {
  const {
    user: {
      auth: { loggedIn, fbId },
    },
    formTitle,
  } = props;
  const { firebaseAuth } = fb;
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && fbId) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, fbId]);

  return (
    <Container className="auth-container center">
      <Box className="auth-box">
        <h2>
          {formTitle} <span>StudyWiz</span>
        </h2>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        <div id="loader">Loading...</div>
      </Box>
    </Container>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(FirebaseAuth);
