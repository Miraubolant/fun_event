import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Shield, Award, Calendar } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  eventType: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nadia Bensaid",
    location: "Aubervilliers (93)",
    rating: 5,
    text: "Service impeccable ! Le château gonflable a fait le bonheur de tous les enfants. Installation rapide et équipe très professionnelle. Je recommande vivement Fun Event pour vos événements.",
    eventType: "Anniversaire enfant",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Karim Hamidi",
    location: "Vitry-sur-Seine (94)",
    rating: 5,
    text: "Nous avons loué un toboggan géant pour la fête de notre entreprise. Le succès était au rendez-vous ! Très bon rapport qualité-prix et livraison ponctuelle.",
    eventType: "Événement entreprise",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Fatima Khelifi",
    location: "Sarcelles (95)",
    rating: 5,
    text: "Deuxième fois que nous faisons appel à Fun Event et toujours aussi satisfaits. Les structures sont propres, sécurisées et les enfants adorent. Merci !",
    eventType: "Fête de quartier",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "Rachid Bouaziz",
    location: "Cergy (95)",
    rating: 5,
    text: "Organisation parfaite pour le mariage de ma fille. Le parcours d'obstacles a occupé les enfants pendant des heures. Personnel très sympathique et à l'écoute.",
    eventType: "Mariage",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 5,
    name: "Samira Diallo",
    location: "Bondy (93)",
    rating: 5,
    text: "Super expérience ! La structure aquatique était géniale pour l'été. Les enfants se sont amusés comme des fous. Je recommande à 100%.",
    eventType: "Fête estivale",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg"
  },
  {
    id: 6,
    name: "Mehdi Lahlou",
    location: "Aulnay-sous-Bois (93)",
    rating: 5,
    text: "Troisième anniversaire organisé avec Fun Event. Toujours au top ! Les structures sont variées et adaptées à tous les âges. Service client réactif.",
    eventType: "Anniversaire",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + itemsPerView >= testimonials.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - itemsPerView : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section
      className="py-16 bg-gray-50"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Avis</span>
            <span className="text-orange-500"> Clients</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plus de 500 événements réussis en Île-de-France. Découvrez les avis de nos clients satisfaits.
          </p>

          {/* Global Rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-500">basé sur 127 avis</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-500 mt-1">Événements réalisés</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">98%</p>
            <p className="text-sm text-gray-500 mt-1">Clients satisfaits</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">4.9/5</p>
            <p className="text-sm text-gray-500 mt-1">Note moyenne</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">127</p>
            <p className="text-sm text-gray-500 mt-1">Avis vérifiés</p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
            aria-label="Avis precedent"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-3"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-blue-100 mb-4" />

                    {/* Rating */}
                    <div className="flex mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      {renderStars(testimonial.rating)}
                      <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                    </div>

                    {/* Text */}
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed" itemProp="reviewBody">
                      "{testimonial.text}"
                    </p>

                    {/* Event Type Badge */}
                    <span className="inline-block self-start px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full mb-4">
                      {testimonial.eventType}
                    </span>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div itemProp="author" itemScope itemType="https://schema.org/Person">
                        <p className="font-semibold text-gray-900" itemProp="name">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation - Mobile */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Aller a l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>

              </div>
    </section>
  );
};

export default Testimonials;
