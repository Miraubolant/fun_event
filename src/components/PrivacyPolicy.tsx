import React from 'react';
import { Shield, Eye, Clock, Database, UserCheck, Mail } from 'lucide-react';
import SEOHead from './SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <SEOHead
        title="Politique de Confidentialité - Fun Event | Protection Données Personnelles"
        description="🔒 Politique de confidentialité Fun Event. Protection de vos données personnelles, RGPD, cookies, droits utilisateurs. Transparence totale sur l'utilisation de vos informations."
        keywords="politique confidentialité Fun Event, protection données personnelles, RGPD structures gonflables, cookies site web, droits utilisateurs"
        canonicalUrl="https://funevent.fr/politique-confidentialite"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Politique de
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Confidentialité 🔒
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
            <p className="text-lg mb-4">
              Bienvenue sur Fun-event, Le spécialiste de la location de matériel professionnel de divertissement et de structures gonflables 
              en Île-de-France et dans les régions voisines. Notre mission ? Apporter la touche finale à vos événements en créant des moments 
              uniques, festifs et inoubliables.
            </p>
            <p>
              La protection de vos données personnelles est essentielle pour nous. Cette page a pour but de vous expliquer comment nous 
              collectons, utilisons et protégeons vos informations.
            </p>
          </div>

          {/* 1. Collecte des données */}
          <div>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1. Collecte des données</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                Nous collectons uniquement les données nécessaires pour traiter vos demandes de devis via notre formulaire de contact :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Nom et prénom</li>
                <li>• Adresse e-mail</li>
                <li>• Numéro de téléphone</li>
                <li>• Adresse postale (lieu de la prestation)</li>
                <li>• Informations liées à votre demande (date, type de structure ou service souhaité, etc.)</li>
              </ul>
              <p className="text-gray-700 mt-4 font-medium">
                Nous ne collectons aucune donnée sensible ni ne mettons en place de cookies de suivi ou de publicité.
              </p>
            </div>
          </div>

          {/* 2. Utilisation des données */}
          <div>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">2. Utilisation des données</h2>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">Vos données sont utilisées uniquement pour :</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Répondre à vos demandes de devis</li>
                <li>• Vous contacter pour finaliser une prestation ou vous demander des précisions</li>
                <li>• Assurer le bon déroulement des services que vous avez sollicités</li>
              </ul>
              <p className="text-gray-700 mt-4 font-medium">
                Aucune de vos informations ne sera vendue, partagée ou communiquée à des tiers à des fins commerciales.
              </p>
            </div>
          </div>

          {/* 3. Durée de conservation */}
          <div>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">3. Durée de conservation</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-3">Vos données sont conservées uniquement pendant le temps nécessaire pour :</p>
              <ul className="space-y-2 mb-4">
                <li>• Traiter votre demande de devis</li>
                <li>• Respecter nos obligations comptables ou administratives si vous devenez client</li>
              </ul>
              <p>Ensuite, elles sont supprimées de manière sécurisée.</p>
            </div>
          </div>

          {/* 4. Hébergement des données */}
          <div>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">4. Hébergement des données</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p>
                Les données envoyées via notre formulaire sont stockées de manière sécurisée via notre service de messagerie. 
                Nous mettons en œuvre les mesures nécessaires pour garantir leur confidentialité.
              </p>
            </div>
          </div>

          {/* 5. Vos droits */}
          <div>
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">5. Vos droits</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                Conformément à la réglementation applicable (notamment le RGPD), vous disposez des droits suivants :
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Droit d'accès à vos données</li>
                <li>• Droit de rectification</li>
                <li>• Droit à l'effacement</li>
                <li>• Droit d'opposition</li>
                <li>• Droit à la limitation du traitement</li>
              </ul>
              <p className="text-gray-700">
                Vous pouvez exercer ces droits en nous contactant à l'adresse suivante : 
                <strong className="ml-1">contact@fun-event.fr</strong>
              </p>
            </div>
          </div>

          {/* 6. Contact */}
          <div>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">6. Contact</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-6 rounded-xl">
              <p className="text-lg mb-3">
                Pour toute question relative à vos données personnelles ou à cette politique de confidentialité, vous pouvez nous écrire à :
              </p>
              <div className="space-y-1">
                <p className="font-bold text-xl">FUN EVENT</p>
                <p className="font-semibold">contact@fun-event.fr</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;