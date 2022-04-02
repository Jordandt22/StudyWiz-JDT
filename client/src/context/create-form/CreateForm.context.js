import React, { createContext, useContext, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// Create Form Context
export const CreateFormContext = createContext();
export const useCreateForm = () => useContext(CreateFormContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const CreateFormDataKey = "CREATE_FORM_DATA";

  // Auto Save Notification
  const [showAutoSaveNotif, setShowNotif] = useState(false);

  // Get Form Data from Local Storage
  const getFormData = () => JSON.parse(localStorage.getItem(CreateFormDataKey));

  // Save Form Data to Local Storage
  const saveFormData = useDebouncedCallback((data) => {
    localStorage.setItem(CreateFormDataKey, JSON.stringify(data));
    setShowNotif(true);
  }, 1000 * 10);

  // Clear Form Data from Local Storage
  const clearFormData = () => localStorage.removeItem(CreateFormDataKey);

  // Import Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <CreateFormContext.Provider
      value={{
        getFormData,
        saveFormData,
        clearFormData,
        import: {
          dialogOpen,
          setDialogOpen,
        },
        showAutoSaveNotif,
        setShowNotif,
      }}
    >
      {props.children}
    </CreateFormContext.Provider>
  );
};
