import React from "react";

// MUI
import { Skeleton } from "@mui/material";

function MinimalSetsSkeleton(props) {
  const { numOfSets } = props;

  return (
    <>
      {Array.apply(null, Array(numOfSets)).map((_, index) => {
        return (
          <Skeleton
            key={`minimal-set-card-skel-${index}`}
            variant="rectangular"
            className="minimal-set-card-skel"
          />
        );
      })}
    </>
  );
}

export default MinimalSetsSkeleton;
