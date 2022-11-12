import React from "react";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useSet } from "../../../../../context/set/Set.context";

// Components
import CustomPopUp from "../../../../templates/popup/CustomPopUp";

function SharePopUp(props) {
  const { terms } = props;
  const {
    creator: { creatorPopUps, closeCreatorPopUps, setPopUpNotification },
  } = useSet();
  const currentPageURL = window.location.href;
  const termsToStr = terms
    .map((tm) => `${tm.term}, ${tm.definition}`)
    .join("\n");

  return (
    <CustomPopUp
      onClose={closeCreatorPopUps}
      open={creatorPopUps.share}
      className="share-pop-up"
      title={
        <h2>
          <span>Share</span> or <span>Export</span> this Vocab Set
        </h2>
      }
    >
      {/* Share Link */}
      <Box className="share-link-box">
        <p>{currentPageURL}</p>
        <button
          type="button"
          className="copy-btn"
          onClick={() => {
            navigator.clipboard
              .writeText(currentPageURL)
              .then(() => setPopUpNotification("share", true));
          }}
        >
          Copy Link
        </button>
      </Box>

      {/* Export Terms */}
      <Box className="export-terms-box">
        <p>{termsToStr}</p>
        <button
          type="button"
          className="copy-btn"
          onClick={() => {
            navigator.clipboard
              .writeText(termsToStr)
              .then(() => setPopUpNotification("export", true));
          }}
        >
          Copy Terms
        </button>
      </Box>
    </CustomPopUp>
  );
}

export default SharePopUp;
