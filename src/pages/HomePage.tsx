import HeroModern from '../components/HeroModern';
import HowItWorks from '../components/HowItWorks';
import ServicesSection from '../components/ServicesSection';
import DepartmentsSection from '../components/DepartmentsSection';
import StatsSection from '../components/StatsSection';
import TestimonialsModern from '../components/TestimonialsModern';
import CtaFinalModern from '../components/CtaFinalModern';

export default function HomePage() {
  return (
    <>
      <HeroModern />
      <HowItWorks />
      <ServicesSection />
      <DepartmentsSection />
      <StatsSection />
      <TestimonialsModern />
      <CtaFinalModern />
    </>
  );
}
