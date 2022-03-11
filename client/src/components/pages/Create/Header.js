import React from "react";

// MUI
import { Box } from "@mui/material";

function Header(props) {
  return (
    <Box className="header between-row">
      <h3>
        Create a <strong>New Vocab Set</strong>
      </h3>

      <button type="submit" className="create-btn">
        Create
      </button>
    </Box>
  );
}

export default Header;
