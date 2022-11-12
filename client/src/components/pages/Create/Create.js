import React from "react";

// API
import { createSet } from "../../../query/api";

// Components
import SetForm from "../../templates/set-form/SetForm";

function Create() {
  return (
    <SetForm
      setId={null}
      isEdit={false}
      loadingText="Creating your new vocab set..."
      APIFunc={createSet}
      errorMessage="Sorry, a problem occured while creating your set."
      title={
        <h3>
          Create a <strong>New Vocab Set</strong>
        </h3>
      }
      btnText="Create"
    />
  );
}

export default Create;
