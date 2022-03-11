import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Schemas
import { SetSchema } from "../../../validation/sets.schema";

// Formik
import { Formik, Form } from "formik";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import Header from "./Header";
import TitleInput from "./TitleInput";
import SetPrivacySettings from "./SetPrivacySettings";
import ImportTerms from "./ImportTerms";
import CreateTerms from "./CreateTerms";
import AutoSaveForm from "./AutoSaveForm";

function Create() {
  const { getFormData } = useCreateForm();
  const formData = getFormData();
  const emptyTerm = {
    term: "",
    definition: "",
  };

  return (
    <Container className="create-page-container page-container">
      <Formik
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
          console.log(values);
        }}
        initialValues={{
          title: formData?.title || "",
          privacy: formData?.privacy || {
            hideCreator: false,
            private: false,
          },
          terms: formData?.terms || [emptyTerm, emptyTerm, emptyTerm],
        }}
        validationSchema={SetSchema}
      >
        {({ values }) => (
          <Form>
            <Box className="create-form-box">
              {/* Header */}
              <Header />

              {/* Title Input */}
              <TitleInput />

              {/* Privacy Settings */}
              <SetPrivacySettings />

              {/* Import Terms */}
              <ImportTerms />

              {/* Create Terms */}
              <CreateTerms values={values} emptyTerm={emptyTerm} />
            </Box>

            {/* Auto-Save */}
            <AutoSaveForm values={values} />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Create;
