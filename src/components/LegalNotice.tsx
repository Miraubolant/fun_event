import React from 'react';
import { Scale, Building, Shield, Mail, Phone } from 'lucide-react';

const LegalNotice: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Mentions
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Légales ⚖️
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Dernière mise à jour : 09/05/2025
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 space-y-8">
          
          {/* Introduction */}
          <div className="text-gray-700 leading-relaxed">
            <p>
              Conformément aux articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), 
              il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
          </div>

          {/* 1. Éditeur du site */}
          <div>
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1. Éditeur du site</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="space-y-2 text-gray-700">
                <p><strong>Nom de l'entreprise :</strong> FUN EVENT</p>
                <p><strong>Forme juridique :</strong> SAS</p>
                <p><strong>Téléphone :</strong> 06 63 52 80 72</p>
                <p><strong>E-mail :</strong> contact@fun-event.fr</p>
                <p><strong>SIRET :</strong> 942 405 309 00017</p>
                <p><strong>Responsable de publication :</strong> Le représentant légal de Fun-event</p>
              </div>
            </div>
          </div>

          {/* 2. Hébergement du site */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">2. Hébergement du site</h2>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="space-y-2 text-gray-700">
                <p><strong>Hébergeur :</strong> Hostinger, UAB</p>
                <p><strong>Adresse :</strong> Jonavos g. 60C, 44192 Kaunas, Lituanie</p>
                <p><strong>Téléphone :</strong> +370 645 03378</p>
              </div>
            </div>
          </div>

          {/* 3. Propriété intellectuelle */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
            <div className="text-gray-700 leading-relaxed">
              <p>
                Le contenu de ce site (textes, images, photos, logos, charte graphique, etc.) est protégé par le droit d'auteur 
                et reste la propriété exclusive de Fun-event, sauf mention contraire.
              </p>
              <p className="mt-3">
                Toute reproduction, représentation, modification ou adaptation, partielle ou intégrale, sans autorisation écrite 
                préalable est strictement interdite.
              </p>
            </div>
          </div>

          {/* 4. Responsabilité */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilité</h2>
            <div className="text-gray-700 leading-relaxed">
              <p>
                Fun-event met tout en œuvre pour fournir sur le site des informations aussi précises que possible. 
                Toutefois, l'entreprise ne pourra être tenue responsable des omissions, des inexactitudes ou des carences 
                dans la mise à jour des contenus.
              </p>
            </div>
          </div>

          {/* 5. Données personnelles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Données personnelles</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>
                Les informations saisies par les utilisateurs dans le formulaire de contact (nom, e-mail, téléphone, localisation, etc.) 
                sont collectées uniquement pour permettre la gestion des demandes de devis et la communication commerciale directe.
              </p>
              <p>
                Aucune donnée n'est vendue ou transmise à des tiers.
              </p>
              <p>
                Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données, 
                en nous contactant à l'adresse suivante : contact@fun-event.fr
              </p>
              <p>
                Pour en savoir plus, consultez notre Politique de confidentialité
              </p>
            </div>
          </div>

          {/* 6. Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <div className="text-gray-700 leading-relaxed">
              <p>
                Ce site ne dépose pas de cookies de suivi ni de publicité. Il peut utiliser des cookies techniques 
                nécessaires au bon fonctionnement du formulaire ou de l'affichage.
              </p>
            </div>
          </div>

          {/* 7. Droit applicable */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Droit applicable</h2>
            <div className="text-gray-700 leading-relaxed">
              <p>
                Le présent site est soumis au droit français. En cas de litige, les tribunaux compétents seront 
                ceux du siège social de l'entreprise.
              </p>
            </div>
          </div>

          {/* 8. Contact */}
          <div>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">8. Contact</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-6 rounded-xl">
              <p className="text-lg">
                Pour toute question concernant ces mentions légales, vous pouvez nous écrire à : 
                <strong className="ml-2">contact@fun-event.fr</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LegalNotice;