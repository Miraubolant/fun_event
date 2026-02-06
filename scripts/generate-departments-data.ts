import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface JSONDepartmentData {
  departement: {
    code: string;
    nom: string;
    slug: string;
  };
  region: {
    id: number;
    code: string;
    nom: string;
    slug: string;
  };
  voisins: Array<{
    dep_code: string;
    dep_nom: string;
    dep_slug: string;
  }>;
  villes_count: number;
  villes: Array<{
    id: number;
    code_insee: string;
    nom_standard: string;
    slug_ville: string;
    code_postal: string;
    population: number;
    superficie_km2: string;
    latitude_centre: string;
    longitude_centre: string;
  }>;
}

interface DepartmentData {
  code: string;
  name: string;
  slug: string;
  fullName: string;
  region: string;
  citiesCount: number;
  neighboringDepartments: string[];
  description: string;
  benefits: string[];
}

// Départements de l'Île-de-France uniquement
const IDF_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95'];

const departmentDescriptions: Record<string, string> = {
  '75': 'Fun Event livre ses structures gonflables dans tout Paris. La capitale offre de nombreux espaces pour vos événements : parcs, jardins, cours d\'immeubles, terrasses. Livraison gratuite dans les 20 arrondissements.',
  '77': 'Location de structures gonflables en Seine-et-Marne. Fun Event dessert toutes les villes du 77 avec livraison gratuite. Idéal pour les événements en zone rurale comme urbaine.',
  '78': 'Structures gonflables livrées dans toutes les Yvelines. Fun Event intervient dans tout le 78 pour vos fêtes et événements. Livraison gratuite et installation professionnelle.',
  '91': 'Fun Event livre dans toute l\'Essonne. Location de châteaux gonflables et toboggans pour tous vos événements dans le 91. Service de qualité et livraison gratuite.',
  '92': 'Location de structures gonflables dans les Hauts-de-Seine. Fun Event dessert tout le 92 avec livraison gratuite. Parfait pour les événements urbains et d\'entreprise.',
  '93': 'Structures gonflables en Seine-Saint-Denis. Fun Event intervient dans tout le 93 pour vos anniversaires, fêtes et événements. Livraison et installation gratuites.',
  '94': 'Fun Event livre dans tout le Val-de-Marne. Location de châteaux et structures gonflables pour tous vos événements dans le 94. Service professionnel et livraison gratuite.',
  '95': 'Location de structures gonflables dans le Val-d\'Oise. Fun Event dessert toutes les villes du 95 avec livraison gratuite. Idéal pour les événements familiaux et associatifs.',
};

const departmentBenefits: Record<string, string[]> = {
  '75': [
    'Livraison gratuite dans les 20 arrondissements',
    'Installation en moins de 2h',
    'Structures adaptées aux espaces urbains',
    'Service 7j/7 disponible',
  ],
  '77': [
    'Livraison gratuite dans tout le département',
    'Structures pour grands espaces extérieurs',
    'Installation professionnelle incluse',
    'Devis gratuit sous 48h',
  ],
  '78': [
    'Livraison gratuite dans les Yvelines',
    'Large choix de structures premium',
    'Installation par techniciens qualifiés',
    'Service client réactif',
  ],
  '91': [
    'Livraison gratuite en Essonne',
    'Structures certifiées NF',
    'Installation et démontage inclus',
    'Assurance RC Pro incluse',
  ],
  '92': [
    'Livraison gratuite dans tout le 92',
    'Structures adaptées aux événements corporate',
    'Installation rapide et discrète',
    'Service premium disponible',
  ],
  '93': [
    'Livraison gratuite en Seine-Saint-Denis',
    'Structures pour tous budgets',
    'Installation professionnelle',
    'Support téléphonique 7j/7',
  ],
  '94': [
    'Livraison gratuite dans le Val-de-Marne',
    'Structures récentes et bien entretenues',
    'Installation incluse',
    'Devis personnalisé gratuit',
  ],
  '95': [
    'Livraison gratuite dans le Val-d\'Oise',
    'Large gamme de structures',
    'Installation par professionnels',
    'Prix compétitifs garantis',
  ],
};

function transformDepartmentData(jsonData: JSONDepartmentData): DepartmentData {
  const code = jsonData.departement.code;

  return {
    code: jsonData.departement.code,
    name: jsonData.departement.nom,
    slug: jsonData.departement.slug,
    fullName: jsonData.departement.nom,
    region: jsonData.region.nom,
    citiesCount: jsonData.villes_count,
    neighboringDepartments: jsonData.voisins.map((v) => v.dep_code),
    description: departmentDescriptions[code] || `Location de structures gonflables dans le département ${jsonData.departement.nom}.`,
    benefits: departmentBenefits[code] || [
      'Livraison gratuite',
      'Installation incluse',
      'Devis gratuit',
      'Service professionnel',
    ],
  };
}

// Script principal
console.log('🚀 Génération des données de départements d\'Île-de-France...\n');

const deptsDir = path.join(__dirname, '../data/departements');
const files = fs.readdirSync(deptsDir);

const departmentsData: Record<string, DepartmentData> = {};
let processedCount = 0;

files.forEach((file) => {
  if (!file.endsWith('.json')) return;

  try {
    const jsonData = JSON.parse(
      fs.readFileSync(path.join(deptsDir, file), 'utf-8')
    ) as JSONDepartmentData;

    // Filtrer uniquement l'Île-de-France
    if (IDF_DEPARTMENTS.includes(jsonData.departement.code)) {
      const deptData = transformDepartmentData(jsonData);
      departmentsData[deptData.code] = deptData;
      processedCount++;

      console.log(`✓ ${deptData.code} - ${deptData.name} (${deptData.citiesCount} villes)`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${file}:`, error);
  }
});

console.log(`\n📊 Total : ${processedCount} départements IDF traités\n`);

// Créer le dossier de sortie s'il n'existe pas
const outputDir = path.join(__dirname, '../src/data/generated');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Générer le fichier TypeScript
const output = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated on ${new Date().toISOString()}
// Total departments in Île-de-France: ${Object.keys(departmentsData).length}

import type { DepartmentData } from '../../types';

export const departmentsData: Record<string, DepartmentData> = ${JSON.stringify(departmentsData, null, 2)};

export const departmentCodes = Object.keys(departmentsData);

export const totalDepartments = departmentCodes.length;
`;

fs.writeFileSync(
  path.join(outputDir, 'departments-data.ts'),
  output
);

console.log(`✅ Fichier généré : src/data/generated/departments-data.ts`);
console.log(`   ${Object.keys(departmentsData).length} départements d'Île-de-France disponibles\n`);
