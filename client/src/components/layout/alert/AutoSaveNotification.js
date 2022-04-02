import React, { useEffect } from "react";

// MUI
import { Box } from "@mui/material";
import { CloudDone } from "@mui/icons-material";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

function AutoSaveNotification() {
  const { showAutoSaveNotif, setShowNotif } = useCreateForm();

  useEffect(() => {
    if (showAutoSaveNotif) {
      setTimeout(() => {
        setShowNotif(false);
      }, 6000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAutoSaveNotif]);

  return (
    <>
      {showAutoSaveNotif && (
        <Box className="auto-save-notif row">
          <CloudDone className="icon" />
          <p>Your form data has been saved for this current session.</p>
        </Box>
      )}
    </>
  );
}

export default AutoSaveNotification;
