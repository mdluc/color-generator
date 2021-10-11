import React, { useState, useEffect } from "react";
const SingleColor = ({ rgb, weight, index, hex, gradation, type }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  const hexValue = `#${hex}`;

  const handleClick = () => {
    setAlert(true);
    navigator.clipboard.writeText(hexValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      className={`color ${(type==="shade" || type==="base")?"color-light":"color-black"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={handleClick}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className={`alert ${(type==="shade" || type==="base")?"color-light":"color-black"}`}>copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
