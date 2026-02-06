import type { LoaderFunctionArgs } from 'react-router-dom';
import { departmentsData } from '../../data/generated/departments-data';
import { citiesData, citySlugs } from '../../data/generated/cities-data';

// Build a lookup: slug → department code
const slugToCode: Record<string, string> = {};
for (const [code, dept] of Object.entries(departmentsData)) {
  slugToCode[dept.slug] = code;
}

export async function departmentLoader({ params }: LoaderFunctionArgs) {
  const { departmentSlug } = params;

  if (!departmentSlug) {
    throw new Response('Département non trouvé', { status: 404 });
  }

  // Find department by slug
  const departmentCode = slugToCode[departmentSlug];
  if (!departmentCode || !departmentsData[departmentCode]) {
    throw new Response('Département non trouvé', { status: 404 });
  }

  const department = departmentsData[departmentCode];

  // Charger les villes du département triées par population
  const cities = citySlugs
    .map(slug => citiesData[slug])
    .filter(city => city.departmentCode === departmentCode)
    .sort((a, b) => {
      const popA = parseInt(a.population.replace(/[^\d]/g, ''));
      const popB = parseInt(b.population.replace(/[^\d]/g, ''));
      return popB - popA;
    })
    .slice(0, 50);

  return { department, cities };
}
