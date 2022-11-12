import React from "react";

// MUI
import { CloudDone } from "@mui/icons-material";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import CustomAlert from "./CustomAlert";

function AutoSaveNotification() {
  const { showAutoSaveNotif, setShowNotif } = useCreateForm();

  return (
    <CustomAlert
      showAlert={showAutoSaveNotif}
      closeAlert={() => setShowNotif(false)}
      duration={6000}
      icon={<CloudDone className="icon" />}
      message="Your form data has been saved for this current session."
    />
  );
}

export default AutoSaveNotification;
