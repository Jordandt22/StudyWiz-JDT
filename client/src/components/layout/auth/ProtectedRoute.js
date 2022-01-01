import React from "react";
import { connect } from "react-redux";

// React Router
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const {
    user: {
      auth: { loggedIn },
    },
    Component,
  } = props;

  if (!loggedIn) {
    return <Navigate to="/login" />;
  } else {
    return Component;
  }
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

export default connect(ReduxState)(ProtectedRoute);
