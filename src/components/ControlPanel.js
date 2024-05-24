import React from "react";
import "./ControlPanel.scss";

const POV_POSITION_TIME = 20000;

function ControlPanel({ handleMyLocation, handleJoin, globeElement, setError }) {
    return (
        <div className="control-panel">
            <h1>Control Panel</h1>
            <div class="accordion">
                PO naciśnieciu przycisku Sekcja 1, Sekcja 2, Sekcja 3, powinna się pokazać treść na przezroczystym tle. Oraza przyciski wybierz lub anuluj. Jesli dana tresc zostanie wybrana podświetli się przycisk skojarzony z nią

                <div class="accordion-block">
                    <button class="accordion-btn">Sekcja 1</button>
                    <div class="accordion-content hidden">
                        <p></p>
                    </div>
                </div>

                <div class="accordion-block">
                    <button class="accordion-btn">Sekcja 2</button>
                    <div class="accordion-content hidden">
                        <p></p>
                    </div>
                </div>

                <div class="accordion-block">
                    <button class="accordion-btn">Sekcja 3</button>
                    <div class="accordion-content hidden">
                        <p>Treść sekcji 3...</p>
                    </div>
                </div>
            </div>
            <div className="control-panel__buttons">
                <button onClick={handleMyLocation}>My Location</button>
                <button onClick={handleJoin}>Join to</button>
            </div>

        </div>
    );
}

export default ControlPanel;
