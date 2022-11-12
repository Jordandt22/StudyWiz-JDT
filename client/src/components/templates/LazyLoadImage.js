import React from "react";

// Lazy Load
import { LazyLoadImage as LazyLoadImageComponent } from "react-lazy-load-image-component";

function LazyLoadImage(props) {
  const { alt, src, className } = props;

  return <LazyLoadImageComponent alt={alt} src={src} className={className} />;
}

export default LazyLoadImage;
