import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import SEOHead from './SEOHead';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Préparer les données pour Formspree
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);

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
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
      } else {
        alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '06 63 52 80 72',
      description: 'Disponible 7j/7 de 8h à 20h',
      link: 'tel:0663528072',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '06 63 52 80 72',
      description: 'Réponse immédiate',
      link: 'https://wa.me/33663528072',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@fun-event.fr',
      description: 'Réponse sous 24h',
      link: 'mailto:contact@fun-event.fr',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Zone d\'intervention',
      value: 'Toute l\'Île-de-France',
      description: '75, 77, 78, 91, 92, 93, 94, 95',
      link: null,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const subjects = [
    'Demande de devis',
    'Question sur une structure',
    'Modification de réservation',
    'Réclamation',
    'Partenariat',
    'Autre'
  ];

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Envoyé !</h2>
            <p className="text-gray-600 mb-6">
              Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/ContactPage">
      <SEOHead
        title="Contact Fun Event - Location Structures Gonflables Île-de-France | 06 63 52 80 72"
        description="📞 Contactez Fun Event pour vos événements ! Téléphone, WhatsApp, email. Service client 7j/7 de 8h à 20h. Réponse rapide garantie en Île-de-France."
        keywords="contact Fun Event, téléphone location structures gonflables, WhatsApp château gonflable Paris, email devis toboggan gonflable, service client 7j/7 Île-de-France"
        ogTitle="Contactez Fun Event - Service Client 7j/7"
        ogDescription="Équipe disponible 7j/7 pour vos projets d'événements. Téléphone, WhatsApp, email - Réponse rapide garantie !"
        canonicalUrl="https://funevent.fr/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Fun Event",
            "telephone": "+33663528072",
            "email": "contact@fun-event.fr",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Île-de-France",
              "addressCountry": "FR"
            },
            "openingHours": "Mo-Su 08:00-20:00",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+33663528072",
                "contactType": "customer service",
                "availableLanguage": "French",
                "areaServed": "FR"
              }
            ]
          }
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" itemProp="name">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Contactez
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Nous 📞
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto" itemProp="description">
              💬 Une <span className="font-bold" style={{color: '#0F97F6'}}>question</span> ? Un 
              <span className="font-bold text-orange-500"> projet</span> ? Notre équipe est là pour vous 
              <span className="font-bold" style={{color: '#0F97F6'}}> accompagner</span> 🤝
            </p>
          </div>
        </div>

        {/* Contact rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const content = (
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center transform hover:scale-105" itemScope itemType="https://schema.org/ContactPoint">
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="contactType">{info.title}</h3>
                <p className="text-lg text-gray-800 font-medium mb-1" itemProp="telephone">{info.value}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            );
            
            return info.link ? (
              <a key={index} href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {content}
              </a>
            ) : (
              <div key={index}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Formulaire de contact */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Envoyez-nous un message</h2>
              <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="06 XX XX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sujet *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Sélectionnez un sujet</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Décrivez votre projet, vos besoins, vos questions..."
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-3" />
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

        {/* Contact rapide en bas */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Besoin d'une réponse immédiate ?</h3>
          <p className="text-lg mb-6 opacity-90">Contactez-nous directement pour un conseil personnalisé</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/33663528072" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
            <a 
              href="tel:0663528072" 
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2" />
              06 63 52 80 72
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;