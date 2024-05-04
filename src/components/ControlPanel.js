import React from "react";
import "./ControlPanel.scss";

const POV_POSITION_TIME = 20000;
function ControlPanel({ handleMyLocation, handleJoin, globeElement, setError }) {
  return (
    <div className="control-panel">
      <h1>Control Panel</h1>
        <button onClick={handleMyLocation}>My Location</button>
      <button onClick={handleJoin}>Join to</button>
    </div>
  );
}

export default ControlPanel;
