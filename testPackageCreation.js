require('dotenv').config(); // Load environment variables from .env file
const { fetchAndAppendPackages, createAllPackages } = require('./createPackages');
const { deleteAllPackages } = require('./deletionFunctions');

async function testPackageCreationWithFetch() {
  console.log('Starting package data fetch and creation...');
  
  const packageNames = ['in_app_purchase', 'image_picker', 'chopper', 'permission_handler']; // You can modify this list
  
  try {
    // await deleteAllPackages();
    await fetchAndAppendPackages(packageNames);
    await createAllPackages();
    console.log('All packages fetched, appended, and created successfully.');
  } catch (error) {
    console.error('Error in test:', error);
  }
}

testPackageCreationWithFetch();