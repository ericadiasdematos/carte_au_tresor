import { useState, useEffect } from "react";
import { processFileContent } from "../utils/dataUtils";

export function useGameLogic() {
  // Using custom hook for game logic
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [mountains, setMountains] = useState([]);
  const [treasures, setTreasures] = useState([]);
  const [adventurers, setAdventurers] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingError, setLoadingError] = useState(null); // État pour suivre les erreurs


  // Retrieving data from text file when application loads
  useEffect(() => {
    fetch("/mapData.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load map data.");
        }
        return response.text();
      })
      .then((fileContent) => {
        const parsedData = processFileContent(fileContent);
        setMapDimensions(parsedData.mapDimensions);
        setMountains(parsedData.mountains);
        setTreasures(parsedData.treasures);
        setAdventurers(parsedData.adventurers);
      })
      .catch((error) => {
        setLoadingError("An error occurred while loading map data.");
        console.error("Error reading file:", error);
      });
  }, []);

  // Adventurer movement function
  const moveAdventurers = () => {
    const updatedAdventurers = adventurers.map((adventurer) => {
      const { movements } = adventurer;
      const currentMovement = movements[currentStep];
      let newOrientation = adventurer.orientation;
      let newX = adventurer.x;
      let newY = adventurer.y;

      if (currentMovement === "A") {
        // Move forward based on orientation
        if (newOrientation === "N") newX--;
        else if (newOrientation === "S") newX++;
        else if (newOrientation === "E") newY++;
        else if (newOrientation === "O") newY--;

        // Check if the new position is not a mountain
        const isMountain = mountains.some(
          (mountain) => mountain.x === newX && mountain.y === newY
        );
        if (isMountain) {
          newX = adventurer.x; // Restore previous X position
          newY = adventurer.y; // Restore previous Y position
        }

        if (!isMountain) {
          // Check if the new position has a treasure
          const treasureCell = treasures.find(
            (treasure) => treasure.x === newX && treasure.y === newY
          );
          const treasureCellIndex = treasures.findIndex(
            (treasure) => treasure.x === newX && treasure.y === newY
          );

          if (treasureCell) {
            // Increment the treasuresCollected property
            adventurer.treasuresCollected =
              (adventurer.treasuresCollected || 0) + 1;
            const updatedTreasures = [...treasures];
            const updatedTreasure = { ...updatedTreasures[treasureCellIndex] };
            updatedTreasure.count = Math.max(updatedTreasure.count - 1, 0);
            updatedTreasures[treasureCellIndex] = updatedTreasure;
            setTreasures(updatedTreasures);
          }
        }
      } else if (currentMovement === "D") {
        // Rotate right
        newOrientation = getNextOrientation(newOrientation, "R");
      } else if (currentMovement === "G") {
        // Rotate left
        newOrientation = getNextOrientation(newOrientation, "L");
      }

      // Make sure the adventurer stays within map bounds
      newX = Math.min(Math.max(newX, 0), mapDimensions.width - 1);
      newY = Math.min(Math.max(newY, 0), mapDimensions.height - 1);

      return { ...adventurer, x: newX, y: newY, orientation: newOrientation };
    });

    setAdventurers(updatedAdventurers);
    setCurrentStep(currentStep + 1);
  };

  const getNextOrientation = (currentOrientation, rotation) => {
    const orientations = ["N", "E", "S", "W"];
    const currentIndex = orientations.indexOf(currentOrientation);
    const rotationIndex = rotation === "R" ? 1 : -1;
    const newIndex =
      (currentIndex + rotationIndex + orientations.length) %
      orientations.length;
    return orientations[newIndex];
  };

  return {
    mapDimensions,
    mountains,
    treasures,
    adventurers,
    loadingError,
    moveAdventurers,
  };
}
