import React from "react";
import { connect } from "react-redux";

// MUI
import { Box } from "@mui/material";

// Components
import MainSideBar from "./main/MainSidebar";
import Flashcards from "./main/Flashcards";
import SetCreator from "./creator/SetCreator";

function SetMainContent(props) {
  const {
    sets: { sets },
    set: { title, terms, _id: setId },
  } = props;
  const userSet = sets.filter((set) => set.setId === setId)[0];

  return (
    <Box className="set-main-content-box">
      <h1>{title}</h1>

      {/* Main */}
      <main>
        <Box className="main-content">
          <MainSideBar setId={setId} />

          <Flashcards userSet={userSet} setId={setId} terms={terms} />
        </Box>
      </main>

      {/* Creator */}
      <SetCreator userSet={userSet} setId={setId} />
    </Box>
  );
}

// Redux
const ReduxState = (state) => ({
  sets: state.sets,
});

export default connect(ReduxState)(SetMainContent);
