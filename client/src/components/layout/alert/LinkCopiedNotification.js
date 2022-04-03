import React from "react";

// MUI
import { Done } from "@mui/icons-material";

// Contexts
import { useSet } from "../../../context/set/Set.context";

// Components
import CustomAlert from "./CustomAlert";

function LinkCopiedNotification() {
  const {
    creator: { creatorNotifs, setPopUpNotification },
  } = useSet();

  return (
    <CustomAlert
      showAlert={creatorNotifs.share}
      closeAlert={() => setPopUpNotification("share", false)}
      duration={6000}
      icon={<Done className="icon" />}
      message="Link Copied Successfully !"
    />
  );
}

export default LinkCopiedNotification;
