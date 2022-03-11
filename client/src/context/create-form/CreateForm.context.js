import React, { createContext, useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

// Create Form Context
export const CreateFormContext = createContext();
export const useCreateForm = () => useContext(CreateFormContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const CreateFormDataKey = "CREATE_FORM_DATA";

  // Get Form Data from Local Storage
  const getFormData = () => JSON.parse(localStorage.getItem(CreateFormDataKey));

  // Save Form Data to Local Storage
  const saveFormData = useDebouncedCallback(
    (data) => localStorage.setItem(CreateFormDataKey, JSON.stringify(data)),
    1000
  );

  // Clear Form Data from Local Storage
  const clearFormData = () => localStorage.removeItem(CreateFormDataKey);

  return (
    <CreateFormContext.Provider
      value={{
        getFormData,
        saveFormData,
        clearFormData,
      }}
    >
      {props.children}
    </CreateFormContext.Provider>
  );
};
