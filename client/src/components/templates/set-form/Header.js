import React from "react";

// MUI
import { Box } from "@mui/material";

function Header(props) {
  const { title, btnText, } = props;

  return (
    <Box className="header between-row">
      {title}

      <button type="submit" className="create-btn">
        {btnText}
      </button>
    </Box>
  );
}

export default Header;
