import React from "react";

// Components
import PlaceholderPageTemplate from "../../templates/placeholder/PlaceholderPageTemplate";

function ComingSoon() {
  return (
    <PlaceholderPageTemplate
      title={<p className="row">Page Coming Soon...</p>}
      message="This page is under construction and will be available soon."
    />
  );
}

export default ComingSoon;
