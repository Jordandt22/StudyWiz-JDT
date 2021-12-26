import React from "react";
import { connect } from "react-redux";

// React Router
import { useNavigate } from "react-router-dom";

// Formik
import { Formik, Form, Field } from "formik";

// MUI
import { Box } from "@material-ui/core";
import { Search } from "@material-ui/icons";

// Redux
import { setAlert } from "../../redux/global/global.actions";

function SearchBar(props) {
  const { setAlert, className } = props;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { query } = values;
        const queryLength = query.length;
        if (queryLength <= 0) {
          setSubmitting(false);
          setAlert({
            message: "Must enter a value to search.",
            title: "Error",
          });
        } else if (queryLength > 100) {
          setSubmitting(false);
          setAlert({
            message: "Your search value is too long.",
            title: "Error",
          });
        } else {
          setSubmitting(false);
          resetForm();
          navigate(`/search/${query}`);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form aria-disabled={isSubmitting}>
          <Field name="query">
            {({ field }) => (
              <Box
                className={
                  `${
                    isSubmitting ? "form-disabled" : "form-not-disabled"
                  } row ` + className
                }
              >
                <label htmlFor="query">
                  <Search className="icon" />
                </label>
                <input
                  disabled={isSubmitting}
                  style={{ cursor: isSubmitting ? "not-allowed" : "text" }}
                  type="text"
                  placeholder="Search for sets..."
                  autoComplete="off"
                  {...field}
                />
              </Box>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}

// Redux
const ReduxActions = (dispatch) => ({
  setAlert: (alert) => dispatch(setAlert(alert)),
});

export default connect(null, ReduxActions)(SearchBar);
