import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

function NotAuthedNav() {
  return (
    <Box className="row">
      <NavLink to="/login" className="login-link">
        Log In
      </NavLink>
      <NavLink to="/signup" className="signup-link">
        Sign Up
      </NavLink>
    </Box>
  );
}

export default NotAuthedNav;
