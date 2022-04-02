import React, { useEffect } from "react";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import AutoSaveNotification from "../../layout/alert/AutoSaveNotification";

function AutoSaveForm(props) {
  const { values } = props;
  const { saveFormData } = useCreateForm();

  // Saving the form Data when it changes
  useEffect(() => {
    saveFormData(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return <AutoSaveNotification />;
}

export default AutoSaveForm;
