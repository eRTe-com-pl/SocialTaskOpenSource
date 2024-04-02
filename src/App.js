import React from "react";
// import Globe from "react-globe.gl";
import "./App.css";
// import placesData from "./data/places.js";
import arcsData from "./data/data.js";
// import { useRef, useState, useEffect } from "react";
// import { io } from "socket.io-client";
import ErrorMessage from "./components/ErrorMessage.js";
import GlobeComponent from "./components/GlobeComponent.js";
import ControlPanel from "./components/ControlPanel.js";
import { useUserLocation } from "./hooks/useUserLocation.js";
import { useSocket } from "./hooks/useSocket.js";

// const AUTO_ROTATE_SPEED = 0.5;
// const POV_POSITION_TIME = 20000;
// const LABEL_COLOR = "rgba(255, 165, 0, 0.75)";
// const socket = io("http://localhost:3001");

function App() {
    const {userLocation, errorMessage, error} = useUserLocation();
    const {places, globeEl, handleJoin} = useSocket(userLocation);

    return (
        <div className="App">
            {error && (<ErrorMessage errorTitle="Error" errorMessage={errorMessage} />)}
            <ControlPanel handleJoin={handleJoin} globeElement={globeEl} />
            <GlobeComponent places={places} globeEl={globeEl} />
        </div>
    );
}

export default App;
