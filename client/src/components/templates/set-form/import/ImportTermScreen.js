import React, { useEffect } from "react";

// Debounce
import { useDebouncedCallback } from "use-debounce";

// MUI
import { Dialog, Container, Box } from "@mui/material";

// Contexts
import { useCreateForm } from "../../../../context/create-form/CreateForm.context";

// Component
import Slide from "../../../layout/transitions/SlideTransition";
import CustomInput from "../../../layout/forms/CustomInput";

function ImportTermScreen(props) {
  const {
    setFieldValue,
    values: { terms, importTerms },
  } = props;
  const {
    import: {
      dialogOpen,
      setDialogOpen,
    },
  } = useCreateForm();
  const closeDialog = () => setDialogOpen(false);

  // Convert Terms From Import
  const convertTerms = () => {
    if (importTerms === "") return [];

    const separator = /\r?\n/gi;
    const termsFromImport = importTerms
      .split(separator)
      .filter((str) => str !== "")
      .map((str) => {
        const index = str.indexOf(", ");
        if (index === -1) return { term: str, definition: "" };

        const term = str.slice(0, index);
        const definition = str.slice(index + 1).substring(1);
        return {
          term,
          definition,
        };
      });

    return termsFromImport ? termsFromImport : [];
  };
  const preview = convertTerms();
  const addImportTerms = () => {
    if (preview && preview.length > 0) {
      setFieldValue("terms", [...terms, ...preview], false);
      setFieldValue("importTerms", "", false);
      closeDialog();
    }
  };

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={Slide}
    >
      <Container className="import-term-container">
        {/* Import Term Form */}
        <Box className="import-term-form im-tm-box">
          <button type="button" className="cancel-btn" onClick={closeDialog}>
            Cancel Import
          </button>

          {/* Text Import */}
          <Box className="text-im-box">
            <p>Copy and paste your terms or type them out below.</p>
            <CustomInput
              name="importTerms"
              placeholder="<Term>, <Definition>&#10;<Term>, <Definition>&#10;<Term>, <Definition>"
              label=""
              className="txt-im-in-box"
              as="textarea"
            />
          </Box>

          {/* Import Button */}
          <button type="button" className="import-btn" onClick={addImportTerms}>
            Import
          </button>
        </Box>

        {/* Term Preview */}
        <Box className="terms-preview im-tm-box">
          <h4>Preview</h4>
          <p>{terms.length} Terms</p>

          {/* Terms */}
          {terms.length > 0 && preview && preview.length > 0 ? (
            [...terms, ...preview]
              .map((t, i) => {
                const { term, definition } = t;

                return (
                  <Box key={`import-term-${i}`} className="term-box">
                    <h3>Term {i + 1}</h3>

                    <Box className="term-row">
                      <p className="term">{term}</p>
                      <p className="definition">{definition}</p>
                    </Box>
                  </Box>
                );
              })
              .reverse()
          ) : (
            <p className="no-tms-msg">No imported terms to preview.</p>
          )}
        </Box>
      </Container>
    </Dialog>
  );
}

export default ImportTermScreen;
