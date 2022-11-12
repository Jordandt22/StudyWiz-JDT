import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Contexts
import { useSet } from "../../../../context/set/Set.context";

// Components
import FlashcardUtilBar from "../../../templates/flashcards/FlashcardUtilBar";

function TermsList(props) {
  const { setId, userSet, terms } = props;
  const {
    termsDisplay: { showAll },
  } = useSet();
  const filteredTerms = showAll
    ? terms
    : terms.filter((term) =>
        userSet.favoriteTerms.some((t) => t.termId === term._id)
      );

  return (
    <Container className="terms-display-list">
      {filteredTerms.length > 0 ? (
        <>
          {filteredTerms.map((t) => {
            const { _id, term, definition } = t;

            return (
              <Box key={_id} className="term-container">
                {/* Term + Definition */}
                <Box className="term-box row">
                  <h4>{term}</h4>
                  <p>{definition}</p>
                </Box>

                {/* Util Bar (Audio & Favorite) */}
                <FlashcardUtilBar
                  audioFrom="TM"
                  text={term + " " + definition}
                  userSet={userSet}
                  setId={setId}
                  termId={_id}
                />
              </Box>
            );
          })}
        </>
      ) : (
        <p className="no-terms">
          {showAll
            ? "There are no terms available in this set."
            : `You haven't favorited any terms in this set.`}
        </p>
      )}
    </Container>
  );
}

export default TermsList;
