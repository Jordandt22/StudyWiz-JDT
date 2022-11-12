import React from "react";

// MUI
import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import ImportTermScreen from "./import/ImportTermScreen";

function ImportTerms(props) {
  const { values, setFieldValue, resetForm } = props;
  const {
    import: { setDialogOpen },
  } = useCreateForm();

  return (
    <>
      {/* Import Term Button */}
      <Box className="import-terms-box">
        <button
          type="button"
          className="import-terms-btn row"
          onClick={() => setDialogOpen(true)}
        >
          <Add className="icon" />
          Import Terms and Definitions
        </button>
      </Box>

      {/* Import Term Dialog */}
      <ImportTermScreen
        values={values}
        setFieldValue={setFieldValue}
        resetForm={resetForm}
      />
    </>
  );
}

export default ImportTerms;
