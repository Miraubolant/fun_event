import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import SEOHead from './SEOHead';
import { useAuth } from '../contexts/AuthContext';
import { useStructures } from '../contexts/StructuresContext';
import { FAQCategory, FAQQuestion } from '../types';

const FAQ: React.FC = () => {
  const { user } = useAuth();
  const { faqCategories, addFAQCategory, updateFAQCategory, deleteFAQCategory, addFAQQuestion, updateFAQQuestion, deleteFAQQuestion, loading } = useStructures();
  
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState<FAQCategory[]>([]);
  
  const isAdmin = user?.email === 'admin@funevent.fr';

  // Initialiser les données d'édition quand on passe en mode édition
  React.useEffect(() => {
    if (isEditing) {
      setEditingData([...faqCategories]);
    }
  }, [isEditing, faqCategories]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const updateCategoryInEditing = (categoryIndex: number, field: string, value: string) => {
    setEditingData(prev => prev.map((category, index) => 
      index === categoryIndex ? { ...category, [field]: value } : category
    ));
  };

  const updateQuestionInEditing = (categoryIndex: number, questionIndex: number, field: string, value: string) => {
    setEditingData(prev => prev.map((category, catIndex) => 
      catIndex === categoryIndex 
        ? {
            ...category,
            questions: category.questions.map((question, qIndex) =>
              qIndex === questionIndex ? { ...question, [field]: value } : question
            )
          }
        : category
    ));
  };

  const addNewQuestionInEditing = (categoryIndex: number) => {
    setEditingData(prev => prev.map((category, index) => 
      index === categoryIndex 
        ? {
            ...category,
            questions: [...category.questions, { 
              id: `temp-${Date.now()}`, 
              categoryId: category.id,
              question: 'Nouvelle question', 
              answer: 'Nouvelle réponse',
              order: category.questions.length + 1
            }]
          }
        : category
    ));
  };

  const deleteQuestionInEditing = (categoryIndex: number, questionIndex: number) => {
    setEditingData(prev => prev.map((category, catIndex) => 
      catIndex === categoryIndex 
        ? {
            ...category,
            questions: category.questions.filter((_, qIndex) => qIndex !== questionIndex)
          }
        : category
    ));
  };

  const addNewCategoryInEditing = () => {
    setEditingData(prev => [...prev, {
      id: `temp-${Date.now()}`,
      category: 'Nouvelle catégorie',
      color: 'bg-gradient-to-r from-blue-500 to-orange-500',
      icon: '🎪',
      order: prev.length + 1,
      questions: [{ 
        id: `temp-q-${Date.now()}`, 
        categoryId: `temp-${Date.now()}`,
        question: 'Nouvelle question', 
        answer: 'Nouvelle réponse',
        order: 1
      }]
    }]);
  };

  const deleteCategoryInEditing = (categoryIndex: number) => {
    setEditingData(prev => prev.filter((_, index) => index !== categoryIndex));
  };

  const saveChanges = async () => {
    try {
      // Sauvegarder les modifications dans Supabase
      for (const category of editingData) {
        if (category.id.startsWith('temp-')) {
          // Nouvelle catégorie
          const newCategoryId = await addFAQCategory({
            category: category.category,
            icon: category.icon,
            color: category.color,
            order: category.order
          });
          
          // Ajouter les questions de cette nouvelle catégorie
          for (const question of category.questions) {
            if (!question.id.startsWith('temp-')) continue;
            await addFAQQuestion({
              categoryId: newCategoryId,
              question: question.question,
              answer: question.answer,
              order: question.order
            });
          }
        } else {
          // Catégorie existante - vérifier si modifiée
          const originalCategory = faqCategories.find(c => c.id === category.id);
          if (originalCategory && (
            originalCategory.category !== category.category ||
            originalCategory.icon !== category.icon ||
            originalCategory.color !== category.color
          )) {
            await updateFAQCategory(category.id, {
              category: category.category,
              icon: category.icon,
              color: category.color,
              order: category.order
            });
          }
          
          // Gérer les questions
          for (const question of category.questions) {
            if (question.id.startsWith('temp-')) {
              // Nouvelle question
              await addFAQQuestion({
                categoryId: category.id,
                question: question.question,
                answer: question.answer,
                order: question.order
              });
            } else {
              // Question existante - vérifier si modifiée
              const originalQuestion = originalCategory?.questions.find(q => q.id === question.id);
              if (originalQuestion && (
                originalQuestion.question !== question.question ||
                originalQuestion.answer !== question.answer
              )) {
                await updateFAQQuestion(question.id, {
                  question: question.question,
                  answer: question.answer,
                  order: question.order
                });
              }
            }
          }
          
          // Supprimer les questions qui ont été retirées
          if (originalCategory) {
            for (const originalQuestion of originalCategory.questions) {
              if (!category.questions.find(q => q.id === originalQuestion.id)) {
                await deleteFAQQuestion(originalQuestion.id);
              }
            }
          }
        }
      }
      
      // Supprimer les catégories qui ont été retirées
      for (const originalCategory of faqCategories) {
        if (!editingData.find(c => c.id === originalCategory.id)) {
          await deleteFAQCategory(originalCategory.id);
        }
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const cancelEditing = () => {
    setEditingData([]);
    setIsEditing(false);
  };

  // Utiliser les données d'édition ou les données réelles
  const dataToUse = isEditing ? editingData : faqCategories;
  
  // Filtrer les questions selon le terme de recherche
  const filteredFaqData = dataToUse.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la FAQ...</p>
        </div>
      </section>
    );
  }

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
          "mainEntity": faqCategories.flatMap(category => 
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

        {/* Boutons d'édition pour l'admin */}
        {isAdmin && (
          <div className="text-center mb-8">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Modifier la FAQ
              </button>
            ) : (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={saveChanges}
                  className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all inline-flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Sauvegarder
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-600 transition-all inline-flex items-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </button>
                <button
                  onClick={addNewCategoryInEditing}
                  className="bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-all inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Ajouter catégorie
                </button>
              </div>
            )}
          </div>
        )}

        {/* FAQ par catégories */}
        <div className="space-y-8">
          {filteredFaqData.map((category, categoryIndex) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`${category.color} px-8 py-6 text-white relative`}>
                <div className="flex items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={category.icon}
                        onChange={(e) => updateCategoryInEditing(categoryIndex, 'icon', e.target.value)}
                        className="text-3xl mr-4 bg-transparent border-b border-white/50 text-white placeholder-white/70 w-16 text-center"
                        placeholder="🎪"
                      />
                      <input
                        type="text"
                        value={category.category}
                        onChange={(e) => updateCategoryInEditing(categoryIndex, 'category', e.target.value)}
                        className="text-2xl font-bold bg-transparent border-b border-white/50 text-white placeholder-white/70 flex-1"
                        placeholder="Nom de la catégorie"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-3xl mr-4">{category.icon}</span>
                      <h2 className="text-2xl font-bold">{category.category}</h2>
                    </>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => addNewQuestionInEditing(categoryIndex)}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                      title="Ajouter une question"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCategoryInEditing(categoryIndex)}
                      className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full transition-colors"
                      title="Supprimer la catégorie"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, questionIndex) => {
                  const itemIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(itemIndex);
                  
                  return (
                    <div key={item.id} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                      {isEditing ? (
                        <div className="px-8 py-6 border-b border-gray-200 last:border-b-0">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Question:</label>
                              <textarea
                                value={item.question}
                                onChange={(e) => updateQuestionInEditing(categoryIndex, questionIndex, 'question', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                rows={2}
                              />
                            </div>
                            <button
                              onClick={() => deleteQuestionInEditing(categoryIndex, questionIndex)}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors flex-shrink-0 mt-6"
                              title="Supprimer la question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Réponse:</label>
                            <textarea
                              value={item.answer}
                              onChange={(e) => updateQuestionInEditing(categoryIndex, questionIndex, 'answer', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                              rows={4}
                            />
                          </div>
                        </div>
                      ) : (
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
                      )}
                      
                      {isOpen && !isEditing && (
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

        {faqCategories.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune FAQ disponible</h3>
            <p className="text-gray-600 mb-6">
              Les questions fréquentes seront bientôt disponibles.
            </p>
          </div>
        )}

        {/* Contact rapide */}
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