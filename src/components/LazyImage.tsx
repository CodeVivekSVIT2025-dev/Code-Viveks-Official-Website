import React, { useState } from "react";

const LazyImage = ({ src, alt, className }: any) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      onLoad={() => setLoaded(true)}
      loading="lazy"
    />
  );
};

export default LazyImage;
