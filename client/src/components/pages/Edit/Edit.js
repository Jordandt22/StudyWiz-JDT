import React from "react";

// API
import { editSet } from "../../../query/api";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import SetForm from "../../templates/set-form/SetForm";

function Edit(props) {
  const {
    edit: { getEditFormSetID },
  } = useCreateForm();

  return (
    <SetForm
      setId={getEditFormSetID()}
      isEdit={true}
      loadingText="Updating your vocab set..."
      APIFunc={editSet}
      errorMessage="Sorry, a problem occured while updating your set."
      title={
        <h3>
          Edit your <strong>Vocab Set</strong>
        </h3>
      }
      btnText="Save"
    />
  );
}

export default Edit;
