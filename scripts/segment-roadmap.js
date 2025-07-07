const fs = require('fs').promises;
const path = require('path');

async function segmentRoadmap() {
  try {
    const dataPath = path.join(__dirname, '..', 'app', 'roadmap_data.json');
    const outputDir = path.join(__dirname, '..', 'app', 'roadmap_data');

    // Read the large JSON file
    const roadmapFile = await fs.readFile(dataPath, 'utf8');
    const roadmap = JSON.parse(roadmapFile);

    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Extract the main 'weeks' object
    const weeksData = roadmap.weeks;

    // Process each week
    for (const weekNumber in weeksData) {
      if (weeksData.hasOwnProperty(weekNumber)) {
        const weekData = weeksData[weekNumber];
        const weekFileName = `week-${weekNumber}.json`;
        const weekFilePath = path.join(outputDir, weekFileName);
        
        // Create a new object for the week, including metadata
        const weekObject = {
          metadata: {
            ...roadmap.metadata,
            current_week: parseInt(weekNumber, 10),
          },
          week: weekData,
        };

        await fs.writeFile(weekFilePath, JSON.stringify(weekObject, null, 2));
        console.log(`Successfully created ${weekFileName}`);
      }
    }

    console.log('\nSegmentation complete!');
  } catch (error) {
    console.error('Error during segmentation:', error);
  }
}

segmentRoadmap(); 