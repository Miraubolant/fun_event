import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  eventType: string;
  avatar: string;
  structure?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nadia Bensaid",
    location: "Aubervilliers (93)",
    rating: 5,
    text: "Service impeccable ! Le château gonflable a fait le bonheur de tous les enfants. Installation rapide et équipe très professionnelle. Je recommande vivement Fun Event pour vos événements.",
    eventType: "Anniversaire enfant",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    structure: "Château Enchanté"
  },
  {
    id: 2,
    name: "Karim Hamidi",
    location: "Vitry-sur-Seine (94)",
    rating: 5,
    text: "Nous avons loué un toboggan géant pour la fête de notre entreprise. Le succès était au rendez-vous ! Très bon rapport qualité-prix et livraison ponctuelle.",
    eventType: "Événement entreprise",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    structure: "Toboggan Géant"
  },
  {
    id: 3,
    name: "Fatima Khelifi",
    location: "Sarcelles (95)",
    rating: 5,
    text: "Deuxième fois que nous faisons appel à Fun Event et toujours aussi satisfaits. Les structures sont propres, sécurisées et les enfants adorent. Merci !",
    eventType: "Fête de quartier",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    structure: "Parcours d'obstacles"
  },
  {
    id: 4,
    name: "Rachid Bouaziz",
    location: "Cergy (95)",
    rating: 5,
    text: "Organisation parfaite pour le mariage de ma fille. Le parcours d'obstacles a occupé les enfants pendant des heures. Personnel très sympathique et à l'écoute.",
    eventType: "Mariage",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    structure: "Combo Mariage"
  },
  {
    id: 5,
    name: "Samira Diallo",
    location: "Bondy (93)",
    rating: 5,
    text: "Super expérience ! La structure aquatique était géniale pour l'été. Les enfants se sont amusés comme des fous. Je recommande à 100%.",
    eventType: "Fête estivale",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    structure: "Aqua Splash"
  },
  {
    id: 6,
    name: "Mehdi Lahlou",
    location: "Aulnay-sous-Bois (93)",
    rating: 5,
    text: "Troisième anniversaire organisé avec Fun Event. Toujours au top ! Les structures sont variées et adaptées à tous les âges. Service client réactif.",
    eventType: "Anniversaire",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    structure: "Multi-activités"
  }
];

const TestimonialsModern: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full mb-4">
            Avis vérifiés
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">clients</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-2xl font-bold text-gray-900">4.9/5</span>
            <span className="text-gray-500">basé sur 127 avis</span>
          </div>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-6">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-6">
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-6">{renderStars(testimonials[activeIndex].rating)}</div>

              {/* Text */}
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                "{testimonials[activeIndex].text}"
              </p>

              {/* Event type badge */}
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-6">
                {testimonials[activeIndex].eventType}
              </span>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-500">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-blue-500 to-orange-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Mini cards preview */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl'
                  : 'bg-white border border-gray-100 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className={`font-semibold ${index === activeIndex ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-sm ${index === activeIndex ? 'text-blue-100' : 'text-gray-500'}`}>
                    {testimonial.eventType}
                  </p>
                </div>
              </div>
              <p className={`text-sm line-clamp-2 ${index === activeIndex ? 'text-blue-100' : 'text-gray-600'}`}>
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsModern;
