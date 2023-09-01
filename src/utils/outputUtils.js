// outputUtils.js

export const generateOutputContent = (
    mapDimensions,
    mountains,
    treasures,
    adventurers
  ) => {
    const outputLines = [];
  
    outputLines.push(`C - ${mapDimensions.width} - ${mapDimensions.height}`);
  
    for (const mountain of mountains) {
      outputLines.push(`M - ${mountain.x} - ${mountain.y}`);
    }
  
    for (const treasure of treasures) {
      outputLines.push(`T - ${treasure.x} - ${treasure.y} - ${treasure.count}`);
    }
  
    for (const adventurer of adventurers) {
      outputLines.push(
        `A - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.orientation} - ${adventurer.treasuresCollected}`
      );
    }
  
    return outputLines.join("\n");
  };
  
  export const downloadOutput = (
    mapDimensions,
    mountains,
    treasures,
    adventurers
  ) => {
    const outputContent = generateOutputContent(
      mapDimensions,
      mountains,
      treasures,
      adventurers
    );
    const blob = new Blob([outputContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.txt";
    link.click();
    URL.revokeObjectURL(url);
  };
  