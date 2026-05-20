import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/header/Index';
import Footer from '@/components/layout/footer/Footer';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  FuncionalidadesSection,
  BeneficiosSection,
  SobreSection,
  CTASection,
  ComoFuncionaSection,
} from './components';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCriarConta = () => navigate('/CreateAccount');
  const handleJaTenhoConta = () => navigate('/login');

  const handleSubmitEmail = (data: { email: string }) => {
    localStorage.setItem('emailInputHome', data.email);
    navigate('/CreateAccount');
  };

  return (
    <div className="flex flex-col">
      <Header />
      <main className="pt-20 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <HeroSection onSubmitEmail={handleSubmitEmail} />
        <StatsSection />
        <FeaturesSection />
        <FuncionalidadesSection />
        <BeneficiosSection onCriarConta={handleCriarConta} />
        <SobreSection />
        <CTASection onCriarConta={handleCriarConta} onJaTenhoConta={handleJaTenhoConta} />
        <ComoFuncionaSection />
      </main>
      <Footer fit={true} />
    </div>
  );
}