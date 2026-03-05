import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Doul Berete",
    rating: 5,
    text: "On a travaillé cet été avec cette entreprise et l'expérience fut incroyable grâce au professionnalisme de l'équipe de Merwane. Une équipe ponctuelle, flexible et en plus ils sont très abordable par rapport aux prix du marché. À faire !",
    date: "Juillet 2025",
    avatar: "https://ui-avatars.com/api/?name=Doul+Berete&background=3B82F6&color=fff&size=100"
  },
  {
    id: 2,
    name: "Deborah Dabezies",
    rating: 5,
    text: "Expérience positive du début à la fin de la prestation. Professionnels, réactif etc.. Une journée où les enfants sont heureux ! N'hésitez pas !",
    date: "Octobre 2025",
    avatar: "https://ui-avatars.com/api/?name=Deborah+D&background=F97316&color=fff&size=100"
  },
  {
    id: 3,
    name: "Inès Mir",
    rating: 5,
    text: "Un immense merci à Fun Event pour leur prestation lors de l'anniversaire de ma sœur ! L'animateur était formidable : ponctuel, souriant, professionnel et plein d'énergie.",
    date: "Avril 2025",
    avatar: "https://ui-avatars.com/api/?name=Ines+Mir&background=10B981&color=fff&size=100"
  },
  {
    id: 4,
    name: "Kenza Allili",
    rating: 5,
    text: "Super équipe pour les événements, entreprise très professionnel, matériel de qualité, mise en avant de la sécurité, une merveilleuse journée grâce à vous ! Merci pour votre gentillesse et professionnalisme !!",
    date: "Juin 2025",
    avatar: "https://ui-avatars.com/api/?name=Kenza+A&background=8B5CF6&color=fff&size=100"
  },
  {
    id: 5,
    name: "Diatou Ngom",
    rating: 5,
    text: "Super prestataire ! Je vous le recommande grandement pour vos événements !!",
    date: "Juin 2025",
    avatar: "https://ui-avatars.com/api/?name=Diatou+N&background=EC4899&color=fff&size=100"
  },
  {
    id: 6,
    name: "Geoffrey Pedusselle",
    rating: 5,
    text: "Service au top ! Je recommande à 100% ! Sérieux et professionnel à la fois. Très bon rapport qualité prix.",
    date: "Juin 2025",
    avatar: "https://ui-avatars.com/api/?name=Geoffrey+P&background=14B8A6&color=fff&size=100"
  },
  {
    id: 7,
    name: "Yasmimi Houari",
    rating: 5,
    text: "Très bon service de qualité !",
    date: "Juin 2025",
    avatar: "https://ui-avatars.com/api/?name=Yasmimi+H&background=F59E0B&color=fff&size=100"
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full mb-4">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Avis Google
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">clients</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-2xl font-bold text-gray-900">5/5</span>
            <span className="text-gray-500">basé sur 7 avis Google</span>
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

              {/* Date badge */}
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-6">
                {testimonials[activeIndex].date}
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
                  <p className="text-gray-500 text-sm">Avis Google</p>
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
                    {testimonial.date}
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
