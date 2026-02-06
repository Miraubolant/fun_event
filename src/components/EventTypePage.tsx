import React from 'react';
import { CheckCircle, Star, ArrowRight, Phone, MessageCircle, Users, Calendar, MapPin } from 'lucide-react';
import SEOHead from './SEOHead';
import { useStructures } from '../contexts/StructuresContext';
import { Page, EventType } from '../types';

interface EventTypePageProps {
  eventType: string;
  onNavigate: (page: Page) => void;
}

const eventTypesData: Record<string, EventType> = {
  'anniversaire': {
    id: 'anniversaire',
    name: 'Anniversaire Enfant',
    icon: '🎂',
    description: 'Créez un anniversaire magique et inoubliable pour votre enfant avec nos structures gonflables premium. Châteaux, toboggans, parcours d\'obstacles... Tout pour faire de ce jour un moment exceptionnel en Île-de-France.',
    benefits: [
      'Des structures adaptées à tous les âges (3-12 ans)',
      'Installation et désinstallation incluses',
      'Livraison gratuite en Île-de-France',
      'Conseils personnalisés pour votre événement',
      'Structures sécurisées aux normes NF EN 14960',
      'Animation garantie pendant des heures'
    ],
    idealStructures: ['Château gonflable', 'Toboggan', 'Parcours d\'obstacles', 'Combo château-toboggan'],
    tips: [
      'Prévoyez 3-4 heures pour profiter pleinement',
      'Comptez une structure pour 10-15 enfants',
      'Choisissez un thème qui plaira à votre enfant',
      'Préparez un espace plat de 6x6m minimum'
    ]
  },
  'mariage': {
    id: 'mariage',
    name: 'Animation Mariage',
    icon: '💒',
    description: 'Surprenez vos invités avec des animations gonflables originales lors de votre mariage. Occupez les enfants pendant que les adultes profitent, ou créez des moments de rire mémorables avec des jeux pour tous.',
    benefits: [
      'Espace enfants supervisé pour les parents sereins',
      'Structures élégantes adaptées à votre décoration',
      'Installation discrète et professionnelle',
      'Jeux adultes disponibles (sumo, parcours)',
      'Service premium avec livraison et installation',
      'Photos mémorables garanties'
    ],
    idealStructures: ['Château gonflable blanc/pastel', 'Parcours d\'obstacles', 'Sumo gonflable', 'Toboggan géant'],
    tips: [
      'Prévoyez un coin dédié aux enfants',
      'Informez votre wedding planner de la logistique',
      'Réservez plusieurs mois à l\'avance pour les dates prisées',
      'Pensez à un adulte superviseur'
    ]
  },
  'entreprise': {
    id: 'entreprise',
    name: 'Événement Entreprise',
    icon: '🏢',
    description: 'Team building, séminaire, fête annuelle ou family day ? Les structures gonflables renforcent la cohésion d\'équipe et créent des moments de convivialité inoubliables pour vos collaborateurs.',
    benefits: [
      'Renforcement de la cohésion d\'équipe',
      'Animation originale et mémorable',
      'Adaptable à tous les espaces professionnels',
      'Organisation de challenges inter-services',
      'Family day : fidélisez vos employés',
      'Devis personnalisé pour les entreprises'
    ],
    idealStructures: ['Parcours d\'obstacles chronométré', 'Sumo gonflable', 'Toboggan géant', 'Jeux gonflables d\'équipe'],
    tips: [
      'Organisez des défis entre équipes',
      'Prévoyez photos et vidéos souvenir',
      'Vérifiez l\'espace et l\'accès électrique',
      'Communiquez en amont auprès des équipes'
    ]
  },
  'kermesse': {
    id: 'kermesse',
    name: 'Kermesse & École',
    icon: '🎪',
    description: 'Faites de votre kermesse un événement exceptionnel avec nos structures gonflables. Idéal pour les écoles, associations et comités de fête. Attraction garantie pour petits et grands.',
    benefits: [
      'Tarifs adaptés aux associations et écoles',
      'Plusieurs structures pour grands événements',
      'Installation rapide et professionnelle',
      'Sécurité maximale pour les enfants',
      'Assurance incluse',
      'Succès garanti auprès des familles'
    ],
    idealStructures: ['Château gonflable', 'Toboggan', 'Parcours d\'obstacles', 'Jeux multiples'],
    tips: [
      'Réservez tôt : les kermesses sont souvent le même week-end',
      'Prévoyez plusieurs attractions pour varier',
      'Désignez des bénévoles pour la surveillance',
      'Communiquez sur les attractions en amont'
    ]
  },
  'bapteme': {
    id: 'bapteme',
    name: 'Baptême & Communion',
    icon: '⛪',
    description: 'Célébrez ce moment important avec une réception festive. Les structures gonflables occupent joyeusement les enfants pendant que la famille profite de ce jour spécial.',
    benefits: [
      'Ambiance festive et familiale',
      'Structures adaptées aux plus petits',
      'Les parents profitent de la fête sereinement',
      'Photos de groupe mémorables',
      'Installation dans jardins et salles',
      'Service clé en main'
    ],
    idealStructures: ['Petit château gonflable', 'Aire de jeux gonflable', 'Toboggan enfant'],
    tips: [
      'Choisissez une structure aux couleurs douces',
      'Prévoyez un espace ombragé si extérieur',
      'Idéal après la cérémonie pour le vin d\'honneur'
    ]
  },
  'fete-quartier': {
    id: 'fete-quartier',
    name: 'Fête de Quartier',
    icon: '🏘️',
    description: 'Animez votre fête de quartier, vide-grenier ou événement de lotissement avec des structures gonflables. Rassemblez les voisins autour d\'animations conviviales pour tous les âges.',
    benefits: [
      'Rassemble toutes les générations',
      'Prix avantageux pour les copropriétés',
      'Plusieurs structures disponibles',
      'Crée du lien entre voisins',
      'Animation toute la journée',
      'Installation sur parking ou terrain'
    ],
    idealStructures: ['Château gonflable familial', 'Toboggan géant', 'Parcours d\'obstacles', 'Jeux multiples'],
    tips: [
      'Vérifiez les autorisations avec la mairie',
      'Organisez un planning avec les voisins',
      'Prévoyez assez de structures pour le nombre attendu',
      'Pensez à l\'alimentation électrique'
    ]
  }
};

