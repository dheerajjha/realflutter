require('dotenv').config(); // Load environment variables from .env file
const { createAllPackages } = require('./createPackages');

async function testAllPackagesCreation() {
  console.log('Starting creation of all packages...');
  try {
    await createAllPackages();
    console.log('All packages created successfully.');
  } catch (error) {
    console.error('Error in test:', error);
  }
}

testAllPackagesCreation();