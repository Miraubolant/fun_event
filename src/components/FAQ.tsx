import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle, Search } from 'lucide-react';
import SEOHead from './SEOHead';

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
          question: 'Comment se déroule une réservation sur fun-event ?',
          answer: 'Vous pouvez effectuer votre demande de réservation via notre site internet, par téléphone ou par email. Une fois votre demande reçue, nous vous enverrons un devis personnalisé. La réservation sera confirmée dès réception de votre accord écrit et du paiement de l\'acompte.'
        },
        {
          question: 'Y a-t-il un acompte à déposer pour bloquer ma réservation ?',
          answer: 'Vous pouvez effectuer votre demande de réservation via notre site internet, par téléphone ou par email. Une fois votre demande reçue, nous vous enverrons un devis personnalisé. La réservation sera confirmée dès réception de votre accord écrit et du paiement de l\'acompte.'
        },
        {
          question: 'Quels sont les délais pour annuler une réservation ?',
          answer: 'Vous pouvez annuler votre réservation jusqu\'à 7 jours avant la date prévue sans frais. Passé ce délai, l\'acompte versé ne pourra pas être remboursé.'
        },
        {
          question: 'Comment savoir si ma demande de devis a bien été prise en compte ?',
          answer: 'Une fois votre demande envoyée, vous recevrez un accusé de réception par mail. Nous vous contacterons ensuite rapidement pour finaliser les détails et vous transmettre le devis.'
        }
      ]
    },
    {
      category: 'Livraison & Installation',
      color: 'bg-gradient-to-r from-orange-500 to-blue-500',
      icon: '🚚',
      questions: [
        {
          question: 'Assurez-vous la livraison et l\'installation ?',
          answer: 'Oui, Fun Event propose un service de livraison, d\'installation et de démontage des structures gonflables et du matériel loué. Ce service est assuré par notre équipe et est facturé en supplément. Le tarif dépend de la distance et du type de matériel à installer. Tous les détails sont indiqués dans le devis personnalisé.'
        }
      ]
    },
    {
      category: 'Paiement & Caution',
      color: 'bg-gradient-to-r from-blue-500 to-orange-500',
      icon: '💳',
      questions: [
        {
          question: 'Y a-t-il une caution à verser ?',
          answer: 'Oui, une caution est demandée le jour de la prestation ou à la livraison du matériel. Elle est restituée à la fin de la prestation après vérification du bon état du matériel.'
        },
        {
          question: 'Quels sont les moyens de paiement acceptés par Fun Event ?',
          answer: 'Nous acceptons les paiements par virement bancaire, carte bancaire, ou espèces. Tous les détails sont indiqués sur le devis et la facture.'
        },
        {
          question: 'À quel moment le paiement doit-il être effectué ?',
          answer: 'L\'acompte est à verser au moment de la réservation. Le solde peut être réglé soit avant la prestation, soit le jour même, avant l\'installation.'
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
      <SEOHead
        title="FAQ - Questions Fréquentes | Fun Event Location Structures Gonflables"
        description="❓ Toutes les réponses à vos questions sur la location de structures gonflables : réservation, livraison, installation, tarifs, sécurité. Service client 7j/7 en Île-de-France."
        keywords="FAQ structures gonflables, questions location château gonflable, tarifs livraison installation, sécurité normes gonflables, réservation Fun Event Paris, service client 7j/7"
        ogTitle="FAQ Complète - Location Structures Gonflables Fun Event"
        ogDescription="Trouvez rapidement les réponses à toutes vos questions sur nos services de location de structures gonflables premium."
        canonicalUrl="https://funevent.fr/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.flatMap(category => 
            category.questions.slice(0, 3).map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          )
        }}
      />
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