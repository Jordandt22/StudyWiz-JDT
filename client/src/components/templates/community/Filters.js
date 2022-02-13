import React from "react";

// MUI
import { Box } from "@mui/material";
import { Divider } from "@mui/material";

// Filter
const Filter = (props) => {
  const {
    active,
    filter: { label, options },
    id,
  } = props;

  return (
    <Box id={id} className="filter-box">
      <h4>{label}</h4>
      {options.map((opt) => {
        const { label: optLabel, value, onClick } = opt;
        return (
          <button
            key={optLabel}
            variant="button"
            className={`opt-btn ${value === active ? "active" : "not-active"}`}
            onClick={onClick}
          >
            {optLabel}
          </button>
        );
      })}
    </Box>
  );
};

function Filters(props) {
  const { sortedBy, sortedByFilter, ownedBy, ownedByFilter } = props;

  return (
    <Box className="filters-box">
      {/* Header */}
      <Box className="between-row">
        <Divider className="divider">
          <h3>Filters</h3>
        </Divider>
      </Box>

      {/* Filters */}
      <Box className="between-row">
        {/* Sorted By */}
        {sortedByFilter && (
          <Filter active={sortedBy} filter={sortedByFilter} id="left-filter" />
        )}

        {/* Owned By */}
        {ownedByFilter && (
          <Filter active={ownedBy} filter={ownedByFilter} id="right-filter" />
        )}
      </Box>
    </Box>
  );
}

export default Filters;
