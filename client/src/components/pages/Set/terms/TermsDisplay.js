import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Contexts
import { useSet } from "../../../../context/set/Set.context";

// Components
import TermsList from "./TermsList";

function TermsDisplay(props) {
  const { setId, userSet, terms } = props;
  const {
    termsDisplay: { showAll, setShowAll },
  } = useSet();

  return (
    <Container className="terms-display-container">
      <Box className="terms-header between-row">
        <h3>Terms and Definitions</h3>

        <Box className="terms-filter">
          <button
            variant="button"
            className={`terms-filter-btn ${showAll ? "active" : "not-active"}`}
            onClick={() => setShowAll(true)}
          >
            All
          </button>
          <button
            variant="button"
            className={`terms-filter-btn ${!showAll ? "active" : "not-active"}`}
            onClick={() => setShowAll(false)}
          >
            Favorites
          </button>
        </Box>
      </Box>

      {/* Terms List */}
      <TermsList setId={setId} userSet={userSet} terms={terms} />
    </Container>
  );
}

export default TermsDisplay;
