import { Link } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';
import { citiesData } from '../data/generated/cities-data';
import type { NearestCity } from '../types';

interface NearestCitiesProps {
  cities: NearestCity[];
  currentCityName: string;
}

export default function NearestCities({ cities, currentCityName }: NearestCitiesProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
        <MapPin className="w-8 h-8 text-blue-600" />
        Villes proches de {currentCityName}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Nous livrons également nos structures gonflables dans ces villes voisines
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            to={`/location/${citiesData[city.slug]?.departmentSlug || ''}/${city.slug}`}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-orange-50 hover:from-blue-100 hover:to-orange-100 rounded-xl transition-all group shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {city.name}
                </p>
                <p className="text-sm text-gray-500">{city.postalCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-white/70 px-3 py-1 rounded-full ml-2">
              <Navigation className="w-4 h-4" />
              <span>{city.distance.toFixed(1)} km</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <p className="text-center text-green-800 font-medium">
          🚚 Livraison gratuite dans toutes ces villes
        </p>
      </div>
    </div>
  );
}
