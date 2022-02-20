import React from "react";

// MUI
import { Box } from "@mui/material";
import { VolumeUp, StarBorderOutlined } from "@mui/icons-material";

// Contexts
import { useSpeech } from "../../../context/speech/Speech.context";

function FlashcardUtilBar(props) {
  const { audioFrom, text, userSet, setId, termId } = props;
  // const userSetTerm = userSet.favoriteTerms;
  const { textToSpeech, speech } = useSpeech();

  return (
    <Box className="fc-util-bar center-vertical">
      {/* Audio */}
      <button
        variant="button"
        className={`audio-btn ${
          speech.audioFrom === audioFrom ? "active" : "not-active"
        }`}
        onClick={() => textToSpeech(audioFrom, text, "en-US")}
      >
        <VolumeUp className="icon" />
      </button>

      {/* Favorite */}
      <button variant="button" className="favorite-btn">
        <StarBorderOutlined className="icon" />
      </button>
    </Box>
  );
}

export default FlashcardUtilBar;
