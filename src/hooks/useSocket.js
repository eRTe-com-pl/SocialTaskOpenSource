import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import placesData from "../data/places.js";

const socket = io("http://localhost:3001");

export function useSocket(userLocation, username, errorHandler) {
    const globeEl = useRef();
    const [places, setPlaces] = useState(placesData);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        const fetchPlaces = () => {
            socket.emit("getPlaces");
        };

        socket.on("connect_error", (error) => {
            console.error("Error during connection to the server:", error);
            errorHandler.setError("Error", "Error during connection to the server: " + error.message, false);
        });

        socket.on("placesData", (updatedPlaces) => {
            setPlaces(updatedPlaces);
        });

        fetchPlaces();

        return () => {
            socket.off("placesData");
        };
    }, []);

    const handleMyLocation = () => {
        if (globeEl.current && userLocation) {
            try {
                const { lat, lng } = userLocation;
                globeEl.current.pointOfView({
                    lat,
                    lng,
                    altitude: 2.5
                }, 2000);
            } catch (error) {
                console.error("Error during setting point of view:", error);
                errorHandler.setError("Error", "Error during setting point of view", false);
            }
        }
    };
    const handleJoin = (username) => {
        if (joined) {
            errorHandler.setError("Wait a while...", "You have already joined!", true);

            return;
        }
        if (userLocation && username) {
            console.log("User location:", userLocation);
            console.log("Username:", username);

            const newPlace = {
                name: username,
                lat: userLocation.lat,
                lng: userLocation.lng,
                size: 1,
            };
            console.log("New place:", newPlace);
            setPlaces([...places, newPlace]);
            setJoined(true);
            socket.emit("newPlace", newPlace);
            handleMyLocation();
        }
    };

    return {places, globeEl, handleJoin, handleMyLocation};
}
