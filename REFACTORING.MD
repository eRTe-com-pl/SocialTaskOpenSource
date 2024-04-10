Oczywiście, możemy podzielić kod na mniejsze części poprzez wyodrębnienie niektórych funkcjonalności do osobnych komponentów lub hooków. Poniżej przedstawiam propozycję podziału kodu na kilka mniejszych części:

```javascript
// App.js
import React from "react";
import GlobeComponent from "./GlobeComponent";
import ControlPanel from "./ControlPanel";
import ErrorMessage from "./ErrorMessage";
import { useUserLocation } from "./hooks/useUserLocation";
import { useSocket } from "./hooks/useSocket";

function App() {
  const { userLocation, errorMessage, error } = useUserLocation();
  const { places, handleJoin, globeEl } = useSocket(userLocation);

  return (
    <div className="App">
      {error && <ErrorMessage errorTitle="Error" errorMessage={errorMessage} />}
      <ControlPanel handleJoin={handleJoin} globeEl={globeEl} />
      <GlobeComponent places={places} globeEl={globeEl} />
    </div>
  );
}

export default App;
```

```javascript
// GlobeComponent.js
import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import arcsData from "./data/data";

const AUTO_ROTATE_SPEED = 0.5;
const POV_POSITION_TIME = 20000;

function GlobeComponent({ places, globeEl }) {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
    }
  }, []);

  return (
    <Globe
      pointOfView
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      arcsData={arcsData}
      arcColor={"color"}
      arcDashGap={(d) => 1 - (d.stroke - 0.1)}
      arcDashAnimateTime={(d) => 5000}
      arcStroke={"stroke"}
      labelsData={places}
      labelLat={(d) => d.lat}
      labelLng={(d) => d.lng}
      labelText={(d) => d.name}
      labelSize={(d) => 0.5 + d.size}
      labelDotRadius={(d) => 0.5 + d.size}
      labelColor={() => "rgba(255, 165, 0, 0.75)"}
      labelResolution={2}
      hexBinPointsData={places}
      hexBinPointWeight="size"
      hexAltitude={(d) => d.sumWeight - 0.1 + 0.05}
      hexBinResolution={4}
      hexBinMerge={true}
      enablePointerInteraction={false}
    />
  );
}

export default GlobeComponent;
```

```javascript
// ControlPanel.js
import React from "react";

function ControlPanel({ handleJoin, globeEl }) {
  return (
    <div className="control-panel">
      <button onClick={handleJoin}>Join to</button>
      <button
        onClick={() => {
          if (globeEl.current) {
            try {
              globeEl.current.pointOfView(
                globeEl.current.userLocation,
                POV_POSITION_TIME
              );
            } catch (error) {
              console.error("Error during setting point of view:", error);
            }
          }
        }}
      >
        Go to my location
      </button>
    </div>
  );
}

export default ControlPanel;
```

```javascript
// ErrorMessage.js
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
```

```javascript
// hooks/useUserLocation.js
import { useState, useEffect } from "react";

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            setError(true);
            setErrorMessage(
              "Error during getting user location: " + error.message
            );
          }
        );
      } else {
        setErrorMessage("Your browser doesn't support Geolocation API.");
      }
    };
    fetchUserLocation();
  }, []);

  return { userLocation, errorMessage, error };
}
```

```javascript
// hooks/useSocket.js
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import placesData from "../data/places";

const socket = io("<http://localhost:3001>");

export function useSocket(userLocation) {
  const globeEl = useRef();
  const [places, setPlaces] = useState(placesData);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchPlaces = () => {
      socket.emit("getPlaces");
    };

    socket.on("connect_error", (error) => {
      console.error("Error during connection to the server:", error);
      setErrorMessage("Error during connection to the server: " + error.message);
      setError(true);
    });

    socket.on("placesData", (updatedPlaces) => {
      setPlaces(updatedPlaces);
    });

    fetchPlaces();

    return () => {
      socket.off("placesData");
    };
  }, []);

  const handleJoin = () => {
    if (joined) {
      setErrorMessage("You have already joined!");
      setError(true);
      return;
    }

    if (userLocation) {
      const userName = `User${Math.floor(Math.random() * 1000)}`;
      const newPlace = {
        name: userName,
        lat: userLocation.lat,
        lng: userLocation.lng,
        size: 1,
      };
      setPlaces([...places, newPlace]);
      setJoined(true);
      socket.emit("newPlace", newPlace);
    }
  };

  return { places, handleJoin, globeEl };
}
```

Dzięki temu podziałowi kod jest bardziej modułowy i łatwiejszy do zarządzania. każda część aplikacji ma swoją własną odpowiedzialność, co ułatwia późniejsze modyfikacje i utrzymanie kodu.