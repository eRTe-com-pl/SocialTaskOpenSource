import React from "react";

function ErrorMessage({ errorTitle, errorMessage }) {
  return (
    <div className="error-message">
      <h2>{errorTitle}</h2>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorMessage;