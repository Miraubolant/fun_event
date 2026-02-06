import { Link } from 'react-router-dom';
import { Home, MapPin, Search } from 'lucide-react';
import { citySlugs, citiesData } from '../data/generated/cities-data';

export default function NotFound() {
  // Suggestions de villes populaires (top 12 par population)
  const popularCities = citySlugs
    .map(slug => citiesData[slug])
    .sort((a, b) => {
      const popA = parseInt(a.population.replace(/[^\d]/g, ''));
      const popB = parseInt(b.population.replace(/[^\d]/g, ''));
      return popB - popA;
    })
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page non trouvée</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
          <Link
            to="/catalogue"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-full font-bold hover:border-blue-500 hover:text-blue-500 transition-all"
          >
            <Search className="w-5 h-5 mr-2" />
            Voir le catalogue
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-8">Ou découvrez nos services dans ces villes :</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularCities.map(city => (
            <Link
              key={city.slug}
              to={`/ville/${city.slug}`}
              className="p-4 bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">{city.name}</p>
              <p className="text-sm text-gray-500">{city.departmentCode}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
