import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant qui force le scroll en haut de la page à chaque changement de route
 * Utile pour éviter que l'utilisateur reste au milieu de la page après navigation
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantané en haut de la page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' pour un scroll immédiat, 'smooth' pour animé
    });
  }, [pathname]); // Se déclenche à chaque changement de route

  return null; // Ce composant ne rend rien visuellement
}
