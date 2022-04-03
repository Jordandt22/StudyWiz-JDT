import React from "react";

// MUI
import { Dialog, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

// Contexts
import { useSet } from "../../../../../context/set/Set.context";

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
    <Dialog onClose={closeCreatorPopUps} open={creatorPopUps.share}>
      <Box className="share-pop-up">
        <header className="between-row">
          <h2>
            <span>Share</span> or <span>Export</span> this Vocab Set
          </h2>

          <button
            type="button"
            className="close-btn"
            onClick={closeCreatorPopUps}
          >
            <Close className="icon" />
          </button>
        </header>

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
      </Box>
    </Dialog>
  );
}

export default SharePopUp;
