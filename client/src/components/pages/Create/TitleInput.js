import React from "react";

// Components
import CustomInput from "../../layout/forms/CustomInput";

function TitleInput() {
  return (
    <CustomInput
      name="title"
      className="title-input-box"
      placeholder="Enter a title (ex: US History - Section 2: WWI)"
      label="Title"
    />
  );
}

export default TitleInput;
