import React from "react";

// MUI
import { Box } from "@mui/material";
import { VolumeUp, StarBorderOutlined, StarRate } from "@mui/icons-material";

// Contexts
import { useSpeech } from "../../../context/speech/Speech.context";
import { useAPISocket } from "../../../context/api-socket/APISocket.context";

function FlashcardUtilBar(props) {
  const { audioFrom, text, userSet, setId, termId } = props;
  const favorite = userSet?.favoriteTerms.some((term) => term.termId === termId);
  const { textToSpeech, speech } = useSpeech();
  const { APISocket, favoriteTerm } = useAPISocket();

  return (
    <Box className="fc-util-bar center-vertical">
      {/* Audio */}
      <button
        variant="button"
        className={`audio-btn ${
          speech.audioFrom === audioFrom ? "active" : "not-active"
        }`}
        onClick={() => textToSpeech(audioFrom, text)}
      >
        <VolumeUp className="icon" />
      </button>

      {/* Favorite */}
      <button
        variant="button"
        className="favorite-btn"
        onClick={() => favoriteTerm(APISocket.current, setId, termId)}
      >
        {!favorite ? (
          <StarBorderOutlined className="icon" />
        ) : (
          <StarRate className="icon fav-icon" />
        )}
      </button>
    </Box>
  );
}

export default FlashcardUtilBar;
