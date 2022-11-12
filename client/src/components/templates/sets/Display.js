import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

function Display(props) {
  const { title, children, link } = props;

  return (
    <Box className="display-box">
      <h3>{title}</h3>

      {/* Children Component */}
      {children}

      {/* View More Link */}
      {link && (
        <NavLink to={link.path} className="display-link primary-btn">
          {link.label}
        </NavLink>
      )}
    </Box>
  );
}

export default Display;
