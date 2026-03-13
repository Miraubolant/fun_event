import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Ruler, Heart, Weight, Shield, Clock, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Share2, Star, MapPin, Phone, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';
import { Structure } from '../types';
import { useStructures } from '../contexts/StructuresContext';
import { useCart } from '../contexts/CartContext';
import SEOHead from './SEOHead';
import QuickQuoteForm from './QuickQuoteForm';
import { generateSlug } from '../utils/generateSlug';

const StructurePage: React.FC = () => {
  const { structureSlug } = useParams<{ structureSlug: string }>();
  const navigate = useNavigate();
  const { structures, loading } = useStructures();
  const { addToCart, items } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const structure = structures.find(s => generateSlug(s.name) === structureSlug);

  // Structures similaires (même catégorie, différent id)
  const similarStructures = structures
    .filter(s => s.category === structure?.category && s.id !== structure?.id && s.available)
    .slice(0, 3);

  const allImages = structure ? [structure.image, ...(structure.additionalImages || [])].filter(Boolean) : [];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentImageIndex(0);
    setImageLoaded(false);
  }, [structureSlug]);

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    if (index !== currentImageIndex) {
      setImageLoaded(false);
      setCurrentImageIndex(index);
    }
  };

  const isInCart = (id: string) => items.some(item => item.structure.id === id);

  const handleShare = async () => {
    if (navigator.share && structure) {
      try {
        await navigator.share({
          title: structure.name,
          text: `Découvrez ${structure.name} chez Fun Event - Location de structures gonflables en Île-de-France`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    }
  };


  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-3xl"></div>
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-200 rounded-2xl"></div>
                  <div className="h-24 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!structure) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-8">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Structure non trouvée</h1>
          <p className="text-gray-600 mb-8">Cette structure n'existe pas ou n'est plus disponible.</p>
          <button
            onClick={() => navigate('/catalogue')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all"
          >
            Retour au catalogue
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      <SEOHead
        title={`${structure.name} - Location Structure Gonflable | Fun Event`}
        description={`${structure.description.substring(0, 150)}... Location en Île-de-France avec livraison et installation incluses. À partir de ${structure.customPricing ? 'devis personnalisé' : structure.price + '€/jour'}.`}
        keywords={`${structure.name}, location structure gonflable, ${structure.category}, Fun Event, Île-de-France`}
        ogTitle={`${structure.name} - Fun Event`}
        ogDescription={structure.description.substring(0, 200)}
        ogImage={structure.image}
        canonicalUrl={`https://fun-event.fr/structure/${generateSlug(structure.name)}`}
        pageType="product"
        breadcrumbs={[
          { name: "Accueil", url: "https://fun-event.fr/" },
          { name: "Catalogue", url: "https://fun-event.fr/catalogue" },
          { name: structure.name, url: `https://fun-event.fr/structure/${generateSlug(structure.name)}` }
        ]}
        products={[{
          name: structure.name,
          description: structure.description,
          image: structure.image,
          price: structure.price
        }]}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/catalogue')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour au catalogue
        </button>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl shadow-xl overflow-hidden">
              <div className="relative min-h-[300px] max-h-[600px] flex items-center justify-center">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-100 animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${structure.name} - Image ${currentImageIndex + 1}`}
                  className={`max-w-full max-h-[600px] w-auto h-auto object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800';
                    setImageLoaded(true);
                  }}
                />

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}

                {/* Share button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all hover:scale-110"
                  title="Partager"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'ring-4 ring-blue-500 scale-105 shadow-lg'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniature ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-6">
            {/* Title and price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{structure.name}</h1>
              {structure.customPricing ? (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">
                  Prix sur devis
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black" style={{ color: '#0F97F6' }}>{structure.price}€</span>
                  <span className="text-xl text-gray-500">/jour</span>
                  {structure.price2Days && (
                    <span className="ml-4 text-lg text-orange-500 font-semibold">
                      ou {structure.price2Days}€ pour 2 jours
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Livraison & Installation incluses
              </div>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Certifié NF
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4">
              {(structure.showDimensions !== false) && structure.size && (
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Ruler className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-500 text-sm">Dimensions</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{structure.size}</p>
                </div>
              )}

              {(structure.showCapacity !== false) && structure.capacity && (
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-500 text-sm">Capacité</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{structure.capacity}</p>
                </div>
              )}

              {(structure.showAge !== false) && structure.age && (
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-500 text-sm">Âge recommandé</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{structure.age}</p>
                </div>
              )}

              {structure.maxWeight && (
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Weight className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-500 text-sm">Poids max</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{structure.maxWeight}kg</p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!structure.customPricing && (
                <button
                  onClick={() => addToCart(structure)}
                  className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 ${
                    isInCart(structure.id)
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {isInCart(structure.id) ? 'Ajouter encore' : 'Ajouter au panier'}
                </button>
              )}
              <a
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                {structure.customPricing ? 'Demander un devis' : 'WhatsApp'}
              </a>
            </div>

            {/* Contact info */}
            <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700">Des questions ?</span>
              </div>
              <a href="tel:0663528072" className="font-bold text-blue-600 hover:text-blue-700">
                06 63 52 80 72
              </a>
            </div>
          </div>
        </div>

        {/* Description section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full"></div>
            Description
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {structure.description}
          </p>
        </div>

        {/* Quick Quote Form */}
        <div className="mb-16">
          <QuickQuoteForm structureName={structure.name} />
        </div>

        {/* Services section */}
        {structure.services && (
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-green-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-500" />
              Services et Normes
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {structure.services}
            </p>
          </div>
        )}

        {/* What's included */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            Inclus dans votre location
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🚚', title: 'Livraison & Installation', desc: 'Île-de-France et régions voisines' },
              { icon: '🔧', title: 'Installation incluse', desc: 'Par nos techniciens qualifiés' },
              { icon: '📦', title: 'Récupération', desc: 'En fin de journée' },
              { icon: '🛡️', title: 'Assurance RC Pro', desc: 'Couverture complète' },
              { icon: '✅', title: 'Normes NF EN 14960', desc: 'Certification européenne' },
              { icon: '📞', title: 'Support 7j/7', desc: 'Assistance téléphonique' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              {
                question: `Comment réserver ${structure.name} ?`,
                answer: `Pour réserver ${structure.name}, vous pouvez nous contacter par téléphone au 06 63 52 80 72, via WhatsApp, ou remplir notre formulaire de devis en ligne. Nous vous confirmerons la disponibilité et vous enverrons un devis personnalisé.`
              },
              {
                question: "La livraison et l'installation sont-elles incluses ?",
                answer: "Oui, la livraison et l'installation sont incluses en Île-de-France et régions voisines. Nos techniciens qualifiés s'occupent du montage, des tests de sécurité et vous expliquent le fonctionnement. La récupération en fin de journée est également incluse."
              },
              {
                question: "Quelles sont les conditions de sécurité ?",
                answer: "Toutes nos structures sont conformes à la norme européenne NF EN 14960. Elles sont régulièrement contrôlées et certifiées. Nous fournissons également une assurance responsabilité civile professionnelle couvrant votre événement."
              },
              {
                question: "Que se passe-t-il en cas de mauvais temps ?",
                answer: "En cas de conditions météo dangereuses (vent fort, orage), nous vous proposerons de reporter votre location à une autre date sans frais supplémentaires. La sécurité de vos invités est notre priorité."
              },
              {
                question: "Dois-je prévoir une alimentation électrique ?",
                answer: "Oui, une prise électrique standard (220V) est nécessaire à proximité de la zone d'installation pour alimenter le souffleur qui maintient la structure gonflée. La consommation est faible (environ 1,5kW)."
              },
              {
                question: "Quelle surface dois-je prévoir ?",
                answer: `Pour ${structure.name}, prévoyez une surface plane d'environ ${structure.size} plus 2 mètres de marge de sécurité tout autour. L'emplacement doit être accessible pour notre véhicule de livraison.`
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>


        {/* Similar structures */}
        {similarStructures.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Star className="w-8 h-8 text-orange-500" />
              Structures similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {similarStructures.map((s) => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/structure/${generateSlug(s.name)}`)}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {s.customPricing ? 'Devis' : `À partir de ${s.price}€`}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{s.description}</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      Voir les détails
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Prêt à réserver {structure.name} ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour réserver cette structure pour votre événement !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/devis')}
              className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:scale-105"
            >
              Demander un devis gratuit
            </button>
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-2xl hover:bg-green-600 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Floating Cart Bar - Sticky bottom */}
      {!structure.customPricing && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50 transform transition-transform duration-300">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Product info */}
              <div className="hidden sm:flex items-center gap-4 flex-1 min-w-0">
                <img
                  src={structure.image}
                  alt={structure.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{structure.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-blue-600">{structure.price}€</span>
                    <span className="text-gray-500">/jour</span>
                    {structure.price2Days && (
                      <span className="text-sm text-orange-500 font-medium hidden md:inline">
                        ({structure.price2Days}€ pour 2 jours)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile price */}
              <div className="sm:hidden flex-1">
                <span className="text-2xl font-black text-blue-600">{structure.price}€</span>
                <span className="text-gray-500 text-sm">/jour</span>
              </div>

              {/* Cart button */}
              <button
                onClick={() => addToCart(structure)}
                className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg ${
                  isInCart(structure.id)
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden xs:inline">
                  {isInCart(structure.id) ? 'Dans le panier' : 'Ajouter au panier'}
                </span>
                <span className="xs:hidden">
                  {isInCart(structure.id) ? 'Ajouté' : 'Panier'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for floating bar */}
      {!structure.customPricing && <div className="h-24" />}
    </section>
  );
};

export default StructurePage;
