import React from "react";
import "./ControlPanel.scss";

const POV_POSITION_TIME = 20000;

function ControlPanel({handleMyLocation, handleJoin, globeElement, setError}) {
    return (
        <div className="control-panel">
            <h1>Control Panel</h1>
            <div className="control-panel__buttons">
                <button onClick={handleMyLocation}>My Location</button>
                <button onClick={handleJoin}>Join to</button>
            </div>

        </div>
    );
}

export default ControlPanel;
