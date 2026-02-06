import React from 'react';
import { Cake, Heart, Building2, GraduationCap, Users, TreePine, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface ServicesSectionProps {
  onNavigate: (page: Page) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const services = [
    {
      icon: Cake,
      title: 'Anniversaire Enfant',
      description: 'Faites de l\'anniversaire de votre enfant un moment magique avec nos châteaux et toboggans.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      features: ['Structures adaptées 3-12 ans', 'Thèmes variés', 'Installation incluse'],
      link: 'evenement-anniversaire' as Page,
      color: 'pink'
    },
    {
      icon: Heart,
      title: 'Mariage & Réception',
      description: 'Surprenez vos invités avec des animations originales pour petits et grands.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      features: ['Animations élégantes', 'Coin enfants dédié', 'Service discret'],
      link: 'evenement-mariage' as Page,
      color: 'rose'
    },
    {
      icon: Building2,
      title: 'Événement Entreprise',
      description: 'Team building, séminaire ou fête d\'entreprise : boostez la cohésion d\'équipe.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      features: ['Parcours d\'obstacles', 'Défis d\'équipe', 'Formules sur-mesure'],
      link: 'evenement-entreprise' as Page,
      color: 'blue'
    },
    {
      icon: GraduationCap,
      title: 'Kermesse & École',
      description: 'Animations parfaites pour les fêtes d\'école et kermesses associatives.',
      image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&h=300&fit=crop',
      features: ['Prix groupes', 'Multi-structures', 'Sécurité renforcée'],
      link: 'evenement-kermesse' as Page,
      color: 'green'
    },
    {
      icon: Users,
      title: 'Fête de Quartier',
      description: 'Rassemblez les habitants autour d\'animations festives et conviviales.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
      features: ['Grandes capacités', 'Tout public', 'Tarifs associatifs'],
      link: 'evenement-fete-quartier' as Page,
      color: 'orange'
    },
    {
      icon: TreePine,
      title: 'Baptême & Communion',
      description: 'Célébrez ces moments importants avec des animations adaptées à tous les âges.',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
      features: ['Ambiance familiale', 'Structures douces', 'Service personnalisé'],
      link: 'evenement-bapteme' as Page,
      color: 'purple'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(229,231,235)_1px,transparent_0)] bg-[size:40px_40px] opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-4">
            Pour chaque occasion
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Une structure pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">chaque événement</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quel que soit votre projet, nous avons la solution parfaite pour le rendre inoubliable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} - Location structures gonflables Fun Event Île-de-France`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute top-4 left-4 w-12 h-12 bg-${service.color}-500 rounded-xl flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 bg-${service.color}-500 rounded-full`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => onNavigate(service.link)}
                  className={`w-full py-3 px-4 bg-${service.color}-50 text-${service.color}-700 font-semibold rounded-xl hover:bg-${service.color}-100 transition-colors flex items-center justify-center gap-2 group/btn`}
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Vous avez un projet particulier ?</p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Parlons de votre événement
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
