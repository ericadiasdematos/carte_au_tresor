import "./App.css";
import React from "react";
import Map from "./components/Map";
import { useGameLogic } from "./hooks/useGameLogic";
import { generateOutputContent, downloadOutput } from "./utils/outputUtils";

function App() {
  // Using custom hook for game logic
  const {
    mapDimensions,
    mountains,
    treasures,
    adventurers,
    loadingError,
    moveAdventurers,
  } = useGameLogic();

  return (
    <div className="App">
      <div className="title_div">
        <h1>Madre de Dios Map</h1>
      </div>
      <div className="map_div">
        {loadingError ? ( // Afficher le message d'erreur s'il y a une erreur
          <div className="error_div">
            <p>{loadingError}</p>
          </div>
        ) : (
          <Map
            mapDimensions={mapDimensions}
            mountains={mountains}
            treasures={treasures}
            adventurers={adventurers}
            data-testid="map-component"
          />
        )}
      </div>
      <div>
        <button onClick={moveAdventurers}>Faire 1 mouvement</button>
        <button
          onClick={() =>
            downloadOutput(mapDimensions, mountains, treasures, adventurers)
          }
        >
          Download Output
        </button>
      </div>
    </div>
  );
}

export default App;
