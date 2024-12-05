import React from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage.js";
import GlobeComponent from "./components/GlobeComponent.js";
import ControlPanel from "./components/ControlPanel.js";
import { useUserLocation } from "./hooks/useUserLocation.js";
import { useSocket } from "./hooks/useSocket.js";
import { useError } from "./hooks/useError.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNamePrompt from "./components/UserNamePrompt.js";

function App() {
    const [username, setUsername] = React.useState("");
    const [showUserNamePrompt, setShowUserNamePrompt] = React.useState(false);
    const error = useError();
    const { userLocation } = useUserLocation();
    const { places, globeEl, handleJoin, handleMyLocation } = useSocket(userLocation, username, error);

    const handleUserNameSubmit = (username) => {
        setUsername(username);
        setShowUserNamePrompt(false);
        handleJoin(username);
    };

    const handleJoinClick = () => {
        if (!username) {
            setShowUserNamePrompt(true);
        } else {
            handleJoin(username);
        }
    };

    return (
        <div className="App container">
            <ErrorMessage error={error} />
            {showUserNamePrompt ? (
                <UserNamePrompt onSubmit={handleUserNameSubmit} />
            ) : (
                <ControlPanel
                    handleJoin={handleJoinClick}
                    globeElement={globeEl}
                    setError={error.setError}
                    handleMyLocation={handleMyLocation}
                />
            )}
            <GlobeComponent places={places} globeEl={globeEl} />
        </div>
    );
}

export default App;