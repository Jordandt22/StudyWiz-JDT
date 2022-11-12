import React, { useEffect } from "react";

// MUI
import { Box } from "@mui/material";

function CustomAlert(props) {
  const { showAlert, closeAlert, duration, icon, message, className } = props;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        closeAlert();
      }, duration);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <Box className={"custom-alert row " + className}>
          {icon}
          <p>{message}</p>
        </Box>
      )}
    </>
  );
}

export default CustomAlert;
