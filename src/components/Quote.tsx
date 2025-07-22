import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStructures } from '../contexts/StructuresContext';

const Quote: React.FC = () => {
  const { items: cartItems, clearCart, getTotalPrice, updateDuration: updateCartDuration } = useCart();
  const { structures: allStructures, categories } = useStructures();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    duration: '',
    location: '',
    guests: '',
    structures: [] as Array<{id: string, duration: '1day' | '2days'}>,
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialiser les structures depuis le panier au chargement
  React.useEffect(() => {
    if (cartItems.length > 0) {
      const cartStructures = cartItems.map(item => ({
        id: item.structure.id,
        duration: item.duration
      }));
      setFormData(prev => ({
        ...prev,
        structures: cartStructures
      }));
    }
  }, [cartItems]);

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

  // Filtrer les structures disponibles et ajouter les icônes par catégorie
  const availableStructures = allStructures.filter(s => s.available).map(structure => {
    const category = categories.find(c => c.id === structure.category);
    return {
      ...structure,
      icon: category?.icon || '🎪'
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStructureChange = (structureId: string, isChecked: boolean, duration: '1day' | '2days' = '1day') => {
    setFormData(prev => ({
      ...prev,
      structures: isChecked 
        ? [...prev.structures, { id: structureId, duration }]
        : prev.structures.filter(item => item.id !== structureId)
    }));
  };

  const handleDurationChange = (structureId: string, duration: '1day' | '2days') => {
    // Mettre à jour l'état local du formulaire
    setFormData(prev => ({
      ...prev,
      structures: prev.structures.map(item =>
        item.id === structureId ? { ...item, duration } : item
      )
    }));
    
    // Si la structure est dans le panier, mettre à jour le panier aussi
    const isInCart = cartItems.some(item => item.structure.id === structureId);
    if (isInCart) {
      updateCartDuration(structureId, duration);
    }
  };

  const calculateEstimate = () => {
    let total = 0;
    
    formData.structures.forEach(structureItem => {
      const structure = availableStructures.find(s => s.id === structureItem.id);
      if (structure) {
        const price = structureItem.duration === '2days' && structure.price2Days 
          ? structure.price2Days 
          : structure.price;
        total += price;
      }
    });

    const duration = durations.find(d => d.id === formData.duration);
    const multiplier = duration?.multiplier || 1;
    total *= multiplier;

    setEstimatedPrice(Math.round(total));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculer l'estimation avant l'envoi
    let total = 0;
    formData.structures.forEach(structureItem => {
      const structure = availableStructures.find(s => s.id === structureItem.id);
      if (structure) {
        const price = structureItem.duration === '2days' && structure.price2Days 
          ? structure.price2Days 
          : structure.price;
        total += price;
      }
    });
    const duration = durations.find(d => d.id === formData.duration);
    const multiplier = duration?.multiplier || 1;
    total *= multiplier;
    const finalPrice = Math.round(total);
    setEstimatedPrice(finalPrice);

    // Préparer les données pour Formspree
    const formDataToSend = new FormData();
    formDataToSend.append('eventType', eventTypes.find(t => t.id === formData.eventType)?.label || formData.eventType);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('duration', durations.find(d => d.id === formData.duration)?.label || formData.duration);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('guests', formData.guests);
    
    // Ajouter les structures sélectionnées
    const structuresDetails = formData.structures.map(structureItem => {
      const structure = availableStructures.find(s => s.id === structureItem.id);
      return structure ? `${structure.name} (${structureItem.duration === '2days' ? '2 jours' : '1 jour'})` : '';
    }).filter(Boolean).join(', ');
    formDataToSend.append('structures', structuresDetails);
    
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('estimatedPrice', `${finalPrice}€`);

    // Envoyer à Formspree
    fetch('https://formspree.io/f/myzpezbg', {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Vider le panier après soumission réussie
        clearCart();
        setIsSubmitted(true);
      } else {
        alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Scroll vers la section appropriée
      if (currentStep + 1 === 2) {
        // À l'étape 2, scroll vers la section des structures
        setTimeout(() => {
          const structuresSection = document.getElementById('structures-section');
          if (structuresSection) {
            structuresSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        // Pour les autres étapes, scroll en haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll automatiquement en haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
                <p className="text-sm opacity-90">
                  Prix indicatif basé sur {formData.structures.length} structure(s) - Devis définitif sous 48h
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
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
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-gray-50 transition-all transform hover:scale-105 text-sm sm:text-base"
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
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Demande de
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Devis ✨
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto">
              📋 Obtenez un <span className="font-bold" style={{color: '#0F97F6'}}>devis personnalisé</span> en 
              <span className="font-bold text-orange-500"> 3 étapes simples</span> et 
              <span className="font-bold" style={{color: '#0F97F6'}}> gratuit</span> 🎯
            </p>
          </div>
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
                        className={`flex items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
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
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{type.icon}</span>
                        <span className="font-medium text-sm sm:text-base">{type.label}</span>
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
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
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
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
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
                        className={`flex items-center justify-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
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
                        <span className="font-medium text-center text-sm sm:text-base">{duration.label}</span>
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
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
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
              <div id="structures-section" className="space-y-8">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">🎪</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Choisissez vos structures</h2>
                  <p className="text-gray-600">Sélectionnez les structures qui feront le bonheur de vos invités</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableStructures.map(structure => {
                    const isFromCart = cartItems.some(item => item.structure.id === structure.id);
                    const isSelected = formData.structures.some(item => item.id === structure.id);
                    const selectedItem = formData.structures.find(item => item.id === structure.id);
                    const cartItem = cartItems.find(item => item.structure.id === structure.id);
                    const currentDuration = selectedItem?.duration || cartItem?.duration || '1day';
                    
                    return (
                    <label 
                      key={structure.id}
                      className={`group flex flex-col p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                        isSelected || isFromCart
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 rounded focus:ring-blue-500 mr-3 sm:mr-4"
                          onChange={(e) => handleStructureChange(structure.id, e.target.checked, currentDuration)}
                          checked={isSelected || isFromCart}
                          disabled={isFromCart}
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{structure.icon}</span>
                            <div>
                              <h3 className="font-bold text-gray-900 text-sm sm:text-base">{structure.name}</h3>
                              <p className="text-blue-600 font-bold text-xs sm:text-sm">
                                1 jour: {structure.price}€
                                {structure.price2Days && ` • 2 jours: ${structure.price2Days}€`}
                              </p>
                              {isFromCart && (
                                <p className="text-xs text-green-600 font-medium">✓ Ajouté depuis le panier</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {(isSelected || isFromCart) && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Durée de location:
                          </label>
                          <select
                            value={currentDuration}
                            onChange={(e) => handleDurationChange(structure.id, e.target.value as '1day' | '2days')}
                            className="w-full px-2 py-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs sm:text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="1day">1 jour - {structure.price}€</option>
                            {structure.price2Days && (
                              <option value="2days">2 jours - {structure.price2Days}€</option>
                            )}
                          </select>
                        </div>
                      )}
                    </label>
                  );
                  })}
                </div>
                
                {availableStructures.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎪</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune structure disponible</h3>
                    <p className="text-gray-600">
                      Toutes nos structures sont actuellement indisponibles.
                    </p>
                  </div>
                )}
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
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
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
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
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
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
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
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm sm:text-base"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold transition-all text-sm sm:text-base ${
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
                  className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center text-sm sm:text-base"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center text-xs sm:text-base w-auto"
                >
                  <Calculator className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
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