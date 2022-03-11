import React, { useEffect } from "react";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

function AutoSaveForm(props) {
  const { values } = props;
  const { saveFormData } = useCreateForm();

  // Saving the form Data when it changes
  useEffect(() => {
    saveFormData(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return <></>;
}

export default AutoSaveForm;
