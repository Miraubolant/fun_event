import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop /> {/* Force le scroll en haut à chaque navigation */}
      <Header />
      <Outlet /> {/* Ici seront rendues les pages enfants */}
      <Footer />
    </div>
  );
}
