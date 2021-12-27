import React from "react";

// MUI
import { Box } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

function ErrorBox(props) {
  const { message } = props;

  return (
    <Box className="error-box">
      <Box className="row">
        <ErrorOutline className="icon" />
        <h4>Error</h4>
      </Box>
      <p>{message}</p>
    </Box>
  );
}

export default ErrorBox;
