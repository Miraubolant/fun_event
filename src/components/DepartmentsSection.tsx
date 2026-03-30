import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Truck, Zap } from 'lucide-react';
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

const totalCities = departments.reduce((sum, d) => sum + d.cities, 0);

export default function DepartmentsSection() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const hoveredData = departments.find(d => d.code === hoveredDept);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      {/* Decorative orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100/60 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <MapPin className="w-4 h-4" />
            <span>8 departements couverts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <span className="text-gray-900">
              Livraison et installation en
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
              Ile-de-France
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Plus de <span className="font-bold text-gray-900">{totalCities} villes</span> desservies
            dans toute la region parisienne et au-dela.
          </p>
        </div>

        {/* Desktop: Map + List */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start mb-16">

          {/* Map Card */}
          <div className="col-span-5 sticky top-8">
            <div className="relative group">
              {/* Card glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 via-transparent to-orange-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100/80">
                {/* Top accent line */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-t-3xl" />

                <div className="p-6 pb-4">
                  {/* Map header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Carte interactive</span>
                    </div>
                  </div>

                  <IleDeFranceMap
                    onHover={(dept) => setHoveredDept(dept?.id || null)}
                    activeDept={hoveredDept}
                  />
                </div>

                {/* Bottom stats bar */}
                <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {hoveredData ? (
                        <>
                          <div
                            className="w-6 h-6 rounded-md shadow-sm transition-colors duration-300"
                            style={{ backgroundColor: hoveredData.hex }}
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{hoveredData.fullName}</p>
                            <p className="text-xs text-gray-500">{hoveredData.cities} ville{hoveredData.cities > 1 ? 's' : ''}</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-400">Survolez un departement</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent leading-none">
                        {totalCities}+
                      </p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">villes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department List */}
          <div className="col-span-7 space-y-2.5">
            {departments.map((dept, index) => {
              const isHovered = hoveredDept === dept.code;
              return (
                <Link
                  key={dept.code}
                  to={`/location/${dept.slug}`}
                  className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    isHovered
                      ? 'bg-white shadow-xl border-gray-200 scale-[1.01]'
                      : 'bg-white/70 border-gray-100/80 hover:bg-white hover:shadow-lg hover:border-gray-200'
                  }`}
                  onMouseEnter={() => setHoveredDept(dept.code)}
                  onMouseLeave={() => setHoveredDept(null)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Left color accent */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? dept.hex : 'transparent',
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Department badge */}
                  <div
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 overflow-hidden ${
                      isHovered ? 'scale-110 shadow-md' : 'group-hover:scale-105'
                    }`}
                    style={{ backgroundColor: dept.hex }}
                  >
                    {/* Shine effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/25 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                    <span className="relative text-white font-extrabold text-sm tracking-wide">{dept.code}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold transition-colors duration-300 ${isHovered ? 'text-gray-900' : 'text-gray-800'}`}>
                      {dept.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{dept.cities} ville{dept.cities > 1 ? 's' : ''} desservie{dept.cities > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'text-white shadow-lg'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                  }`}
                    style={isHovered ? { backgroundColor: dept.hex } : undefined}
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      isHovered ? 'translate-x-0.5' : ''
                    }`} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="lg:hidden mb-16">
          {/* Map card mobile — pas de overflow-hidden global pour ne pas couper la carte */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 mb-6">
            {/* Accent ligne en haut avec son propre overflow-hidden */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-t-3xl" />
            <div className="px-2 pt-4 pb-2">
              <div className="flex items-center gap-2 mb-3 px-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Carte interactive — Appuyez pour naviguer</span>
              </div>
              {/* Carte pleine largeur, sans padding latéral */}
              <div className="w-full" style={{ minHeight: '300px' }}>
                <IleDeFranceMap />
              </div>
            </div>
            <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3 flex items-center justify-between rounded-b-3xl">
              <p className="text-sm text-gray-400">Appuyez sur un département</p>
              <p className="text-lg font-black bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                {totalCities}+ villes
              </p>
            </div>
          </div>

          {/* Mobile department grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {departments.map((dept) => (
              <Link
                key={dept.code}
                to={`/location/${dept.slug}`}
                className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Color accent left */}
                <div
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: dept.hex }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: dept.hex }}
                >
                  <span className="text-white font-extrabold text-sm">{dept.code}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">{dept.fullName}</h3>
                  <span className="text-xs text-gray-500">{dept.cities} ville{dept.cities > 1 ? 's' : ''}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Livraison & Installation</p>
              <p className="text-sm text-gray-500">Ile-de-France et regions voisines</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

          <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Devis en 24h</p>
              <p className="text-sm text-gray-500">Reponse rapide garantie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
