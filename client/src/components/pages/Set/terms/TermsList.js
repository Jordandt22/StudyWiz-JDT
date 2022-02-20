import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import FlashcardUtilBar from "../../../templates/flashcards/FlashcardUtilBar";

function TermsList(props) {
  const { setId, userSet, terms } = props;

  return (
    <Container className="terms-display-list">
      {terms.length > 0 ? (
        <>
          {terms.map((t) => {
            const { _id, term, definition } = t;

            return (
              <Box key={_id} className="term-container">
                {/* Term + Definition */}
                <Box className="term-box row">
                  <h4>{term}</h4>
                  <p>{definition}</p>
                </Box>

                {/* Util Bar (Audio & Favorite) */}
                <FlashcardUtilBar audioFrom="TM" text={term + definition} />
              </Box>
            );
          })}
        </>
      ) : (
        <p>There are no terms available.</p>
      )}
    </Container>
  );
}

export default TermsList;
