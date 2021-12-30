import React from "react";

// MUI
import { Box } from "@material-ui/core";

function CommunityDisplay(props) {
  const { title, children, className } = props;

  return (
    <Box className={"community-display " + className}>
      <h2>{title}</h2>

      {/* Content */}
      {children}
    </Box>
  );
}

export default CommunityDisplay;
