import React from "react";
import Globe from "react-globe.gl";
import "./App.css";
import placesData from "./data/places.js";
import arcsData from "./data/data.js";
import {useRef, useState, useEffect} from "react";
import {io} from "socket.io-client";
import  ErrorMessage from "./components/ErrorMessage.js";
import GlobeComponent from "./components/GlobeComponent.js";
import ControlPanel from "./components/ControlPanel.js";

const AUTO_ROTATE_SPEED = 0.5;
const POV_POSITION_TIME = 20000;
// const LABEL_COLOR = "rgba(255, 165, 0, 0.75)";
const socket = io("http://localhost:3001");

function App() {
    const globeEl = useRef();

    const [userLocation, setUserLocation] = useState(null);
    const [places, setPlaces] = useState(placesData);
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;

                    setUserLocation({lat: latitude, lng: longitude});
                },
                (error) => {
                    setError(true);
                    setErrorMessage("Error during getting user location: " + error.message);
                }
            );
        } else {
            setErrorMessage("Your browser doesn't support Geolocation API.");
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
            setError(true);
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
            {error && (<ErrorMessage errorTitle="Error" errorMessage={errorMessage} setError={setError}/>)}
            <ControlPanel handleJoin={handleJoin} globeElement={globeEl} />
            <div className="control-panel">
                <button onClick={handleJoin}>Join to</button>
                {/* <button
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
                    Go to my locationssss
                </button> */}
            </div>
            <GlobeComponent places={places} globeEl={globeEl} />
        </div>
    );
}

export default App;
