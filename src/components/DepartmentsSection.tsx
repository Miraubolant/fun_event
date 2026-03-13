import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Sparkles } from 'lucide-react';
import IleDeFranceMap from './IleDeFranceMap';

const departments = [
  {
    code: '75',
    name: 'Paris',
    slug: 'paris',
    fullName: 'Paris',
    cities: 1,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    hex: '#3b82f6',
  },
  {
    code: '77',
    name: 'Seine-et-Marne',
    slug: 'seine-et-marne',
    fullName: 'Seine-et-Marne',
    cities: 229,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
    hex: '#f97316',
  },
  {
    code: '78',
    name: 'Yvelines',
    slug: 'yvelines',
    fullName: 'Yvelines',
    cities: 143,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
    hex: '#22c55e',
  },
  {
    code: '91',
    name: 'Essonne',
    slug: 'essonne',
    fullName: 'Essonne',
    cities: 131,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    hex: '#a855f7',
  },
  {
    code: '92',
    name: 'Hauts-de-Seine',
    slug: 'hauts-de-seine',
    fullName: 'Hauts-de-Seine',
    cities: 36,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'from-pink-50 to-pink-100',
    hex: '#ec4899',
  },
  {
    code: '93',
    name: 'Seine-Saint-Denis',
    slug: 'seine-saint-denis',
    fullName: 'Seine-Saint-Denis',
    cities: 40,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100',
    hex: '#6366f1',
  },
  {
    code: '94',
    name: 'Val-de-Marne',
    slug: 'val-de-marne',
    fullName: 'Val-de-Marne',
    cities: 47,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'from-teal-50 to-teal-100',
    hex: '#14b8a6',
  },
  {
    code: '95',
    name: "Val-d'Oise",
    slug: 'val-d-oise',
    fullName: "Val-d'Oise",
    cities: 99,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'from-cyan-50 to-cyan-100',
    hex: '#06b6d4',
  },
];

export default function DepartmentsSection() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

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
              Livraison et installation en
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              Île-de-France et régions voisines
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos services de location de structures gonflables dans les 8 départements
            d'Île-de-France. Plus de 683 villes desservies !
          </p>
        </div>

        {/* Map + List Layout (Desktop) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start mb-12">

          {/* Carte interactive */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative">
            <div className="absolute top-4 left-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Carte interactive</span>
            </div>
            <IleDeFranceMap
              onHover={(dept) => setHoveredDept(dept?.id || null)}
              activeDept={hoveredDept}
            />
            <p className="text-center text-sm text-gray-400 mt-4">Cliquez sur un département pour voir les villes</p>
          </div>

          {/* Liste des départements */}
          <div className="space-y-3">
            {departments.map((dept) => (
              <Link
                key={dept.code}
                to={`/location/${dept.slug}`}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                  hoveredDept === dept.code
                    ? 'bg-white shadow-lg border-gray-200 scale-[1.02]'
                    : 'bg-white/60 border-gray-100 hover:bg-white hover:shadow-md hover:border-gray-200'
                }`}
                onMouseEnter={() => setHoveredDept(dept.code)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                {/* Color indicator */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 ${
                    hoveredDept === dept.code ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  style={{ backgroundColor: dept.hex }}
                >
                  <span className="text-white font-bold text-sm">{dept.code}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 group-hover:text-gray-800">
                    {dept.fullName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dept.cities} ville{dept.cities > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  hoveredDept === dept.code
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredDept === dept.code ? 'translate-x-0.5' : ''
                  }`} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Grid (inchangé) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Carte en haut sur mobile */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-2">
            <IleDeFranceMap />
            <p className="text-center text-sm text-gray-400 mt-3">Cliquez sur un département pour voir les villes</p>
          </div>

          {departments.map((dept) => (
            <Link
              key={dept.code}
              to={`/location/${dept.slug}`}
              className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                style={{ backgroundColor: dept.hex }}
              >
                <span className="text-white font-bold text-sm">{dept.code}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm">{dept.fullName}</h3>
                <span className="text-xs text-gray-500">{dept.cities} ville{dept.cities > 1 ? 's' : ''}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
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
                <p className="font-bold text-gray-900">Livraison & Installation</p>
                <p className="text-sm text-gray-600">Île-de-France et régions voisines</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Devis en 24h</p>
                <p className="text-sm text-gray-600">Réponse rapide garantie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
