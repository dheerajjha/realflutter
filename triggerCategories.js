require('dotenv').config(); // Load environment variables from .env file
const { createClient } = require('@sanity/client');
const categoriesData = require('./categories.json');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function deleteAllCategories() {
  try {
    // Fetch all existing categories
    const existingCategories = await client.fetch('*[_type == "category"]');
    
    // Delete each category
    for (const category of existingCategories) {
      await client.delete(category._id);
      console.log(`Deleted category: ${category.name}`);
    }
    
    console.log('All existing categories deleted');
  } catch (error) {
    console.error('Error deleting categories:', error);
  }
}

async function createCategories() {
  const categories = categoriesData["Flutter Packages"].map((category, index) => {
    const [name] = Object.keys(category);
    return {
      _type: 'category',
      name: name,
      order: index
    };
  });

  console.log(categories);

  try {
    for (const category of categories) {
      const result = await client.create(category);
      console.log(`Created category: ${result.name}`);
    }
    console.log('All categories created successfully');
  } catch (error) {
    console.error('Error creating categories:', error);
  }
}

async function deleteAllSubCategories() {
  try {
    const existingSubCategories = await client.fetch('*[_type == "subCategory"]');
    for (const subCategory of existingSubCategories) {
      await client.delete(subCategory._id);
      console.log(`Deleted subcategory: ${subCategory.name}`);
    }
    console.log('All existing subcategories deleted');
  } catch (error) {
    console.error('Error deleting subcategories:', error);
  }
}

async function createSubCategories() {
  try {
    const categories = await client.fetch('*[_type == "category"]');
    
    for (const categoryData of categoriesData["Flutter Packages"]) {
      const [categoryName, subCategories] = Object.entries(categoryData)[0];
      const category = categories.find(c => c.name === categoryName);
      
      if (!category) {
        console.error(`Category not found: ${categoryName}`);
        continue;
      }

      for (const subCategoryData of subCategories) {
        const [subCategoryName, subCategoryInfo] = Object.entries(subCategoryData)[0];
        const slug = subCategoryName.toLowerCase().replace(/\s+/g, '-');
        
        const subCategory = {
          _type: 'subCategory',
          name: subCategoryName,
          slug: {
            _type: 'slug',
            current: slug
          },
          description: subCategoryInfo.description,
          tags: [],
          category: {
            _type: 'reference',
            _ref: category._id
          },
          packagesCount: subCategoryInfo.packages.length
        };

        console.log(subCategory);

        const result = await client.create(subCategory);
        console.log(`Created subcategory: ${result.name}`);
      }
    }
    console.log('All subcategories created successfully');
  } catch (error) {
    console.error('Error creating subcategories:', error);
  }
}

async function main() {
  console.log('Starting category and subcategory creation process...');
  
  try {
    // await deleteAllCategories();
    // await createCategories();
    // await deleteAllSubCategories();
    await createSubCategories();
    console.log('Category and subcategory creation process completed successfully.');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

main();
