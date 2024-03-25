import React from "react";
import Globe from "react-globe.gl";
import "./App.css";
import placesData from "./data/places.js";
import arcsData from "./data/data.js";
import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import ErrorMessage from "./components/ErrorMessage.js";

const AUTO_ROTATE_SPEED = 0.5;
const POV_POSITION_TIME = 20000;
// const LABEL_COLOR = "rgba(255, 165, 0, 0.75)";
const socket = io("http://localhost:3001");

function App() {
  const globeEl = useRef();

  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState(placesData);
  const [joined, setJoined] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          setErrorMessage("Error during getting user location: " + error.message);
        }
      );
    } else {
      setErrorMessage("Your browser doesn't support Geolocation API.");
    }
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = AUTO_ROTATE_SPEED;
    }
  }, []);

  const handleJoin = () => {
    // User can join only once
    if (joined) {
      // TODO show "You have already joined!" message as ErrorMessage component, not as alert
      alert("You have already joined!");
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

  function fetchPlaces() {
    socket.emit("getPlaces");
  }

  useEffect(() => {
    socket.on("connect_error", (error) => {
      console.error("Error during connection to the server:", error);
      setErrorMessage("Error during connection to the server: " + error.message);
    });

    socket.on("placesData", (updatedPlaces) => {
      setPlaces(updatedPlaces);
    });

    window.addEventListener("load", fetchPlaces);
    // Don't forget to clean up on component unmount
    return () => {
      window.removeEventListener("load", fetchPlaces);
      socket.off("placesData");
    };
  }, []);

  return (
    <div className="App">
      {errorMessage && <ErrorMessage errorTitle="Error" error={{ errorMessage: errorMessage, setErrorMessage: setErrorMessage }} />}

      <div className="control-panel">
        <button onClick={handleJoin}>Join to</button>
        <button
          onClick={() => {
            if (userLocation && globeEl.current) {
              try {
                globeEl.current.pointOfView(userLocation, POV_POSITION_TIME);
              } catch (error) {
                console.error("Error during setting point of view:", error);
              }
            }
          }}
        >
          Go to my location
        </button>
      </div>
      <Globe
        pointOfView
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // edges
        arcsData={arcsData}
        arcColor={"color"}
        //arcDashLength={() => 0.5}
        arcDashGap={(d) => 1 - (d.stroke - 0.1)}
        arcDashAnimateTime={(d) => 5000}
        arcStroke={"stroke"}
        //arcCircularResolution={64}
        // arcLabel={() => "test"}
        // labels
        labelsData={places}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelText={(d) => d.name}
        labelSize={(d) => 0.5 + d.size}
        labelDotRadius={(d) => 0.5 + d.size}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
        labelResolution={2}
        // bars
        hexBinPointsData={places}
        hexBinPointWeight="size"
        hexAltitude={(d) => d.sumWeight - 0.1 + 0.05}
        hexBinResolution={4}
        hexBinMerge={true}
        enablePointerInteraction={false}
      />
    </div>
  );
}

export default App;
