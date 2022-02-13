import React from "react";

// MUI
import { Box } from "@mui/material";

// Components
import ProgressBar from "../../../templates/flashcards/ProgressBar";
import Flashcard from "../../../templates/flashcards/Flashcard";
import FlashcardNavbar from "../../../templates/flashcards/FlashcardNavbar";

function Flashcards(props) {
  const { userSet, setId, terms } = props;

  return (
    <Box className="flashcards-box">
      {/* Progress Bar */}
      <ProgressBar terms={terms} />

      {/* Flashcards */}
      <Flashcard userSet={userSet} setId={setId} terms={terms} />

      {/* Flashcard Nav Bar */}
      <FlashcardNavbar setId={setId} terms={terms} fullscreen={true} />
    </Box>
  );
}

export default Flashcards;
