import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // Premier item ouvert par défaut
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: 'Réservation',
      color: 'bg-gradient-to-r from-blue-500 to-orange-500',
      icon: '📅',
      questions: [
        {
          question: 'Combien de temps avant mon événement dois-je réserver ?',
          answer: 'Nous recommandons de réserver au moins 2 semaines avant votre événement, surtout en haute saison (printemps/été). Cependant, n\'hésitez pas à nous contacter même pour une demande de dernière minute, nous ferons notre possible pour vous satisfaire !'
        },
        {
          question: 'Comment puis-je réserver une structure ?',
          answer: 'Vous pouvez réserver directement via notre formulaire de devis en ligne, nous appeler au 06 63 52 80 72, ou nous contacter via WhatsApp. Nous vous confirmerons la disponibilité sous 48h maximum.'
        },
        {
          question: 'Puis-je modifier ou annuler ma réservation ?',
          answer: 'Oui, vous pouvez modifier votre réservation jusqu\'à 72h avant la date prévue. Pour les annulations, elles sont possibles jusqu\'à 48h avant sans pénalités. Au-delà, des frais de 30% du montant total s\'appliqueront.'
        }
      ]
    },
    {
      category: 'Livraison & Installation',
      color: 'bg-gradient-to-r from-orange-500 to-blue-500',
      icon: '🚚',
      questions: [
        {
          question: 'L\'installation est-elle comprise dans le prix ?',
          answer: 'Oui, la livraison, l\'installation et le démontage sont toujours compris dans nos tarifs pour toute l\'Île-de-France. Notre équipe professionnelle s\'occupe de tout : montage, vérifications sécurité et nettoyage.'
        },
        {
          question: 'Dans quelles zones livrez-vous ?',
          answer: 'Nous livrons dans toute l\'Île-de-France : Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d\'Oise (95).'
        },
        {
          question: 'Combien de temps prend l\'installation ?',
          answer: 'L\'installation prend généralement entre 30 minutes et 1h30 selon la taille et le nombre de structures. Notre équipe arrive 2h avant le début de votre événement pour tout préparer.'
        }
      ]
    },
    {
      category: 'Sécurité & Météo',
      color: 'bg-gradient-to-r from-blue-500 to-orange-500',
      icon: '🛡️',
      questions: [
        {
          question: 'Vos structures sont-elles sécurisées ?',
          answer: 'Absolument ! Toutes nos structures respectent les normes CE et sont certifiées AFNOR. Elles sont régulièrement contrôlées et entretenues. Nous fournissons également des consignes de sécurité détaillées.'
        },
        {
          question: 'Que se passe-t-il en cas de mauvais temps ?',
          answer: 'Nos structures gonflables résistent aux intempéries légères. En cas de vent fort (>40 km/h) ou d\'orage, nous pourrons reporter la livraison sans frais supplémentaires pour votre sécurité.'
        },
        {
          question: 'Y a-t-il une surveillance nécessaire ?',
          answer: 'Oui, un adulte responsable doit toujours surveiller les enfants pendant l\'utilisation des structures. Nous fournissons un guide de surveillance avec chaque location.'
        }
      ]
    },
    {
      category: 'Tarifs & Paiement',
      color: 'bg-gradient-to-r from-orange-500 to-blue-500',
      icon: '💰',
      questions: [
        {
          question: 'Comment sont calculés vos tarifs ?',
          answer: 'Nos tarifs dépendent du type de structure, de la durée de location et de la zone de livraison. Tous nos prix incluent la livraison, l\'installation et le démontage en Île-de-France.'
        },
        {
          question: 'Quels sont vos moyens de paiement ?',
          answer: 'Nous acceptons les paiements par chèque, virement bancaire, espèces et cartes bancaires. Un acompte de 30% est demandé à la réservation, le solde étant dû le jour de la livraison.'
        },
        {
          question: 'Y a-t-il des frais cachés ?',
          answer: 'Non, nos prix sont transparents et tout compris pour l\'Île-de-France. Les seuls frais supplémentaires possibles concernent les demandes spéciales (nettoyage exceptionnel, heures supplémentaires, etc.) qui sont toujours annoncés à l\'avance.'
        }
      ]
    }
  ];

  // Filtrer les questions selon le terme de recherche
  const filteredFaqData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" itemProp="name">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Questions
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Fréquentes ❓
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto mb-8">
              🔍 Trouvez <span className="font-bold" style={{color: '#0F97F6'}}>rapidement</span> les réponses à vos questions sur nos 
              <span className="font-bold text-orange-500">services</span> et nos <span className="font-bold" style={{color: '#0F97F6'}}>structures</span> 💡
            </p>
          </div>
        </div>

        {/* FAQ par catégories */}
        <div className="space-y-8">
          {filteredFaqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`${category.color} px-8 py-6 text-white`}>
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, questionIndex) => {
                  const itemIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(itemIndex);
                  
                  return (
                    <div key={questionIndex} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 group"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors" itemProp="name">
                            {item.question}
                          </h3>
                          <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-6 h-6 text-blue-500" />
                          </div>
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-8 pb-6 animate-fade-in">
                          <div className="bg-gray-50 rounded-xl p-6" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                            <p className="text-gray-700 leading-relaxed" itemProp="text">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFaqData.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600 mb-6">
              Essayez avec d'autres mots-clés ou contactez-nous directement.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all"
            >
              Voir toutes les questions
            </button>
          </div>
        )}

        {/* Contact rapide - Section question spécifique en dernier */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-2xl p-8 mb-12">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Une question spécifique ?</h2>
            <p className="text-lg mb-6 opacity-90">Notre équipe est disponible 7j/7 pour vous répondre</p>
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
                Appeler
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;