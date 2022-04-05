import React from "react";

// MUI
import { Dialog, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

function CustomPopUp(props) {
  const { onClose, open, title, className } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <Box className={"custom-pop-up " + className}>
        <header className="between-row">
          {title}

          <button type="button" className="close-btn" onClick={onClose}>
            <Close className="icon" />
          </button>
        </header>

        {props.children}
      </Box>
    </Dialog>
  );
}

export default CustomPopUp;
