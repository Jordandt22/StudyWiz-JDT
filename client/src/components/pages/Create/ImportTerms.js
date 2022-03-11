import React from "react";

// MUI
import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";

function ImportTerms() {
  return (
    <Box className="import-terms-box">
      <button type="button" className="import-terms-btn row">
        <Add className="icon" />
        Import Terms and Definitions
      </button>
    </Box>
  );
}

export default ImportTerms;
