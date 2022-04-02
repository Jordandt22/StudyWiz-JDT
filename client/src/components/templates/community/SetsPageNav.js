import React from "react";

// MUI
import { Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function SetsPageNav(props) {
  const { next, page, prevPage, nextPage } = props;
  const nextPageNum = next?.page;
  const isPrevActive = page > 1;
  const isNextActive = nextPageNum && nextPageNum !== page;

  return (
    <Box className="between-row sets-page-nav">
      <ArrowBack
        disabled={!isPrevActive}
        onClick={() => {
          if (isPrevActive) prevPage();
        }}
        className={`icon ${isPrevActive ? "active" : "not-active"}`}
      />

      {/* Page Num */}
      <p className="center">{page}</p>

      <ArrowForward
        disabled={!isNextActive}
        onClick={() => {
          if (isNextActive) nextPage(nextPageNum);
        }}
        className={`icon ${isNextActive ? "active" : "not-active"}`}
      />
    </Box>
  );
}

export default SetsPageNav;
