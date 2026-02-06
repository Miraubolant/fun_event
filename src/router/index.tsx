import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { cityLoader, departmentLoader } from './loaders';

// Import lazy des composants pour code splitting
import { lazy } from 'react';

// Pages principales
const HomePage = lazy(() => import('../pages/HomePage'));
const Catalog = lazy(() => import('../components/Catalog'));
const Events = lazy(() => import('../components/Events'));
const FAQ = lazy(() => import('../components/FAQ'));
const Quote = lazy(() => import('../components/Quote'));
const Contact = lazy(() => import('../components/Contact'));
const LegalNotice = lazy(() => import('../components/LegalNotice'));
const PrivacyPolicy = lazy(() => import('../components/PrivacyPolicy'));
const AdminPanel = lazy(() => import('../components/AdminPanel'));

// Pages SEO
const LocalSEOPage = lazy(() => import('../components/LocalSEOPage'));
const CityPage = lazy(() => import('../components/CityPage'));
const StructurePage = lazy(() => import('../components/StructurePage'));

// Blog
const Blog = lazy(() => import('../components/Blog'));
const BlogArticle = lazy(() => import('../components/BlogArticle'));

// Pages événements
const EventTypePage = lazy(() => import('../components/EventTypePage'));

// Page 404
const NotFound = lazy(() => import('../pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Page d'accueil
      {
        index: true,
        element: <HomePage />,
      },

      // Pages principales
      {
        path: 'catalogue',
        element: <Catalog />,
      },
      {
        path: 'galerie',
        element: <Events />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'devis',
        element: <Quote />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },

      // Pages légales
      {
        path: 'mentions-legales',
        element: <LegalNotice />,
      },
      {
        path: 'politique-confidentialite',
        element: <PrivacyPolicy />,
      },

      // Admin
      {
        path: 'admin',
        element: <AdminPanel />,
      },

      // Blog
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:slug',
        element: <BlogArticle />,
      },

      // Pages départements (8 routes dynamiques)
      {
        path: 'location/:departmentSlug',
        element: <LocalSEOPage />,
        loader: departmentLoader,
      },

      // Pages villes (683 routes dynamiques)
      {
        path: 'location/:departmentSlug/:citySlug',
        element: <CityPage />,
        loader: cityLoader,
      },

      // Pages structures
      {
        path: 'structure/:structureSlug',
        element: <StructurePage />,
      },

      // Pages événements
      {
        path: 'evenement/:eventType',
        element: <EventTypePage />,
      },

      // Page 404
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
