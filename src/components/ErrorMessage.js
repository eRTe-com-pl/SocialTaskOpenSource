import React from "react";

const ErrorMessage = ({ errorTitle, error }) => {
  // If the errorTitle is not provided, the default value is "Error".
  errorTitle = errorTitle || "Error";
  return (
    <div className="Error">
      <div className="Error-Content">
        <h1>{errorTitle}</h1>
        <p>{error.errorMessage}</p>
        <div>
          <button className="Button Primary" onClick={() => window.location.reload()}>
            Refresh
          </button>
          <button className="Button Secondary" onClick={() => error.setErrorMessage("")}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
