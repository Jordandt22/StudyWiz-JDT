import React from "react";

// MUI
import { Skeleton } from "@mui/material";

function CommunitySetCardSkeleton(props) {
  const { limit } = props;

  return (
    <>
      {Array.apply(null, Array(limit)).map((_, index) => {
        return (
          <Skeleton
            key={`community-set-card-skel-${index}`}
            variant="rectangular"
            className="community-set-card-skel"
          />
        );
      })}
    </>
  );
}

export default CommunitySetCardSkeleton;
