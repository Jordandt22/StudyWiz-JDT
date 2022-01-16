import React from "react";

// MUI
import { Box } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

function SetsPageNav(props) {
  const { next, page, prevPage, nextPage } = props;
  const nextPageNum = next?.page;
  const isPrevActive = page > 1;
  const isNextActive = nextPageNum && nextPageNum !== page;

  return (
    <Box className="between-row sets-page-nav">
      <ArrowBack
        onClick={() => {
          if (isPrevActive) prevPage();
        }}
        className={`icon ${isPrevActive ? "active" : "not-active"}`}
      />

      {/* Page Num */}
      <p className="center">{page}</p>

      <ArrowForward
        onClick={() => {
          if (isNextActive) nextPage(nextPageNum);
        }}
        className={`icon ${isNextActive ? "active" : "not-active"}`}
      />
    </Box>
  );
}

export default SetsPageNav;