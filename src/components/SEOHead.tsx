import React from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductItem {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
}

interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
  // Nouveaux props pour Schema.org avancé
  pageType?: 'home' | 'catalog' | 'gallery' | 'faq' | 'quote' | 'contact' | 'legal';
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
  products?: ProductItem[];
  reviews?: ReviewItem[];
  localBusiness?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Fun Event - Location Structures Gonflables Île-de-France | Châteaux Gonflables Paris",
  description = "Location de structures gonflables premium en Île-de-France. Châteaux gonflables, toboggans, jeux pour anniversaires, mariages, événements. Livraison gratuite Paris 75, 77, 78, 91, 92, 93, 94, 95.",
  keywords = "location structures gonflables, château gonflable Paris, location jeux gonflables Île-de-France, anniversaire enfant, événement festif, toboggan gonflable, animation enfant Paris",
  ogTitle,
  ogDescription,
  ogImage = "https://i.imgur.com/gfhDZfm.png",
  canonicalUrl = "https://fun-event.fr/",
  structuredData,
  pageType = 'home',
  breadcrumbs,
  faqItems,
  products,
  reviews,
  localBusiness = true
}) => {
  React.useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = title;

    // Mettre à jour ou créer les balises meta
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Balises meta standard
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('author', 'Fun Event');

    // Open Graph complet
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', 'Fun Event - Structures gonflables premium', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', pageType === 'catalog' ? 'product.group' : 'website', true);
    updateMetaTag('og:site_name', 'Fun Event', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@fun_eventt');

    // Geo tags pour le SEO local
    updateMetaTag('geo.region', 'FR-IDF');
    updateMetaTag('geo.placename', 'Paris, Île-de-France');
    updateMetaTag('geo.position', '48.8566;2.3522');
    updateMetaTag('ICBM', '48.8566, 2.3522');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Construire les données structurées
    const schemas: object[] = [];

    // Schema LocalBusiness (toujours présent)
    if (localBusiness) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "EventsVenue", "EntertainmentBusiness"],
        "@id": "https://fun-event.fr/#organization",
        "name": "Fun Event",
        "legalName": "Fun Event SARL",
        "alternateName": ["Fun Event Location Gonflables", "Fun Event Paris", "Location Gonflables IDF"],
        "description": "Spécialiste de la location de structures gonflables premium en Île-de-France pour tous vos événements : anniversaires, mariages, fêtes d'entreprise, kermesses et fêtes de quartier.",
        "slogan": "Des souvenirs gonflés de bonheur !",
        "url": "https://fun-event.fr",
        "telephone": "+33663528072",
        "email": "contact@fun-event.fr",
        "foundingDate": "2020",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 5,
          "maxValue": 10
        },
        "logo": {
          "@type": "ImageObject",
          "url": "https://i.imgur.com/gfhDZfm.png",
          "width": 512,
          "height": 512,
          "caption": "Fun Event - Location structures gonflables"
        },
        "image": [
          "https://i.imgur.com/gfhDZfm.png",
          "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg"
        ],
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Check"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressRegion": "Île-de-France",
          "addressCountry": "FR",
          "postalCode": "75000"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.8566,
          "longitude": 2.3522
        },
        "areaServed": [
          { "@type": "City", "name": "Paris", "sameAs": "https://fr.wikipedia.org/wiki/Paris" },
          { "@type": "AdministrativeArea", "name": "Seine-Saint-Denis (93)" },
          { "@type": "AdministrativeArea", "name": "Val-de-Marne (94)" },
          { "@type": "AdministrativeArea", "name": "Val-d'Oise (95)" },
          { "@type": "AdministrativeArea", "name": "Seine-et-Marne (77)" },
          { "@type": "AdministrativeArea", "name": "Yvelines (78)" },
          { "@type": "AdministrativeArea", "name": "Essonne (91)" },
          { "@type": "AdministrativeArea", "name": "Hauts-de-Seine (92)" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catalogue structures gonflables",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Châteaux gonflables",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Location château gonflable enfant" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Location château gonflable avec toboggan" } }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Toboggans gonflables",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Location toboggan gonflable géant" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Location toboggan aquatique" } }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Parcours d'obstacles",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Location parcours gonflable" } }
              ]
            }
          ]
        },
        "knowsAbout": [
          "Location structures gonflables",
          "Animation événementielle enfants",
          "Organisation anniversaire enfant",
          "Animation mariage",
          "Événement entreprise",
          "Kermesse école",
          "Fête de quartier"
        ],
        "makesOffer": [
          {
            "@type": "Offer",
            "name": "Location château gonflable",
            "description": "Location de châteaux gonflables pour anniversaires et événements",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "EUR",
              "minPrice": 150,
              "maxPrice": 500
            },
            "areaServed": "Île-de-France",
            "availableDeliveryMethod": "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"
          },
          {
            "@type": "Offer",
            "name": "Location toboggan gonflable",
            "description": "Location de toboggans gonflables géants avec installation",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "EUR",
              "minPrice": 200,
              "maxPrice": 800
            },
            "areaServed": "Île-de-France"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "22:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": [
          "https://www.instagram.com/fun_eventt/",
          "https://www.tiktok.com/@fun_eventt"
        ],
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://fun-event.fr/devis",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "Reservation",
            "name": "Réservation structure gonflable"
          }
        }
      });
    }

    // Schema WebSite
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://fun-event.fr/#website",
      "url": "https://fun-event.fr",
      "name": "Fun Event",
      "description": "Location de structures gonflables premium en Île-de-France",
      "publisher": {
        "@id": "https://fun-event.fr/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://fun-event.fr/catalogue?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    });

    // Schema BreadcrumbList
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      });
    }

    // Schema FAQPage
    if (faqItems && faqItems.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      });
    }

    // Schema Product/ItemList pour le catalogue
    if (products && products.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": products.map((product, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "brand": {
              "@type": "Brand",
              "name": "Fun Event"
            },
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": product.currency || "EUR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              "seller": {
                "@type": "Organization",
                "name": "Fun Event"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          }
        }))
      });
    }

    // Schema Review
    if (reviews && reviews.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Fun Event",
        "review": reviews.map(review => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating,
            "bestRating": "5"
          },
          "reviewBody": review.reviewBody,
          "datePublished": review.datePublished || new Date().toISOString().split('T')[0]
        }))
      });
    }

    // Ajouter les données structurées personnalisées
    if (structuredData) {
      schemas.push(structuredData);
    }

    // Supprimer les anciens scripts de données structurées dynamiques
    document.querySelectorAll('script[data-seo-dynamic="true"]').forEach(el => el.remove());

    // Ajouter les nouveaux scripts
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-dynamic', 'true');
      script.setAttribute('id', `seo-schema-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      document.querySelectorAll('script[data-seo-dynamic="true"]').forEach(el => el.remove());
    };

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, structuredData, pageType, breadcrumbs, faqItems, products, reviews, localBusiness]);

  return null;
};

export default SEOHead;
