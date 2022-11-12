import React from "react";
// MUI
import { Box, Tooltip, ClickAwayListener } from "@mui/material";
import { ArrowBack, ArrowForward, Keyboard } from "@mui/icons-material";

// Contexts
import { useSet } from "../../../context/set/Set.context";

function FlashcardTooltip() {
  const {
    keyboard: { keyboardOpen, openKeyboard, closeKeyboard },
  } = useSet();

  const keyboardShortcuts = [
    {
      label: "Previous",
      icon: <ArrowBack className="icon" />,
    },
    {
      label: "Next",
      icon: <ArrowForward className="icon" />,
    },
    {
      label: "Flip",
      icon: <p className="icon-text">Space</p>,
    },
  ];

  return (
    <ClickAwayListener onClickAway={closeKeyboard}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
          className: "fc-tooltip",
        }}
        onClose={closeKeyboard}
        open={keyboardOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <Box className="fc-tooltip-box">
            <header>
              <h6>Keyboard Shortcuts</h6>
            </header>

            {keyboardShortcuts.map((i) => {
              const { label, icon } = i;

              return (
                <Box key={label + "-kb-shc"} className="kb-shc between-row">
                  <p className="label">{label}</p>

                  <Box className="icon-box">{icon}</Box>
                </Box>
              );
            })}
          </Box>
        }
      >
        <button
          variant="button"
          className="fc-tooltip-btn"
          onClick={openKeyboard}
        >
          <Keyboard className="icon" />
        </button>
      </Tooltip>
    </ClickAwayListener>
  );
}

export default FlashcardTooltip;
