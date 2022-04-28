import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Contexts
import { useSet } from "../../../context/set/Set.context";
import { useSpeech } from "../../../context/speech/Speech.context";

// Components
import FlashcardUtilBar from "./FlashcardUtilBar";

const TermComponent = (props) => <p className="term">{props.term}</p>;
const DefinitionComponent = (props) => (
  <p className="definition">{props.definition}</p>
);

function Flashcard(props) {
  const { userSet, setId, terms } = props;
  const {
    terms: {
      currentTerm: { pos, showTerm },
      flipCard,
      termsOnFront,
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
          {termsOnFront ? (
            <TermComponent term={term} />
          ) : (
            <DefinitionComponent definition={definition} />
          )}
        </div>
        <div className="back-card current-fc center">
          {termsOnFront ? (
            <DefinitionComponent definition={definition} />
          ) : (
            <TermComponent term={term} />
          )}
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
