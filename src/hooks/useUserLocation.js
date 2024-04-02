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