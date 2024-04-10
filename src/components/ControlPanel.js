import React from "react";

const POV_POSITION_TIME = 20000;
function ControlPanel({ handleJoin, globeElement, setErrorMessage }) {

    return (
        <div
            className="control-panel"
        >
            <h1>Control Panel</h1>
            <button
                onClick={() => {
                    if (globeElement) {
                        console.log(globeElement.current.pauseAnimation);
                        try {
                            globeElement.current.pointOfView(
                                globeElement.currentuserLocation, POV_POSITION_TIME);
                        } catch (error) {
                            console.error("Error during setting point of view:", error);
                        }
                    }
                }}
            >Go to my location</button>
            <button onClick={handleJoin}>Join to</button>
            <button onClick={globeElement.resetCamera}>Reset</button>
            <button onClick={globeElement.rotateCamera}>Rotate</button>
            <button onClick={globeElement.zoomCamera}>Zoom</button>
            <button onClick={globeElement.panCamera}>Pan</button>
            <button onClick={globeElement.toggleGlobe}>Toggle Globe</button>
            <button onClick={globeElement.toggleLabels}>Toggle Labels</button>
            <button onClick={globeElement.togglePoints}>Toggle Points</button>
            <button onClick={globeElement.toggleArcs}>Toggle Arcs</button>
            <button onClick={globeElement.toggleElevation}>Toggle Elevation</button>
            <button onClick={globeElement.toggleWireframe}>Toggle Wireframe</button>
            <button onClick={globeElement.toggleBackground}>Toggle Background</button>
            <button onClick={globeElement.toggleRings}>Toggle Rings</button>
            <button onClick={globeElement.toggleShadows}>Toggle Shadows</button>
            <button onClick={globeElement.toggleAtmosphere}>Toggle Atmosphere</button>
        </div>
    );
}

export default ControlPanel;