import { useState } from "react";

export function useError() {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [disableRefreshButton, setRefreshButtonDisabled] = useState(false);

  return {
    setError: (title, message, refDisabled) => {
      setErrorMessage(message);
      setErrorTitle(title);
      setRefreshButtonDisabled(refDisabled);
    },
    error: errorMessage,
    title: errorTitle,
    disableRefresh: disableRefreshButton,
    closeError: () => setErrorMessage(""),
  };
}
