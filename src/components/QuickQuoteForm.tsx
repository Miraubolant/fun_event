import { useState } from 'react';
import { Calendar, MapPin, Users, Phone, Mail, MessageSquare, Send, CheckCircle, Sparkles } from 'lucide-react';

interface QuickQuoteFormProps {
  cityName?: string;
  postalCode?: string;
  structureName?: string;
}

export default function QuickQuoteForm({ cityName, postalCode, structureName }: QuickQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    { id: 'anniversaire', label: 'Anniversaire enfant', icon: '🎂' },
    { id: 'mariage', label: 'Mariage', icon: '💒' },
    { id: 'bapteme', label: 'Baptême/Communion', icon: '⛪' },
    { id: 'entreprise', label: 'Fête d\'entreprise', icon: '🏢' },
    { id: 'kermesse', label: 'Kermesse', icon: '🎪' },
    { id: 'autre', label: 'Autre', icon: '🎉' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('eventType', formData.eventType);
      body.append('date', formData.date);
      body.append('guests', formData.guests);
      body.append('message', formData.message);
      if (structureName) body.append('structure', structureName);
      if (cityName) body.append('location', `${cityName} (${postalCode})`);

      const response = await fetch('https://formspree.io/f/myzpezbg', {
        method: 'POST',
        body,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: '' });
        }, 5000);
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Demande envoyée !
        </h3>
        <p className="text-xl text-gray-700 mb-2">
          Merci pour votre demande de devis{structureName ? ` pour ${structureName}` : cityName ? ` à ${cityName}` : ''}
        </p>
        <p className="text-gray-600">
          Nous vous répondrons dans les <strong>24h</strong> par email ou téléphone.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-8 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Devis Gratuit</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            {structureName ? `Réservez ${structureName}` : `Votre événement à ${cityName}`}
          </h2>
          <p className="text-lg opacity-90 font-medium">
            Réponse personnalisée en moins de 24h
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">

        {/* Type d'événement */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Type d'événement *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {eventTypes.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, eventType: type.id }))}
                className={`p-4 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                  formData.eventType === type.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-3xl mb-2 block">{type.icon}</span>
                <span className="text-sm font-medium text-gray-900">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-gray-900 mb-2">
              Date de l'événement *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Nombre d'invités */}
          <div>
            <label htmlFor="guests" className="block text-sm font-bold text-gray-900 mb-2">
              Nombre d'invités
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Ex: 50"
                min="1"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Lieu de l'événement{!cityName ? ' *' : ''}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
            {cityName ? (
              <input
                type="text"
                value={`${cityName} (${postalCode})`}
                disabled
                className="w-full pl-11 pr-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl font-medium text-gray-700"
              />
            ) : (
              <input
                type="text"
                name="location"
                placeholder="Ville ou code postal"
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            )}
          </div>
        </div>

        {/* Informations de contact */}
        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            Vos coordonnées
          </h3>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jean Dupont"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jean@exemple.fr"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="06 12 34 56 78"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message (optionnel)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Décrivez votre événement, vos besoins particuliers..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Demander mon devis gratuit
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          🔒 Vos données sont sécurisées et ne seront jamais partagées
        </p>
      </form>
    </div>
  );
}
