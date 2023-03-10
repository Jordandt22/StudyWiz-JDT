import React from "react";

// MUI
import { Box, Divider } from "@mui/material";

// Components
import MinimalSetsSkeleton from "../../templates/sets/skeletons/MinimalSetsSkeleton";

function SetsSkeleton(props) {
  const { titles } = props;

  return (
    <Box className="sets">
      {titles.map((title) => (
        <Box key={title} className="sets-list">
          <Box className="between-row">
            <Divider textAlign="left" className="divider">
              <h3>{title}</h3>
            </Divider>
          </Box>

          <MinimalSetsSkeleton numOfSets={2} />
        </Box>
      ))}
    </Box>
  );
}

export default SetsSkeleton;
