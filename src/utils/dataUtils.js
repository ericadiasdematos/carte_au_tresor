// dataUtils.js

// This function processes the content of the text file and returns an object with parsed data.
export function processFileContent(fileContent) {
    const lines = fileContent.split("\n");
    const parsedData = {
      mountains: [],
      treasures: [],
      adventurers: [],
    };

    // Iterate through each line in the file
    for (const line of lines) {
      const [type, ...data] = line.split(" - ");

    // If the type is "C", it represents the dimensions of the map
      if (type === "C") {
        const [width, height] = data.map(Number);
        parsedData.mapDimensions = { width, height };
      } 
    // If the type is "M", it represents the coordinates of a mountain
      else if (type === "M") {
        const [x, y] = data.map(Number);
        parsedData.mountains.push({ x, y });
      } 
    // If the type is "T", it represents the coordinates and count of treasures
      else if (type === "T") {
        const [x, y, count] = data.map(Number);
        parsedData.treasures.push({ x, y, count });
      } 
    // If the type is "A", it represents the details of an adventurer
      else if (type === "A") {
        const [name, xStr, yStr, orientation, movements] = data;
        parsedData.adventurers.push({
          name,
          x: parseInt(xStr),
          y: parseInt(yStr),
          orientation,
          movements,
          treasuresCollected: 0,
        });
      }
    }
  
    return parsedData;
  }


  