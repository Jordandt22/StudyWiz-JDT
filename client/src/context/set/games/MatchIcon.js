import React from "react";

// MUI
import { Box } from "@mui/material";

function MatchIcon() {
  return (
    <Box className="match-icon center-vertical">
      <Box id="main-mt-rect" className="mt-rect center">
        <div></div>
      </Box>
      <Box className="bottom-row row">
        <Box id="left-mt-rect" className="mt-rect center">
          <div></div>
        </Box>
        <Box id="right-mt-rect" className="mt-rect center">
          <div></div>
        </Box>
      </Box>
    </Box>
  );
}

export default MatchIcon;
