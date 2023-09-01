import React, { useState } from "react";
import { FaMountain } from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import { BiBody } from "react-icons/bi";

function Map({ mapDimensions, mountains, treasures, adventurers }) {
  const { width, height } = mapDimensions;

  // Utility function to determine the content of a cell based on its coordinates
  function determineCellContent(x, y, mountains, treasures, adventurers) {
    // Check if the current cell is a mountain
    const mountain = mountains.find((mtn) => mtn.x === x && mtn.y === y);
    // Check if the current cell has treasures
    const treasure = treasures.find((t) => t.x === x && t.y === y);
    // Check if any adventurer is present on the current cell
    const adventurer = adventurers.find((adv) => adv.x === x && adv.y === y);
    return { mountain, treasure, adventurer };
  }

  // Utility function to render the content of a cell based on its components
  const renderCell = (x, y) => {
    const { mountain, treasure, adventurer } = determineCellContent(
      x,
      y,
      mountains,
      treasures,
      adventurers
    );
    if (mountain) {
      // Render mountain icon
      return (
        <div className="cell mountain" data-x={x} data-y={y}>
          <FaMountain color="white" className="mountain-icon" />
        </div>
      );
    } else if (treasure) {
      // Render treasure icon and count
      return (
        <div className="cell treasure" data-x={x} data-y={y}>
          <BsFillBoxFill className="treasure-icon" />
          {`(${treasure.count})`}
        </div>
      );
    } else if (adventurer) {
      // Render adventurer icon and name
      return (
        <div
          data-x={x}
          data-y={y}
          className={`cell treasure ${
            adventurer ? adventurer.orientation : ""
          }`}
        >
          <BiBody className="body-icon"></BiBody>
          {adventurer.name}
        </div>
      );
    } else {
      return <div className="cell plain" />;
    }
  };

  return (
    <div className="map" data-testid="map-component">
      {Array.from({ length: height }, (_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: width }, (_, columnIndex) => (
            <div key={columnIndex} className="cell">
              {renderCell(columnIndex, rowIndex)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Map;
