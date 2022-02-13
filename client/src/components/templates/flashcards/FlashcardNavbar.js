import React, { useEffect } from "react";

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { ArrowBack, ArrowForward, Fullscreen } from "@mui/icons-material";

// Contexts
import { useSet } from "../../../context/set/Set.context";

// Components
import FlashcardTooltip from "./FlashcardTooltip";

function FlashcardNavbar(props) {
  const { setId, terms, shuffle, fullscreen } = props;
  const {
    handleKeyDown,
    terms: {
      currentTerm: { pos },
      prevTerm,
      nextTerm,
    },
  } = useSet();
  const amountOfTerms = terms.length;
  const isPrevDisabled = pos <= 0;
  const isNextDisabled = pos >= amountOfTerms - 1;

  // Adding event listenters for LEFT ARROW, RIGHT ARROW, and SPACE
  useEffect(() => {
    const handleFunction = (e) => handleKeyDown(e, amountOfTerms);
    document.addEventListener("keydown", handleFunction);

    return () => document.removeEventListener("keydown", handleFunction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="fc-nav-bar between-row">
      <Box className="between-row nav-box">
        {/* Prev Term Btn */}
        <button
          disabled={isPrevDisabled}
          variant="button"
          className={`nav-btn ${isPrevDisabled && "disabled"}}`}
          onClick={prevTerm}
        >
          <ArrowBack className="icon" />
        </button>

        {/* Current Term */}
        <p>
          {pos + 1}/{amountOfTerms}
        </p>

        {/* Next Term Btn */}
        <button
          disabled={isNextDisabled}
          variant="button"
          className={`nav-btn ${isNextDisabled && "disabled"}}`}
          onClick={nextTerm}
        >
          <ArrowForward className="icon" />
        </button>
      </Box>

      {/* Extra Btns */}
      <Box className="row">
        {/* Shuffle */}
        {shuffle && <p>Shuffle Button Here</p>}

        {/* Keyboard Shortcuts*/}
        <FlashcardTooltip />

        {/* Fullscreen */}
        {fullscreen && (
          <NavLink to={`/set/${setId}/flashcards`} className="fs-link">
            <Fullscreen className="icon" />
          </NavLink>
        )}
      </Box>
    </Box>
  );
}

export default FlashcardNavbar;
