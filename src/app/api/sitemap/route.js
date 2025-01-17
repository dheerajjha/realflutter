import { fetchCategoryWithSubCategories } from "@/lib/apis";
import sanityClient from "@/lib/sanity";
import { groq } from "next-sanity";

async function getAllPackages() {
  const query = groq`*[_type == "package"]{
    "slug": slug.current,
    "categorySlug": subCategories[0]->.slug.current
  }`;
  return sanityClient.fetch(query);
}

export async function GET() {
  try {
    // Fetch all categories and subcategories
    const [categories, packages] = await Promise.all([
      fetchCategoryWithSubCategories(),
      getAllPackages()
    ]);
    
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
    
    // Add category pages
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

    // Add individual package pages
    packages.forEach(pkg => {
      if (pkg.categorySlug && pkg.slug) {
        xml += `
          <url>
            <loc>${baseUrl}/${pkg.categorySlug}/${pkg.slug}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
          </url>`;
      }
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