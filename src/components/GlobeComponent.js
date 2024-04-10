import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import arcsData from "../data/data.js";

const AUTO_ROTATE_SPEED = 0.5;
const POV_POSITION_TIME = 20000;

function GlobeComponent({ places, globeEl }) {
    const globeRef = useRef();

   useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current .controls().autoRotateSpeed = AUTO_ROTATE_SPEED;
        }
    }, []);

    return (
        <Globe
            // pointOfView
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
    );
}

export default GlobeComponent;