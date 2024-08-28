const { createClient } = require('@sanity/client');
const fs = require('fs');

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-08-28', // Use today's date
});

// Read the JSON file
const packagesData = JSON.parse(fs.readFileSync('packages.json', 'utf8'));

// Function to create a single package
async function createPackage(packageData) {
  try {
    const result = await client.create({
      _type: 'package',
      name: packageData.title,
      slug: {
        _type: 'slug',
        current: packageData.title.toLowerCase().replace(/\s+/g, "-").slice(0, 96)
      },
      author: packageData.publisher,
      shortDescription: packageData.description,
      // Note: packageImage and gallery are not provided in the given JSON format
      platforms: packageData.platform_data.map(platform => platform.toLowerCase()),
      lastUpdate: new Date(packageData.last_update).toISOString(),
      likesCount: parseInt(packageData.likes),
      pubPoint: parseInt(packageData.points),
      tutorialIncluded: true, // Assuming tutorial is included by default
      tags: packageData.hashtags,
      // Note: subCategories are not provided in the given JSON format
      description: packageData.description,
      // Note: tutorial and example are not provided in the given JSON format
      // Note: similarPackages and dependentPackages are not provided in the given JSON format
    });
    console.log(`Created package with ID: ${result._id}`);
  } catch (error) {
    console.error('Error creating package:', error.message);
    if (error.response) {
      console.error('Response details:', error.response);
    }
  }
}

// Create all packages
async function createAllPackages() {
  for (const packageData of packagesData) {
    try {
      await createPackage(packageData);
    } catch (error) {
      console.error('Failed to create package:', packageData.title);
      console.error('Error:', error);
      return; // Stop processing if there's an error
    }
  }
  console.log('All packages created successfully');
}

// Export the createPackage function
module.exports = {
  createPackage,
  createAllPackages
};

// Only run createAllPackages if this file is being run directly
if (require.main === module) {
  createAllPackages();
}