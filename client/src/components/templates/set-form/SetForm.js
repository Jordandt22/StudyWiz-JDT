import React from "react";
import { connect } from "react-redux";

// React Router
import { useNavigate } from "react-router-dom";

// Schemas
import { SetSchema } from "../../../validation/sets.schema";

// Formik
import { Formik, Form } from "formik";

import { useQueryClient } from "react-query";

// MUI
import { Container, Box } from "@mui/material";

// Redux
import { setLoading, setAlert } from "../../../redux/global/global.actions";
import { setSets } from "../../../redux/sets/sets.actions";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import Header from "./Header";
import TitleInput from "./TitleInput";
import SetPrivacySettings from "./SetPrivacySettings";
import ImportTerms from "./ImportTerms";
import CreateTerms from "./CreateTerms";
import AutoSaveForm from "./AutoSaveForm";

function SetForm(props) {
  const {
    setId,
    isEdit,
    loadingText,
    APIFunc,
    errorMessage,
    title,
    btnText,
    user: {
      auth: { fbId },
    },
    setLoading,
    setAlert,
    setSets,
  } = props;
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { getFormData, clearFormData } = useCreateForm();
  const formData = getFormData(isEdit);
  const emptyTerm = {
    term: "",
    definition: "",
  };
  const setErrorAlert = (message) =>
    setAlert({
      message,
      severity: "error",
      title: "Error",
    });

  return (
    <Container className="create-page-container page-container">
      <Formik
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          const { title, privacy, terms } = values;
          setLoading({
            isLoading: true,
            loadingText,
          });
          await APIFunc(fbId, setId, { title, privacy, terms }, (data, err) => {
            const stopSubmitting = () => {
              setLoading({ isLoading: false });
              setSubmitting(false);
            };

            if (err) {
              stopSubmitting();
              const {
                status,
                data: { errors },
              } = err.response;
              if (status === 422) {
                setErrors({ ...errors });
              } else {
                setErrorAlert(errorMessage);
              }
            } else if (!data.data) {
              stopSubmitting();
              setErrorAlert(errorMessage);
            } else {
              if (!isEdit) {
                const sets = data.data.user.sets;
                setSets(sets);
              } else {
                QueryClient.invalidateQueries(`${fbId}_SET_SETID:${setId}`);
              }

              resetForm();
              clearFormData(isEdit);
              stopSubmitting();
              navigate("/sets");
            }
          });
        }}
        initialValues={{
          title: formData?.title || "",
          privacy: formData?.privacy || {
            hideCreator: false,
            private: false,
          },
          terms: formData?.terms || [emptyTerm, emptyTerm, emptyTerm],
          importTerms: "",
        }}
        validationSchema={SetSchema}
      >
        {({ values, setFieldValue, resetForm }) => {
          return (
            <Form>
              <Box className="create-form-box">
                {/* Header */}
                <Header title={title} btnText={btnText} />

                {/* Title Input */}
                <TitleInput />

                {/* Privacy Settings */}
                <SetPrivacySettings />

                {/* Import Terms */}
                <ImportTerms
                  values={values}
                  setFieldValue={setFieldValue}
                  resetForm={resetForm}
                />

                {/* Create Terms */}
                <CreateTerms
                  values={values}
                  emptyTerm={emptyTerm}
                  btnText={btnText}
                />
              </Box>

              {/* Auto-Save */}
              <AutoSaveForm values={values} isEdit={isEdit} />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

// Redux
const ReduxState = (state) => ({
  user: state.user,
});

const ReduxActions = (dispatch) => ({
  setAlert: (alert) => dispatch(setAlert(alert)),
  setLoading: (loading) => dispatch(setLoading(loading)),
  setSets: (sets) => dispatch(setSets(sets)),
});

export default connect(ReduxState, ReduxActions)(SetForm);
