import React from "react";
import { render } from "@testing-library/react";
import Map from "./Map";

describe("Map Component", () => {
  it("renders an empty map without errors", () => {
    // Define empty data for mountains, treasures, and adventurers
    const mapDimensions = { width: 5, height: 5 };
    const mountains = [];
    const treasures = [];
    const adventurers = [];

    // Render the Map component with empty data
    const { container } = render(
      <Map
        mapDimensions={mapDimensions}
        mountains={mountains}
        treasures={treasures}
        adventurers={adventurers}
      />
    );

    // Check for the presence of the map container
    const mapElement = container.querySelector(".map");
    expect(mapElement).toBeInTheDocument();

    // Check that there are no mountain icons
    const mountainIcons = container.querySelectorAll(".mountain");
    expect(mountainIcons.length).toBe(0);

    // Check that there are no treasure icons
    const treasureIcons = container.querySelectorAll(".treasure");
    expect(treasureIcons.length).toBe(0);

    // Check that there are no adventurer icons
    const adventurerIcons = container.querySelectorAll(".body_icon");
    expect(adventurerIcons.length).toBe(0);
  });

  it("renders mountains in the right cell", () => {
    // Define test data
    const mapDimensions = { width: 5, height: 5 };
    const mountains = [
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    const treasures = [];
    const adventurers = [];

    // Render the component with the test data
    const { container } = render(
      <Map
        mapDimensions={mapDimensions}
        mountains={mountains}
        treasures={treasures}
        adventurers={adventurers}
      />
    );

    // Check if the mountain icons are rendered in the correct cells
    const mountainIcons = container.querySelectorAll(".mountain-icon");
    expect(mountainIcons).toHaveLength(mountains.length);

    // Verify that the mountain icons are in the correct cells
    mountains.forEach((mountain) => {
      const cell = container.querySelector(
        `.cell.mountain[data-x="${mountain.x}"][data-y="${mountain.y}"]`
      );
      expect(cell).toBeInTheDocument();
      expect(cell.querySelector(".mountain-icon")).toBeInTheDocument(); // Check for mountain icon within the cell
    });
  });

  it("renders treasures in the right cell", () => {
    // Define test data
    const mapDimensions = { width: 5, height: 5 }; // Adjust dimensions as needed
    const mountains = [];
    const treasures = [
      { x: 2, y: 2, count: 1 },
      { x: 3, y: 3, count: 2 },
    ]; // Coordinates where treasures should be
    const adventurers = [];

    // Render the component with the test data
    const { container } = render(
      <Map
        mapDimensions={mapDimensions}
        mountains={mountains}
        treasures={treasures}
        adventurers={adventurers}
      />
    );

    // Verify that the treasure icons and counts are in the correct cells
    treasures.forEach((treasure) => {
      const cell = container.querySelector(
        `.cell.treasure[data-x="${treasure.x}"][data-y="${treasure.y}"]`
      );
      expect(cell).toBeInTheDocument();
      const treasureIcon = cell.querySelector(".treasure-icon"); // Modify this selector as needed
      expect(treasureIcon).toBeInTheDocument();
      expect(cell.textContent).toContain(`(${treasure.count})`);
    });
  });

  it('renders adventurers in the right cell', () => {
    // Define test data
    const mapDimensions = { width: 5, height: 5 }; // Adjust dimensions as needed
    const mountains = [];
    const treasures = [];
    const adventurers = [
      { name: 'Adventurer1', x: 2, y: 2, orientation: 'north' },
      { name: 'Adventurer2', x: 3, y: 3, orientation: 'south' },
    ]; // Coordinates and orientation for adventurers

    // Render the component with the test data
    const { container } = render(
      <Map mapDimensions={mapDimensions} mountains={mountains} treasures={treasures} adventurers={adventurers} />
    );

    // Verify that the adventurer icons and names are in the correct cells
    adventurers.forEach((adventurer) => {
      const cell = container.querySelector(`.cell.treasure[data-x="${adventurer.x}"][data-y="${adventurer.y}"]`);
      expect(cell).toBeInTheDocument();
      const adventurerIcon = cell.querySelector('.body-icon'); // Modify this selector as needed
      expect(adventurerIcon).toBeInTheDocument();
      expect(cell.textContent).toContain(adventurer.name);
    });
  });
});
