import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Calculator, CheckCircle, ArrowRight } from 'lucide-react';

const Quote: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    duration: '',
    location: '',
    guests: '',
    structures: [],
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eventTypes = [
    { id: 'anniversaire', label: 'Anniversaire enfant', icon: '🎂' },
    { id: 'bapteme', label: 'Baptême/Communion', icon: '⛪' },
    { id: 'mariage', label: 'Mariage', icon: '💒' },
    { id: 'entreprise', label: 'Fête d\'entreprise', icon: '🏢' },
    { id: 'team-building', label: 'Team building', icon: '🤝' },
    { id: 'quartier', label: 'Fête de quartier', icon: '🏘️' },
    { id: 'kermesse', label: 'Kermesse', icon: '🎪' },
    { id: 'festival', label: 'Festival', icon: '🎭' },
    { id: 'autre', label: 'Autre', icon: '🎉' }
  ];

  const durations = [
    { id: '4h', label: '4 heures', multiplier: 0.8 },
    { id: '6h', label: '6 heures', multiplier: 1 },
    { id: '8h', label: '8 heures', multiplier: 1.2 },
    { id: 'journee', label: 'Journée complète', multiplier: 1.5 },
    { id: 'weekend', label: 'Weekend', multiplier: 2.5 },
    { id: 'plusieurs', label: 'Plusieurs jours', multiplier: 3.5 }
  ];

  const zones = [
    'Paris (75)', 'Seine-et-Marne (77)', 'Yvelines (78)', 'Essonne (91)',
    'Hauts-de-Seine (92)', 'Seine-Saint-Denis (93)', 'Val-de-Marne (94)', 'Val-d\'Oise (95)'
  ];

  const structures = [
    { id: 'gladiateurs', name: 'Instables Gladiateurs', price: 180, icon: '⚔️' },
    { id: 'chateau-cirque', name: 'Château Cirque', price: 150, icon: '🎪' },
    { id: 'toboggan-geant', name: 'Toboggan Géant', price: 180, icon: '🛝' },
    { id: 'parcours-obstacles', name: 'Parcours d\'Obstacles', price: 160, icon: '🏃' },
    { id: 'baby-foot-geant', name: 'Baby-foot Géant', price: 150, icon: '⚽' },
    { id: 'terrain-foot', name: 'Terrain de Foot', price: 200, icon: '🥅' },
    { id: 'piscine-gonflable', name: 'Piscine Gonflable', price: 100, icon: '🏊' },
    { id: 'toboggan-aquatique', name: 'Toboggan Aquatique', price: 130, icon: '💦' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStructureChange = (structureId: string, isChecked: boolean) => {
    setFormData(prev => ({
      ...prev,
      structures: isChecked 
        ? [...prev.structures, structureId]
        : prev.structures.filter(id => id !== structureId)
    }));
  };

  const calculateEstimate = () => {
    let total = 0;
    
    formData.structures.forEach(structureId => {
      const structure = structures.find(s => s.id === structureId);
      if (structure) {
        total += structure.price;
      }
    });

    const duration = durations.find(d => d.id === formData.duration);
    const multiplier = duration?.multiplier || 1;
    total *= multiplier;

    setEstimatedPrice(Math.round(total));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEstimate();
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Demande Envoyée !</h2>
            <p className="text-xl text-gray-600 mb-8">
              Merci pour votre demande de devis. Nous vous contactons sous 48h maximum.
            </p>
            {estimatedPrice && (
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-6 rounded-xl mb-8">
                <h3 className="text-2xl font-bold mb-2">Estimation de votre devis</h3>
                <p className="text-4xl font-bold">{estimatedPrice}€</p>
                <p className="text-sm opacity-90">Prix indicatif - Devis définitif sous 48h</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
              >
                Nous contacter sur WhatsApp
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    eventType: '', date: '', duration: '', location: '', guests: '',
                    structures: [], name: '', email: '', phone: '', message: ''
                  });
                }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all"
              >
                Nouvelle demande
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Demande de Devis</h1>
          <p className="text-xl text-gray-600">
            Obtenez un devis personnalisé en 3 étapes simples
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-500 to-orange-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Étape {currentStep} sur 3: {
                  currentStep === 1 ? 'Votre événement' :
                  currentStep === 2 ? 'Vos structures' : 'Vos informations'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <form onSubmit={handleSubmit}>
            
            {/* Étape 1: Informations événement */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <Calendar className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Parlez-nous de votre événement</h2>
                  <p className="text-gray-600">Ces informations nous aident à vous proposer les meilleures structures</p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Type d'événement *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {eventTypes.map(type => (
                      <label 
                        key={type.id}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.eventType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="eventType"
                          value={type.id}
                          checked={formData.eventType === type.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-2xl mr-3">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Date souhaitée *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Nombre d'invités *
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      placeholder="ex: 25"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Durée de location *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {durations.map(duration => (
                      <label 
                        key={duration.id}
                        className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.duration === duration.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={duration.id}
                          checked={formData.duration === duration.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="font-medium text-center">{duration.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Zone de livraison *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Sélectionnez votre département</option>
                    {zones.map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Étape 2: Sélection des structures */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">🎪</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Choisissez vos structures</h2>
                  <p className="text-gray-600">Sélectionnez les structures qui feront le bonheur de vos invités</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {structures.map(structure => (
                    <label 
                      key={structure.id}
                      className={`group flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.structures.includes(structure.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 mr-4"
                        onChange={(e) => handleStructureChange(structure.id, e.target.checked)}
                        checked={formData.structures.includes(structure.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{structure.icon}</span>
                            <div>
                              <h3 className="font-bold text-gray-900">{structure.name}</h3>
                              <p className="text-blue-600 font-bold">À partir de {structure.price}€</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Étape 3: Informations contact */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Vos informations</h2>
                  <p className="text-gray-600">Pour finaliser votre demande de devis personnalisé</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Message complémentaire
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Précisez vos besoins spécifiques, contraintes, etc."
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-8 py-4 rounded-xl font-bold transition-all ${
                  currentStep === 1 
                    ? 'invisible' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Précédent
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Obtenir mon devis
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Quote;