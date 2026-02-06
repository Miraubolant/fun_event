import fs from 'fs';
import path from 'path';

interface CityData {
  slug: string;
  name: string;
}

interface DepartmentData {
  code: string;
}

async function generateSitemap() {
  console.log('🗺️  Génération du sitemap...\n');

  // Lire les données générées
  const citiesDataPath = path.join(process.cwd(), 'src/data/generated/cities-data.ts');
  const departmentsDataPath = path.join(process.cwd(), 'src/data/generated/departments-data.ts');

  // Extraction des slugs de villes (parsing simple du fichier TypeScript)
  const citiesContent = fs.readFileSync(citiesDataPath, 'utf-8');
  const citySlugMatches = citiesContent.match(/['"]([a-z0-9-]+)['"]\s*:\s*\{/g);
  const citySlugs = citySlugMatches
    ? citySlugMatches.map(match => match.match(/['"]([a-z0-9-]+)['"]/)?.[1]).filter(Boolean) as string[]
    : [];

  // Extraction des codes de départements
  const departmentsContent = fs.readFileSync(departmentsDataPath, 'utf-8');
  const departmentCodeMatches = departmentsContent.match(/['"](\d{2})['"]\s*:\s*\{/g);
  const departmentCodes = departmentCodeMatches
    ? departmentCodeMatches.map(match => match.match(/['"](\d{2})['"]/)?.[1]).filter(Boolean) as string[]
    : [];

  const baseUrl = 'https://funevent.fr';
  const today = new Date().toISOString().split('T')[0];

  // URLs statiques avec priorités
  const staticUrls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/catalogue', priority: '0.9', changefreq: 'weekly' },
    { loc: '/galerie', priority: '0.7', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.7', changefreq: 'weekly' },
    { loc: '/faq', priority: '0.6', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
    { loc: '/devis', priority: '0.9', changefreq: 'monthly' },
    { loc: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
    { loc: '/politique-confidentialite', priority: '0.3', changefreq: 'yearly' },
  ];

  // URLs des départements
  const departmentUrls = departmentCodes.map(code => ({
    loc: `/location/${code}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  // URLs des villes
  const cityUrls = citySlugs.map(slug => ({
    loc: `/ville/${slug}`,
    priority: '0.7',
    changefreq: 'monthly'
  }));

  // Combiner toutes les URLs
  const allUrls = [...staticUrls, ...departmentUrls, ...cityUrls];

  // Générer le XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of allUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Sauvegarder le sitemap
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');

  console.log('📊 Statistiques du sitemap :');
  console.log(`   - Pages statiques : ${staticUrls.length}`);
  console.log(`   - Départements : ${departmentUrls.length}`);
  console.log(`   - Villes : ${cityUrls.length}`);
  console.log(`   - Total URLs : ${allUrls.length}`);
  console.log(`\n✅ Sitemap généré : public/sitemap.xml`);
  console.log(`   ${allUrls.length} URLs indexables\n`);
}

generateSitemap().catch(console.error);
