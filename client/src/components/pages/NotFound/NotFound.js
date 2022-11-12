import React from "react";

// Components
import PlaceholderPageTemplate from "../../templates/placeholder/PlaceholderPageTemplate";

function NotFound() {
  return (
    <PlaceholderPageTemplate
      title={
        <p className="row">
          <span className="title-span">
            4<span>0</span>4
          </span>
          Page Not Found
        </p>
      }
      message="Sorry, the page you're looking for doesn't exist."
    />
  );
}

export default NotFound;
