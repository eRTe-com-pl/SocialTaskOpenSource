import React from 'react';


const ErrorMessage = ({ errorTitle, errorMessage, setError }) => {

    if (!errorMessage) return null;

    return (
        <div className="Error">
            <div className="Error-Content">
                <h1>{errorTitle}</h1>
                <p>{errorMessage}</p>
                <div>
                    <button className="Button Primary" onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                    <button className="Button Secondary" onClick={() => setError(false)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage;