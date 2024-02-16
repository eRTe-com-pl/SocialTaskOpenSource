import Globe from "react-globe.gl";
import './App.css';
import places from './assets/places';
import arcsData from './assets/data';
import { useRef, useState, useEffect } from "react";

const AUTO_ROTATE_SPEED = 0.5;
const POV_POSITION_TIME = 20000;
// const LABEL_COLOR = "rgba(255, 165, 0, 0.75)";

function App() {
  const globeEl = useRef();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error while getting geolocation:", error);
        }
      );
    } else {
      console.error("Your browser doesn't support Geolocation API.");
    }
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = AUTO_ROTATE_SPEED;
    }
  }, []);

  return (
    <div className="App">
      <div className="control-panel">
        <button>Join to</button>
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
