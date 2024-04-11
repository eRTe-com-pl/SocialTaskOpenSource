import React from "react";
/**
 *
 * @param {object} error - error body (required)
 */
function ErrorMessage({ error }) {
  let title = error.title || "Error";
  return (
    error.error && (
      <div className="Error">
        <div className="Error-Content">
          <h1>{title}</h1>
          <p>{error.error}</p>
          <div>
            {!error.disableRefresh && (
              <button className="Button Primary" onClick={() => window.location.reload()}>
                Refresh
              </button>
            )}
            <button className="Button Secondary" onClick={() => error.setError("")}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ErrorMessage;
