import React from "react";

// MUI
import { Done } from "@mui/icons-material";

// Contexts
import { useSet } from "../../../context/set/Set.context";

// Components
import CustomAlert from "./CustomAlert";

function TermsCopiedNotification() {
  const {
    creator: { creatorNotifs, setPopUpNotification },
  } = useSet();

  return (
    <CustomAlert
      showAlert={creatorNotifs.export}
      closeAlert={() => setPopUpNotification("export", false)}
      duration={6000}
      icon={<Done className="icon" />}
      message="Terms Copied Successfully !"
    />
  );
}

export default TermsCopiedNotification;
