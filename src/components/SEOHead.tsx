import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Fun Event - Location Structures Gonflables Île-de-France | Châteaux Gonflables Paris",
  description = "Location de structures gonflables premium en Île-de-France. Châteaux gonflables, toboggans, jeux pour anniversaires, mariages, événements. Livraison gratuite Paris 75, 77, 78, 91, 92, 93, 94, 95.",
  keywords = "location structures gonflables, château gonflable Paris, location jeux gonflables Île-de-France, anniversaire enfant, événement festif, toboggan gonflable, animation enfant Paris",
  ogTitle,
  ogDescription,
  ogImage = "https://i.imgur.com/gfhDZfm.png",
  canonicalUrl = "https://funevent.fr/",
  structuredData
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
    
    // Open Graph
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);
    
    // Twitter
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Données structurées
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'dynamic-structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, structuredData]);

  return null;
};

export default SEOHead;