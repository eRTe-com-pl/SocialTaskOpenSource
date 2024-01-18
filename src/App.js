import Globe from "react-globe.gl";
import './App.css';
import places from './assets/places';
import arcsData from './assets/data';
import { useRef, useState, useEffect } from "react";
// export default function App() {
  
  function App() {
  const globeEl = useRef();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Pobierz geolokalizację użytkownika przy pierwszym renderowaniu komponentu
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Błąd pobierania geolokalizacji:", error.message);
        }
      );
    } else {
      console.error("Twoja przeglądarka nie obsługuje Geolocation API.");
    }
  }, []); // Pusta tablica dependencies oznacza, że useEffect zostanie wykonany tylko raz po pierwszym renderowaniu

  useEffect(() => {
    // Dodaj kod do obsługi automatycznego obrotu po utworzeniu komponentu Globe
    if (globeEl.current) {
      // Skorzystaj z dostępu do API Globe poprzez ref
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, [globeEl]); // Wstawienie globeEl jako zależności, aby useEffect zadziałał po załadowaniu komponentu Globe


  return (
    <div className="App">
      <button
        onClick={() => {
          if (userLocation && globeEl.current) {
            try {
              globeEl.current.pointOfView(userLocation, 20000);
            } catch (error) {
              console.error("Błąd podczas ustawiania punktu widzenia:", error.message);
            }
          }
        }}
      >
        Przejdź do mojej lokalizacji
      </button>
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
