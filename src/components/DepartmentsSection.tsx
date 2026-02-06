import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Sparkles } from 'lucide-react';

const departments = [
  {
    code: '75',
    name: 'Paris',
    slug: 'paris',
    fullName: 'Paris',
    cities: 1,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100'
  },
  {
    code: '77',
    name: 'Seine-et-Marne',
    slug: 'seine-et-marne',
    fullName: 'Seine-et-Marne',
    cities: 229,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100'
  },
  {
    code: '78',
    name: 'Yvelines',
    slug: 'yvelines',
    fullName: 'Yvelines',
    cities: 143,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100'
  },
  {
    code: '91',
    name: 'Essonne',
    slug: 'essonne',
    fullName: 'Essonne',
    cities: 131,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100'
  },
  {
    code: '92',
    name: 'Hauts-de-Seine',
    slug: 'hauts-de-seine',
    fullName: 'Hauts-de-Seine',
    cities: 36,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'from-pink-50 to-pink-100'
  },
  {
    code: '93',
    name: 'Seine-Saint-Denis',
    slug: 'seine-saint-denis',
    fullName: 'Seine-Saint-Denis',
    cities: 40,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100'
  },
  {
    code: '94',
    name: 'Val-de-Marne',
    slug: 'val-de-marne',
    fullName: 'Val-de-Marne',
    cities: 47,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'from-teal-50 to-teal-100'
  },
  {
    code: '95',
    name: "Val-d'Oise",
    slug: 'val-d-oise',
    fullName: "Val-d'Oise",
    cities: 99,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'from-cyan-50 to-cyan-100'
  }
];

export default function DepartmentsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Nos zones d'intervention
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Livraison gratuite dans toute
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              l'Île-de-France
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos services de location de structures gonflables dans les 8 départements
            d'Île-de-France. Plus de 683 villes desservies !
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {departments.map((dept) => (
            <Link
              key={dept.code}
              to={`/location/${dept.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${dept.bgColor} opacity-90 group-hover:opacity-100 transition-opacity`} />

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col">

                {/* Icon Badge */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <MapPin className="w-7 h-7 text-white" />
                </div>

                {/* Department Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold bg-gradient-to-r ${dept.color} bg-clip-text text-transparent`}>
                      {dept.code}
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                    {dept.fullName}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dept.color}`} />
                    <span className="font-medium">{dept.cities} ville{dept.cities > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Voir les villes</span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${dept.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Livraison & Installation Gratuites</p>
                <p className="text-sm text-gray-600">Dans toute l'Île-de-France</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Devis en 48h</p>
                <p className="text-sm text-gray-600">Réponse rapide garantie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
