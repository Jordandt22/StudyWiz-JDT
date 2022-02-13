import React from "react";

// MUI
import { Container, Box, Skeleton } from "@mui/material";

// Components
import MainSideBar from "../main/MainSidebar";
import FlashcardSkeleton from "../../../templates/skeletons/FlashcardSkeleton";

function MainSkeleton(props) {
  const { setId } = props;

  return (
    <Container className="page-container set-page-container fc-skel-container">
      <Box className="set-main-content-box">
        <Box className="title-box">
          <Skeleton
            variant="text"
            animation="wave"
            className="title-skel-1 title"
          />
          <Skeleton
            variant="text"
            animation="wave"
            className="title-skel-2 title"
          />
        </Box>

        {/* Main Context Skeleton */}
        <main>
          <Box className="main-content">
            <MainSideBar setId={setId} />

            <FlashcardSkeleton />
          </Box>
        </main>
      </Box>
    </Container>
  );
}

export default MainSkeleton;
