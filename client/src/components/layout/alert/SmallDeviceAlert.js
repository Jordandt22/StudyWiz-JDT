import React from "react";

// MUI
import { Container } from "@mui/material";

function SmallDeviceAlert() {
  return (
    <Container className="small-device-alert">
      <h1>StudyWiz</h1>
      <p>
        Sorry, a version for smaller devices has not been made yet. For now,
        please use a device with a larger screen to access this site.
      </p>
      <strong>Thank You!</strong>
    </Container>
  );
}

export default SmallDeviceAlert;
