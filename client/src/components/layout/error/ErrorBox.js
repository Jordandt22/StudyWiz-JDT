import React from "react";

// MUI
import { Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

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
