import React, { useState } from "react";

// MUI
import { Box, ClickAwayListener } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

function MenuFilter() {
  const {
    sortedBy,
    sortedByFilter: { options },
  } = useSets();
  const [menuOpen, setOpen] = useState(false);

  return (
    <Box className="menu-filter-box">
      <button
        variant="button"
        className="menu-filter-btn row"
        onClick={() => setOpen((curOpen) => !curOpen)}
      >
        {options[sortedBy].label}

        {menuOpen ? (
          <KeyboardArrowUp className="icon" />
        ) : (
          <KeyboardArrowDown className="icon" />
        )}
      </button>

      {/* Menu */}
      {menuOpen && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Box className="menu-filter">
            {options.map((opt) => {
              const { label, value, onClick } = opt;

              return (
                <Box
                  key={label + "-menu-filter"}
                  className={`menu-opt ${
                    value === sortedBy ? "active" : "not-active"
                  }`}
                  onClick={() => {
                    onClick();
                    setOpen(false);
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
}

export default MenuFilter;
