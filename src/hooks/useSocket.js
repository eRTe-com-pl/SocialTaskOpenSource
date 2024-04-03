import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import placesData from "../data/places.js";
import ErrorMessage from "../components/ErrorMessage.js";

const socket = io("http://localhost:3001");

export function useSocket(userLocation, setErrorMessage) {
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