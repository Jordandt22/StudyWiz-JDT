import React, { useEffect } from "react";
import { connect } from "react-redux";

// MUI
import { Alert as AlertComponent, AlertTitle } from "@mui/material";
import { Box } from "@mui/material";

// Redux
import { resetAlert } from "../../../redux/global/global.actions";

function Alert(props) {
  const {
    global: {
      alert: { open, message, duration, title, severity },
    },
    resetAlert,
  } = props;

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        resetAlert();
      }, duration);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {open && (
        <Box className="alert-box">
          <AlertComponent severity={severity} onClose={resetAlert}>
            <AlertTitle>{title}</AlertTitle>
            <p>{message}</p>
          </AlertComponent>
        </Box>
      )}
    </>
  );
}

// Redux
const ReduxState = (state) => ({
  global: state.global,
});

const ReduxActions = (dispatch) => ({
  resetAlert: () => dispatch(resetAlert()),
});

export default connect(ReduxState, ReduxActions)(Alert);
