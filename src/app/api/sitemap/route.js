import { fetchCategoryWithSubCategories } from "@/lib/apis";

export async function GET() {
  try {
    // Fetch all categories and subcategories
    const categories = await fetchCategoryWithSubCategories();
    
    // Base URL of your website
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realflutter.com';
    
    // Start XML string
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    // Add static routes
    const staticRoutes = ['', '/templates', '/privacy-policy', '/terms-of-service'];
    staticRoutes.forEach(route => {
      xml += `
        <url>
          <loc>${baseUrl}${route}</loc>
          <changefreq>daily</changefreq>
          <priority>${route === '' ? '1.0' : '0.8'}</priority>
        </url>`;
    });
    
    // Add dynamic category and subcategory routes
    categories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        xml += `
          <url>
            <loc>${baseUrl}/${subCategory.currentSlug}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>`;
      });
    });
    
    // Close XML string
    xml += `
    </urlset>`;
    
    // Return the XML with proper content type
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
} 