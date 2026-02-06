import { useState, useRef, useEffect } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Star, Shield, Truck, Clock, ArrowRight, CheckCircle, Search } from 'lucide-react';
import SEOHead from './SEOHead';
import { useStructures } from '../contexts/StructuresContext';
import DepartmentCitiesGrid from './DepartmentCitiesGrid';
import FloatingCTA from './FloatingCTA';
import type { DepartmentData, CityData } from '../types';

export default function LocalSEOPage() {
  const { department, cities } = useLoaderData() as { department: DepartmentData; cities: CityData[] };
  const { structures } = useStructures();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableStructures = structures.filter(s => s.available).slice(0, 6);

  // Filtrer les villes en temps réel (nom OU code postal)
  const filteredCities = cities.filter(city => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      city.name.toLowerCase().includes(query) ||
      city.postalCode.includes(query)
    );
  });

  // Suggestions pour le dropdown (max 8)
  const suggestions = searchQuery.trim().length >= 2
    ? filteredCities.slice(0, 8)
    : [];

  const pageTitle = `Location Structures Gonflables ${department.name} (${department.code}) | Fun Event`;
  const pageDescription = `Location de structures gonflables premium en ${department.fullName}. Châteaux gonflables, toboggans, jeux pour anniversaires et événements. Livraison gratuite et installation incluse.`;

  return (
    <section className="py-16 bg-gray-50">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`location structures gonflables ${department.name}, château gonflable ${department.code}, toboggan gonflable ${department.name}, location jeux gonflables ${department.fullName}, anniversaire enfant ${department.name}`}
        ogTitle={`Location Structures Gonflables ${department.name} - Fun Event`}
        ogDescription={pageDescription}
        canonicalUrl={`https://funevent.fr/location/${department.slug}`}
        pageType="catalog"
        breadcrumbs={[
          { name: "Accueil", url: "https://funevent.fr/" },
          { name: `Location ${department.name}`, url: `https://funevent.fr/location/${department.slug}` }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Fun Event - Location Structures Gonflables ${department.name}`,
          "description": pageDescription,
          "url": `https://funevent.fr/location/${department.slug}`,
          "telephone": "+33663528072",
          "email": "contact@funevent.fr",
          "priceRange": "EUR",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": department.name,
            "postalCode": department.code,
            "addressCountry": "FR"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": department.fullName
          },
          "serviceType": "Location de structures gonflables",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5"
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            {department.fullName}
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Location Structures Gonflables
            </span>
            <br />
            <span className="bg-gradient-to-r text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
              {department.name} ({department.code})
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto mb-10">
            {department.description}
          </p>

          {/* Search Bar with Autocomplete */}
          <div className="max-w-3xl mx-auto" ref={searchRef}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-2">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(e.target.value.trim().length >= 2);
                    }}
                    onFocus={() => {
                      if (searchQuery.trim().length >= 2) setShowDropdown(true);
                    }}
                    placeholder="Rechercher une ville ou un code postal..."
                    className="w-full pl-16 pr-32 py-5 text-lg font-medium rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-colors"
                    >
                      Effacer
                    </button>
                  ) : (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl font-medium text-sm">
                      {cities.length} villes
                    </div>
                  )}
                </div>

                {/* Dropdown Autocomplete */}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-2 text-xs text-gray-500 font-medium px-4 pt-3">
                      {filteredCities.length} ville{filteredCities.length > 1 ? 's' : ''} trouvée{filteredCities.length > 1 ? 's' : ''}
                    </div>
                    {suggestions.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchQuery('');
                          navigate(`/ville/${city.slug}`);
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{city.name}</p>
                          <p className="text-sm text-gray-500">{city.postalCode} - {city.population}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </button>
                    ))}
                    {filteredCities.length > 8 && (
                      <div className="px-4 py-3 bg-gray-50 text-center text-sm text-gray-600 border-t border-gray-100">
                        +{filteredCities.length - 8} autres villes
                      </div>
                    )}
                  </div>
                )}

                {/* No results */}
                {showDropdown && searchQuery.trim().length >= 2 && suggestions.length === 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 text-center z-50">
                    <p className="text-gray-500">Aucune ville trouvée pour "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {department.benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="font-medium text-gray-800">{benefit}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Sécurisé</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Gratuit</h3>
              <p className="text-gray-600">Livraison {department.name}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">7j/7</h3>
              <p className="text-gray-600">Disponibilité</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Note clients</p>
            </div>
          </div>
        </div>

        {/* Structures Preview */}
        {availableStructures.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Nos Structures Disponibles en <span className="text-orange-500">{department.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableStructures.map((structure) => (
                <div key={structure.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative">
                    <img
                      src={structure.image}
                      alt={`${structure.name} - Location ${department.name}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {structure.customPricing ? 'Sur devis' : `${structure.price}€`}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{structure.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{structure.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      Livraison {department.name} incluse
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/catalogue"
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center"
              >
                Voir tout le catalogue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        )}

        {/* Cities Grid - NOUVEAU COMPOSANT DE MAILLAGE */}
        <DepartmentCitiesGrid
          cities={filteredCities}
          departmentName={department.name}
          departmentCode={department.code}
        />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt pour votre événement en {department.name} ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtenez votre devis gratuit en moins de 48h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/devis"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Demander un devis gratuit
            </Link>
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
            <a
              href="tel:0663528072"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              06 63 52 80 72
            </a>
          </div>
        </div>
      </div>

      {/* Floating CTA Button */}
      <FloatingCTA />
    </section>
  );
}
