import React, { useState } from "react";
import "./App.css";
import arcsData from "./data/data.js";
import ErrorMessage from "./components/ErrorMessage.js";
import GlobeComponent from "./components/GlobeComponent.js";
import ControlPanel from "./components/ControlPanel.js";
import { useUserLocation } from "./hooks/useUserLocation.js";
import { useSocket } from "./hooks/useSocket.js";
import { useError } from "./hooks/useError.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const error = useError();
  const { userLocation } = useUserLocation();
  const { places, globeEl, handleJoin, handleMyLocation } = useSocket(userLocation, error);

  return (
    <div className="App">
      <ErrorMessage error={error} />
      <ControlPanel handleJoin={handleJoin} globeElement={globeEl} setError={error.setError} handleMyLocation={handleMyLocation} />
      <GlobeComponent places={places} globeEl={globeEl} />
    </div>
  );
}

export default App;
