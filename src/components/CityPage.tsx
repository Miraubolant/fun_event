import { useLoaderData, Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ArrowRight, CheckCircle, Users } from 'lucide-react';
import SEOHead from './SEOHead';
import { useStructures } from '../contexts/StructuresContext';
import NearestCities from './NearestCities';
import FloatingCTA from './FloatingCTA';
import QuickQuoteForm from './QuickQuoteForm';
import type { CityData } from '../types';

export default function CityPage() {
  const { city } = useLoaderData() as { city: CityData };
  const { structures } = useStructures();

  const availableStructures = structures.filter(s => s.available).slice(0, 6);

  const pageTitle = `Location Structures Gonflables ${city.name} (${city.postalCode}) | Fun Event`;
  const pageDescription = city.description;

  return (
    <section className="py-16 bg-gray-50">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`location structures gonflables ${city.name}, château gonflable ${city.name}, toboggan gonflable ${city.name}, animation enfant ${city.name}, location jeux ${city.postalCode}`}
        ogTitle={`Location Structures Gonflables ${city.name} - Fun Event`}
        ogDescription={pageDescription}
        canonicalUrl={`https://funevent.fr/ville/${city.slug}`}
        breadcrumbs={[
          { name: "Accueil", url: "https://funevent.fr/" },
          { name: city.department, url: `https://funevent.fr/location/${city.departmentCode}` },
          { name: city.name, url: `https://funevent.fr/ville/${city.slug}` }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Fun Event - Location Structures Gonflables ${city.name}`,
          "description": pageDescription,
          "url": `https://funevent.fr/ville/${city.slug}`,
          "telephone": "+33663528072",
          "email": "contact@funevent.fr",
          "priceRange": "EUR",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "addressRegion": city.department,
            "postalCode": city.postalCode,
            "addressCountry": "FR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": parseFloat(city.latitude),
            "longitude": parseFloat(city.longitude)
          },
          "areaServed": {
            "@type": "City",
            "name": city.name
          },
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
            {city.name} - {city.department} ({city.departmentCode})
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Location Château Gonflable
            </span>
            <br />
            <span className="text-orange-500">{city.name}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {city.description}
          </p>
          <p className="text-gray-500 mt-4">
            <Users className="w-5 h-5 inline mr-2" />
            {city.population}
          </p>
        </div>

        {/* Quick Quote Form - Priorité Conversion */}
        <div className="mb-16">
          <QuickQuoteForm cityName={city.name} postalCode={city.postalCode} />
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Nos services à <span className="text-blue-600">{city.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Anniversaires enfants', desc: `Châteaux et toboggans gonflables livrés à ${city.name} pour des anniversaires inoubliables`, icon: '🎂' },
              { title: 'Mariages & réceptions', desc: `Animations gonflables élégantes pour vos événements à ${city.name}`, icon: '💒' },
              { title: 'Fêtes d\'entreprise', desc: `Team building et événements corporate dans le ${city.departmentCode}`, icon: '🏢' },
              { title: 'Kermesses & écoles', desc: `Structures gonflables pour les écoles et associations de ${city.name}`, icon: '🎪' },
              { title: 'Fêtes de quartier', desc: `Animations pour vos événements de voisinage à ${city.name}`, icon: '🏘️' },
              { title: 'Baptêmes & communions', desc: `Structures adaptées aux cérémonies familiales`, icon: '⛪' }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Structures Preview */}
        {availableStructures.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              Structures disponibles pour <span className="text-orange-500">{city.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableStructures.map((structure) => (
                <div key={structure.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative">
                    <img
                      src={structure.image}
                      alt={`${structure.name} - Location ${city.name}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {structure.customPricing ? 'Sur devis' : `${structure.price}€`}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{structure.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{structure.description}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Livraison gratuite à {city.name}
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

        {/* Nearest Cities - NOUVEAU COMPOSANT DE MAILLAGE */}
        <NearestCities cities={city.nearestCities} currentCityName={city.name} />

        {/* Neighborhoods */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quartiers desservis à {city.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {city.neighborhoods.map((neighborhood, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {neighborhood}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            Et tous les autres quartiers de {city.name}...
          </p>
        </div>

        {/* Contact rapide */}
        <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 text-center border-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Besoin d'aide ? Contactez-nous directement
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
            <a
              href="tel:0663528072"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
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
