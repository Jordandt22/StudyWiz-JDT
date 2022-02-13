import React from "react";

// MUI
import { Box } from "@mui/material";
import { VolumeUp, StarBorderOutlined } from "@mui/icons-material";

// Speech
import { textToSpeech } from "../../../config/speech.config";

function FlashcardUtilBar(props) {
  const { userSet, setId, termId, text } = props;
  // const userSetTerm = userSet.favoriteTerms;

  return (
    <Box className="fc-util-bar center-vertical">
      {/* Audio */}
      <button
        variant="button"
        className={`audio-btn`}
        onClick={() => textToSpeech(text)}
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
