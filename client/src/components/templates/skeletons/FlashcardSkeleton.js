import React from "react";

// MUI
import { Container, Box, Skeleton } from "@mui/material";

// Components
import ProgressBar from "../flashcards/ProgressBar";

function FlashcardSkeleton() {
  return (
    <Box className="flashcards-box">
      <ProgressBar terms={["Placeholder for Skeleton"]} />

      {/* Flashcard */}
      <Container className="fc-container">
        <Box className="fc-box">
          <Skeleton variant="rectangular" className="current-fc" />
        </Box>

        <Skeleton variant="rectangular" className="fc-nav-bar" />
      </Container>
    </Box>
  );
}

export default FlashcardSkeleton;
