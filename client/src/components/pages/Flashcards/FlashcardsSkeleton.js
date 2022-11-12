import React from "react";

// MUI
import { Container, Skeleton } from "@mui/material";

function FlashcardsSkeleton() {
  return (
    <Container className="page-container flashcards-container flashcards-skel">
      <Skeleton variant="rectangular" className="flashcards-sidebar" />
      <main className="flashcards-main-content">
        <Skeleton variant="rectangular" className="current-fc" />
      </main>
    </Container>
  );
}

export default FlashcardsSkeleton;