const EventTypePage: React.FC<EventTypePageProps> = ({ eventType, onNavigate }) => {
  const eventData = eventTypesData[eventType];
  const { structures } = useStructures();

  const availableStructures = structures.filter(s => s.available).slice(0, 6);

  if (!eventData) {
    return null;
  }

  const pageTitle = `${eventData.name} - Location Structures Gonflables | Fun Event`;
  const pageDescription = eventData.description;

  return (
    <section className="py-16 bg-gray-50">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`${eventData.name.toLowerCase()}, structures gonflables ${eventData.name.toLowerCase()}, animation ${eventData.name.toLowerCase()}, location gonflable ${eventData.name.toLowerCase()}, Fun Event`}
        ogTitle={`${eventData.name} - Structures Gonflables Fun Event`}
        ogDescription={pageDescription}
        canonicalUrl={`https://funevent.fr/evenement-${eventData.id}`}
        breadcrumbs={[
          { name: "Accueil", url: "https://funevent.fr/" },
          { name: eventData.name, url: `https://funevent.fr/evenement-${eventData.id}` }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Location Structures Gonflables pour ${eventData.name}`,
          "description": pageDescription,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Fun Event",
            "telephone": "+33663528072"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Île-de-France"
          },
          "serviceType": `Animation ${eventData.name}`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-6xl mb-6 block">{eventData.icon}</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Structures Gonflables pour
            </span>
            <br />
            <span className="text-orange-500">{eventData.name}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {eventData.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Pourquoi choisir Fun Event pour votre <span className="text-blue-600">{eventData.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal Structures */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Structures recommandées pour un <span className="text-orange-500">{eventData.name}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventData.idealStructures.map((structure, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <p className="font-medium text-gray-800">{structure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Structures Preview */}
        {availableStructures.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              Nos Structures Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableStructures.map((structure) => (
                <div
                  key={structure.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="relative">
                    <img
                      src={structure.image}
                      alt={structure.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {structure.customPricing ? 'Sur devis' : `${structure.price}EUR`}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{structure.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{structure.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => onNavigate('catalogue')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center"
              >
                Voir tout le catalogue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Nos conseils pour un {eventData.name} réussi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventData.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt pour votre {eventData.name} ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtenez votre devis gratuit et personnalisé en moins de 48h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('devis')}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Demander un devis gratuit
            </button>
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventTypePage;
