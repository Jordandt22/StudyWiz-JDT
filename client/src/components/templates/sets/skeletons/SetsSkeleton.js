import React from "react";

// MUI
import { Skeleton } from "@mui/material";

function SetsSkeleton(props) {
  const { numOfSets } = props;

  return (
    <>
      {Array.apply(null, Array(numOfSets)).map((_, index) => {
        return (
          <Skeleton
            key={`set-card-skel-${index}`}
            variant="rectangular"
            className="set-card-skel"
          />
        );
      })}
    </>
  );
}

export default SetsSkeleton;
