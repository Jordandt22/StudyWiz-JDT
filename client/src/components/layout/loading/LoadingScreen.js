import React from "react";
import { connect } from "react-redux";

// MUI
import { Backdrop } from "@mui/material";

// Components
import LoadingSpinner from "./LoadingSpinner";

function LoadingScreen(props) {
  const {
    global: {
      loading: { isLoading, loadingText },
    },
  } = props;

  return (
    <Backdrop className="loading-screen center-vertical" open={isLoading}>
      <LoadingSpinner />
      <p>{loadingText}</p>
    </Backdrop>
  );
}

// Redux
const ReduxState = (state) => ({
  global: state.global,
});

export default connect(ReduxState)(LoadingScreen);
