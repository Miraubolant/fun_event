import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface JSONCityData {
  ville: {
    id: number;
    code_insee: string;
    nom_standard: string;
    nom_a: string | null;
    nom_de: string | null;
    slug_ville: string;
    departement_id: number;
    code_postal: string;
    population: number;
    superficie_km2: string;
    latitude_centre: string;
    longitude_centre: string;
    dep_code: string;
    dep_nom: string;
    dep_slug: string;
    reg_code: string;
    reg_nom: string;
    reg_slug: string;
  };
  departement: {
    code: string;
    nom: string;
    slug: string;
  };
  region: {
    code: string;
    nom: string;
    slug: string;
  };
  villes_proches: Array<{
    id: number;
    code_insee: string;
    nom_standard: string;
    nom_a: string | null;
    nom_de: string | null;
    slug_ville: string;
    departement_id: number;
    code_postal: string;
    population: number;
    superficie_km2: string;
    latitude_centre: string;
    longitude_centre: string;
    distance_km: number;
  }>;
}

interface CityData {
  slug: string;
  name: string;
  postalCode: string;
  department: string;
  departmentCode: string;
  departmentSlug: string;
  population: string;
  latitude: string;
  longitude: string;
  region: string;
  description: string;
  neighborhoods: string[];
  nearestCities: Array<{
    name: string;
    slug: string;
    distance: number;
    postalCode: string;
  }>;
}

// Départements de l'Île-de-France uniquement
const IDF_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95'];

function generateDescription(city: JSONCityData): string {
  const nearest = city.villes_proches
    .slice(0, 3)
    .map((v) => v.nom_standard)
    .join(', ');

  const populationFormatted = city.ville.population.toLocaleString('fr-FR');

  return `Location de structures gonflables à ${city.ville.nom_standard}, ville de ${populationFormatted} habitants située dans le département ${city.departement.nom} (${city.departement.code}). Nous livrons gratuitement dans toute la commune et les villes proches : ${nearest}. Installation professionnelle, devis gratuit sous 48h.`;
}

function generateNeighborhoods(cityName: string, population: number): string[] {
  const baseNeighborhoods = ['Centre-ville', 'Quartier résidentiel', 'Zone pavillonnaire'];

  if (population > 50000) {
    baseNeighborhoods.push('Zone commerciale', 'Quartier Nord', 'Quartier Sud');
  }

  if (population > 100000) {
    baseNeighborhoods.push('Zone industrielle', 'Quartier Est', 'Quartier Ouest');
  }

  return baseNeighborhoods;
}

function transformCityData(jsonData: JSONCityData): CityData {
  return {
    slug: jsonData.ville.slug_ville,
    name: jsonData.ville.nom_standard,
    postalCode: jsonData.ville.code_postal,
    department: jsonData.departement.nom,
    departmentCode: jsonData.departement.code,
    departmentSlug: jsonData.departement.slug,
    population: jsonData.ville.population.toLocaleString('fr-FR') + ' habitants',
    latitude: jsonData.ville.latitude_centre,
    longitude: jsonData.ville.longitude_centre,
    region: jsonData.region.nom,
    description: generateDescription(jsonData),
    neighborhoods: generateNeighborhoods(jsonData.ville.nom_standard, jsonData.ville.population),
    nearestCities: jsonData.villes_proches.slice(0, 10).map((v) => ({
      name: v.nom_standard,
      slug: v.slug_ville,
      distance: v.distance_km,
      postalCode: v.code_postal,
    })),
  };
}

// Script principal
console.log('🚀 Génération des données de villes d\'Île-de-France...\n');

const villesDir = path.join(__dirname, '../data/villes');
const files = fs.readdirSync(villesDir);

const citiesData: Record<string, CityData> = {};
let processedCount = 0;
let skippedCount = 0;

files.forEach((file) => {
  if (!file.endsWith('.json')) return;

  try {
    const jsonData = JSON.parse(
      fs.readFileSync(path.join(villesDir, file), 'utf-8')
    ) as JSONCityData;

    // Filtrer uniquement l'Île-de-France
    if (IDF_DEPARTMENTS.includes(jsonData.departement.code)) {
      const cityData = transformCityData(jsonData);
      citiesData[cityData.slug] = cityData;
      processedCount++;

      if (processedCount % 100 === 0) {
        console.log(`✓ ${processedCount} villes traitées...`);
      }
    } else {
      skippedCount++;
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${file}:`, error);
  }
});

console.log(`\n📊 Statistiques :`);
console.log(`   - Villes IDF traitées : ${processedCount}`);
console.log(`   - Villes hors IDF ignorées : ${skippedCount}`);
console.log(`   - Total : ${processedCount + skippedCount}\n`);

// Créer le dossier de sortie s'il n'existe pas
const outputDir = path.join(__dirname, '../src/data/generated');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Générer le fichier TypeScript
const output = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated on ${new Date().toISOString()}
// Total cities in Île-de-France: ${Object.keys(citiesData).length}

import type { CityData } from '../../types';

export const citiesData: Record<string, CityData> = ${JSON.stringify(citiesData, null, 2)};

export const citySlugs = Object.keys(citiesData);

export const totalCities = citySlugs.length;
`;

fs.writeFileSync(
  path.join(outputDir, 'cities-data.ts'),
  output
);

console.log(`✅ Fichier généré : src/data/generated/cities-data.ts`);
console.log(`   ${Object.keys(citiesData).length} villes d'Île-de-France disponibles\n`);
