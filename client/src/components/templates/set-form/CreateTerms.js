import React, { useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// DnD
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// MUI
import { Container, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DragOutlined, PlusOutlined } from "@ant-design/icons";

// Formik
import { FieldArray, ErrorMessage } from "formik";

// Contexts
import { useCreateForm } from "../../../context/create-form/CreateForm.context";

// Components
import CustomInput from "../../layout/forms/CustomInput";

function CreateTerms(props) {
  const { values, emptyTerm, btnText } = props;
  const terms = values.terms;
  const [dragDisabled, setDragDisabled] = useState(true);
  const { clearFormData } = useCreateForm();
  const navigate = useNavigate();
  const cancelForm = () => {
    clearFormData();
    navigate("/sets");
  };

  return (
    <FieldArray
      name="terms"
      render={(arrayHelpers) => (
        <Container className="create-terms-container page-container">
          {/* Term Forms Error */}
          <ErrorMessage
            name="terms"
            render={(msg) => (
              <>
                {typeof msg === "string" && (
                  <Box className="form-error">{msg}</Box>
                )}
              </>
            )}
          />

          {/* DnD & Term Forms */}
          <DragDropContext
            onDragEnd={(result) => {
              const { destination, source } = result;
              if (!destination) return;

              arrayHelpers.move(source.index, destination.index);
            }}
          >
            <Droppable droppableId="term-forms">
              {(providedDrop) => {
                return (
                  <ul
                    className="term-forms"
                    {...providedDrop.droppableProps}
                    ref={providedDrop.innerRef}
                  >
                    {terms.map((term, index) => (
                      <Draggable
                        key={"term-form-" + index}
                        draggableId={"term-form-" + index}
                        index={index}
                        isDragDisabled={dragDisabled}
                      >
                        {(providedDrag, snapshotDrag) => {
                          return (
                            <Box
                              ref={providedDrag.innerRef}
                              {...providedDrag.draggableProps}
                              {...providedDrag.dragHandleProps}
                              className={`term-form-box ${
                                snapshotDrag.isDragging
                                  ? "dragging"
                                  : "not-dragging"
                              }`}
                            >
                              {/* Term Order */}
                              <Box className="term-order between-row">
                                <p>Term {index + 1}</p>

                                <Box className="row">
                                  <button
                                    type="button"
                                    onMouseDown={() =>
                                      setDragDisabled((prevState) => !prevState)
                                    }
                                    className={`order-btn ${
                                      dragDisabled ? "not-active" : "active"
                                    }`}
                                  >
                                    <DragOutlined className="icon drag-icon" />
                                  </button>
                                  <button
                                    type="button"
                                    className="order-btn"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Delete className="icon del-icon" />
                                  </button>
                                </Box>
                              </Box>

                              {/* Term Form */}
                              <Box className="row term-form">
                                {/* Term */}
                                <CustomInput
                                  name={`terms.${index}.term`}
                                  placeholder="Enter a term"
                                  label="TERM"
                                  className="term-input-box"
                                />

                                {/* Definition */}
                                <CustomInput
                                  name={`terms.${index}.definition`}
                                  placeholder="Enter the definition"
                                  label="DEFINITION"
                                  className="def-input-box"
                                  as="textarea"
                                />
                              </Box>
                            </Box>
                          );
                        }}
                      </Draggable>
                    ))}

                    {/* DnD Placeholder */}
                    {providedDrop.placeholder}
                  </ul>
                );
              }}
            </Droppable>
          </DragDropContext>

          {/* Add Term */}
          <button
            type="button"
            onClick={() => arrayHelpers.push(emptyTerm)}
            className="center add-term-box"
          >
            <PlusOutlined className="icon" /> Add Term
          </button>

          {/* Done Button */}
          <Box className="center">
            <button
              type="submit"
              className="create-btn cancel-btn"
              onClick={cancelForm}
            >
              Cancel
            </button>
            <button type="submit" className="create-btn">
              {btnText}
            </button>
          </Box>
        </Container>
      )}
    />
  );
}

export default CreateTerms;
