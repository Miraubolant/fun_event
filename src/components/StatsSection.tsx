import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Star, MapPin, Award, Shield, Clock, Truck } from 'lucide-react';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ events: 0, satisfaction: 0, cities: 0, years: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: TrendingUp, value: 500, suffix: '+', label: 'Événements réalisés', description: 'en Île-de-France', color: 'blue' },
    { icon: Star, value: 98, suffix: '%', label: 'Clients satisfaits', description: 'recommandent nos services', color: 'orange' },
    { icon: MapPin, value: 100, suffix: '+', label: 'Villes desservies', description: 'livraison gratuite', color: 'green' },
    { icon: Award, value: 5, suffix: ' ans', label: 'd\'expérience', description: 'à votre service', color: 'purple' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = [500, 98, 100, 5];
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounts({
        events: Math.round(targets[0] * easeProgress),
        satisfaction: Math.round(targets[1] * easeProgress),
        cities: Math.round(targets[2] * easeProgress),
        years: Math.round(targets[3] * easeProgress),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const countValues = [counts.events, counts.satisfaction, counts.cities, counts.years];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Pourquoi nous faire <span className="text-orange-500">confiance ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des chiffres qui parlent d'eux-mêmes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-3xl flex items-center justify-center shadow-xl shadow-${stat.color}-500/30`}>
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                {countValues[index]}{stat.suffix}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, text: 'Structures certifiées NF', subtext: 'Sécurité garantie', color: 'green' },
            { icon: Truck, text: 'Livraison gratuite', subtext: 'Toute Île-de-France', color: 'blue' },
            { icon: Clock, text: 'Service 7j/7', subtext: 'À votre écoute', color: 'orange' },
            { icon: Star, text: 'Note 4.9/5', subtext: '127 avis vérifiés', color: 'yellow' },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-${badge.color}-100 rounded-xl flex items-center justify-center`}>
                <badge.icon className={`w-6 h-6 text-${badge.color}-600`} />
              </div>
              <div>
                <div className="text-gray-900 font-semibold text-sm">{badge.text}</div>
                <div className="text-gray-500 text-xs">{badge.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
