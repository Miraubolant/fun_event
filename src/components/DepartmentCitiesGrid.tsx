import { Link } from 'react-router-dom';
import { Users, MapPin, ArrowRight } from 'lucide-react';
import type { CityData } from '../types';

interface DepartmentCitiesGridProps {
  cities: CityData[];
  departmentName: string;
  departmentCode: string;
  departmentSlug: string;
}

export default function DepartmentCitiesGrid({ cities, departmentName, departmentCode, departmentSlug }: DepartmentCitiesGridProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Principales villes de {departmentName}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Découvrez nos services de location de structures gonflables dans {cities.length} villes du département {departmentCode}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            to={`/location/${departmentSlug}/${city.slug}`}
            className="group p-5 bg-gradient-to-br from-blue-50 to-orange-50 hover:from-blue-100 hover:to-orange-100 rounded-2xl transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                {city.postalCode}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2 text-lg transition-colors">
              {city.name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Users className="w-4 h-4" />
              <span>{city.population}</span>
            </div>

            <div className="flex items-center text-blue-600 font-medium text-sm">
              <span>Voir les offres</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          💡 Livraison gratuite et installation incluse dans toutes ces communes
        </p>
      </div>
    </div>
  );
}
