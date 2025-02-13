import React, {useEffect, useRef} from "react";
import dynamic from 'next/dynamic';


// import Globe from "react-globe.gl";
import arcsData from "../data/data.js";
import globeImage from '../assets/img/earth-night.jpg';
import backgroundImage from '../assets/img/night-sky.png';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });
const AUTO_ROTATE_SPEED = 0.5;
const POV_POSITION_TIME = 20000;

function GlobeComponent({places, globeEl}) {
    const globeRef = useRef();

    useEffect(() => {
        if (globeEl.current) {
            const controls = globeEl.current.controls; // If controls is an object
            if (controls && typeof controls.autoRotate !== 'undefined') {
                controls.autoRotate = true;
                controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
            } else {
                console.warn('Cannot access autoRotate properties on controls.');
            }
        }
    }, [globeEl]);

    // return <Globe ref={globeEl} places={places} />;

    return (
        <Globe
            // pointOfView
            places={places}
            ref={globeEl}
            globeImageUrl={globeImage}
            backgroundImageUrl={backgroundImage}
            // // edges
            arcsData={arcsData}
            arcColor={"color"}
            arcDashLength={() => 0.5}
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