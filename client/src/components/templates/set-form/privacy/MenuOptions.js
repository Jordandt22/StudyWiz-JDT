import React from "react";

// MUI
import { Box } from "@mui/material";

// Formik
import { Field } from "formik";

function MenuOptions(props) {
  const { label, name, options } = props;

  return (
    <Box className="menu-opts">
      <label htmlFor={name}>{label}</label>
      <Field as="select" name={name}>
        {options.map((opt) => {
          const { value, label } = opt;

          return (
            <option key={name + label} value={value}>
              {label}
            </option>
          );
        })}
      </Field>
    </Box>
  );
}

export default MenuOptions;
