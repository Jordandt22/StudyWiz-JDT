import React from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

// Components
import ProgressBar from "../../templates/flashcards/ProgressBar";

function FlashcardsSideBar(props) {
  const {
    shuffle,
    setShuffle,
    set: { _id, title, terms },
  } = props;

  return (
    <aside className="flashcards-sidebar">
      <NavLink to={`/set/${_id}`} className="back-link row">
        <ArrowBackIos className="icon" /> Back
      </NavLink>

      <Box className="sidebar-content">
        <Box className="title-box">
          <h5>FLASHCARDS</h5>
          <h3>{title}</h3>
          <ProgressBar terms={terms} />
        </Box>

        <button
          type="button"
          className={`shuffle-btn center ${shuffle ? "active" : "not-active"}`}
          onClick={() => setShuffle((prevShuffle) => !prevShuffle)}
        >
          <ion-icon name="shuffle-outline"></ion-icon>
          Shuffle
        </button>
      </Box>
    </aside>
  );
}

export default FlashcardsSideBar;
