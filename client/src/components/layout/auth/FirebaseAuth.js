import React from "react";
import { connect } from "react-redux";

// Firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fb } from "../../../firebase/firebase";
import { uiConfig } from "../../../firebase/firebase";

function FirebaseAuth(props) {
  const {
    user: {
      auth: { loggedIn },
    },
  } = props;
  const { firebaseAuth } = fb;

  return (
    <>
      {!loggedIn ? (
        <>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
          <div id="loader">Loading...</div>
        </>
      ) : (
        <div>Already Logged in !</div>
      )}
    </>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(FirebaseAuth);
