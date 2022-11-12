import React from "react";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

function TabFilter() {
  const {
    filter,
    setsFilter: { options },
  } = useSets();

  return (
    <Box className="tab-filter row">
      {options.map((opt) => {
        const { label, value, onClick } = opt;

        return (
          <Box
            key={label + "-sets-filter"}
            className={`tab ${value === filter ? "active" : "not-active"}`}
            onClick={onClick}
          >
            {label}
          </Box>
        );
      })}
    </Box>
  );
}

export default TabFilter;
