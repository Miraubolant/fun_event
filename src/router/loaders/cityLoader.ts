import type { LoaderFunctionArgs } from 'react-router-dom';
import { citiesData } from '../../data/generated/cities-data';

export async function cityLoader({ params }: LoaderFunctionArgs) {
  const { citySlug } = params;

  if (!citySlug || !citiesData[citySlug]) {
    throw new Response('Ville non trouvée', { status: 404 });
  }

  const city = citiesData[citySlug];

  if (params.departmentSlug && params.departmentSlug !== city.departmentSlug) {
    throw new Response('Ville non trouvée', { status: 404 });
  }

  return { city };
}
