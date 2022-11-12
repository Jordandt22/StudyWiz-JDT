import React, { createContext, useContext, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// Create Form Context
export const CreateFormContext = createContext();
export const useCreateForm = () => useContext(CreateFormContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const CreateFormDataKey = "CREATE_FORM_DATA";
  const EditFormDataKey = "EDIT_FORM_DATA";
  const EditFormSetIDDataKey = "EDIT_FORM_SET_ID_DATA";
  const dataKey = (isEdit) => (isEdit ? EditFormDataKey : CreateFormDataKey);

  // Auto Save Notification
  const [showAutoSaveNotif, setShowNotif] = useState(false);

  // Get Form Data from Local Storage
  const getFormData = (isEdit) =>
    JSON.parse(localStorage.getItem(dataKey(isEdit)));

  // Save Form Data to Local Storage
  const saveFormData = useDebouncedCallback((data, isEdit) => {
    localStorage.setItem(dataKey(isEdit), JSON.stringify(data));
    setShowNotif(true);
  }, 1000 * 10);

  // Clear Form Data from Local Storage
  const clearFormData = (isEdit) => localStorage.removeItem(dataKey(isEdit));

  // Import Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Edit Set Form
  const setEditFormValues = (values) =>
    localStorage.setItem(EditFormDataKey, JSON.stringify(values));

  const getEditFormSetID = () =>
    JSON.parse(localStorage.getItem(EditFormSetIDDataKey));

  const setEditFormSetID = (setId) =>
    localStorage.setItem(EditFormSetIDDataKey, JSON.stringify(setId));

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
        edit: {
          setEditFormValues,
          getEditFormSetID,
          setEditFormSetID,
        },
      }}
    >
      {props.children}
    </CreateFormContext.Provider>
  );
};
