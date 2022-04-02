import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Contexts
import { useSet } from "../../../context/set/Set.context";
import { useSpeech } from "../../../context/speech/Speech.context";

// Components
import FlashcardUtilBar from "./FlashcardUtilBar";

function Flashcard(props) {
  const { userSet, setId, terms } = props;
  const {
    terms: {
      currentTerm: { pos, showTerm },
      flipCard,
    },
  } = useSet();
  const { cancelTextToSpeech } = useSpeech();
  const {
    term,
    definition,
    _id: termId,
  } = terms[pos]
    ? terms[pos]
    : {
        term: "Unknown Term",
        definition: "Unknown Definition",
        _id: "Unknown ID",
      };

  return (
    <Container className="fc-container">
      <Box
        className={`flipper fc-box ${showTerm ? "normal" : "flip"}`}
        onClick={() => {
          cancelTextToSpeech();
          flipCard();
        }}
      >
        <div className="front-card current-fc center">
          <p className="term">{term}</p>
        </div>
        <div className="back-card current-fc center">
          <p className="definition">{definition}</p>
        </div>
      </Box>

      {/* Flashcard Util Bar */}
      <FlashcardUtilBar
        audioFrom="FC"
        userSet={userSet}
        setId={setId}
        termId={termId}
        text={showTerm ? term : definition}
      />
    </Container>
  );
}

export default Flashcard;
