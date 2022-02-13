import React from "react";

// MUI
import { Box, Skeleton } from "@mui/material";

function CreatorSkeleton() {
  return (
    <Box className="set-creator set-creator-skel between-row">
      {/* Creator Profile Skeleton */}
      <Box className="creator-profile row">
        <Skeleton
          variant="circular"
          animation="pulse"
          className="user-photo-box"
        />

        <Box className="creator-info">
          <Skeleton variant="text" animation="pulse" className="p-skel" />
          <Skeleton variant="text" animation="pulse" className="strong-skel" />
        </Box>
      </Box>

      {/* Flashcard Set Options Skeleton */}
      <Box className="fc-set-options row">
        <Skeleton
          variant="circular"
          animation="pulse"
          className="fc-set-opt-btn fc-set-opt-btn-skel"
        />
        <Skeleton
          variant="circular"
          animation="pulse"
          className="fc-set-opt-btn fc-set-opt-btn-skel"
        />
        <Skeleton
          variant="circular"
          animation="pulse"
          className="fc-set-opt-btn fc-set-opt-btn-skel"
        />
      </Box>
    </Box>
  );
}

export default CreatorSkeleton;
