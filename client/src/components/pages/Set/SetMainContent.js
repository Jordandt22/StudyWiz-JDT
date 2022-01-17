import React from "react";

// MUI
import { Box } from "@mui/material";

// Components
import MainSideBar from "./main/MainSidebar";

function SetMainContent(props) {
  const {
    set: { title, terms, _id: setId },
  } = props;

  return (
    <Box className="set-main-content-box">
      <h1>{title}</h1>

      <Box className="row">
        <MainSideBar setId={setId} />
      </Box>
    </Box>
  );
}

export default SetMainContent;
