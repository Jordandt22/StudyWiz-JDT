import React from "react";

// MUI
import { Box, TextareaAutosize } from "@mui/material";

// Formik
import { Field } from "formik";

function CustomInput(props) {
  const { name, className, placeholder, label, as } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {
        const isError = meta.touched && meta.error;
        const isValid = meta.touched && !meta.error;
        const inputProps = {
          className: isError
            ? "error-input"
            : isValid
            ? "valid-input"
            : "regular-input",
          placeholder,
        };

        return (
          <Box className={className}>
            {/* Input */}
            {as === "textarea" ? (
              <TextareaAutosize {...inputProps} {...field} />
            ) : (
              <input
                type="text"
                autoComplete="off"
                {...inputProps}
                {...field}
              />
            )}

            <Box className="under-input row">
              {/* Label */}
              <label htmlFor={name}>{label}</label>

              {/* Error Message */}
              {isError && <p className="error">{meta.error}</p>}
            </Box>
          </Box>
        );
      }}
    </Field>
  );
}

export default CustomInput;
