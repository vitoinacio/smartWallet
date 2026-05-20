import { AnimatePresence, motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../views/components/LoginForm';
import CadastroForm from '../views/components/CadastroForm';
import { RecuperarSenhaForm } from '../views/components/RecuperarSenhaForm';
import { AuthPainelBlue } from './components/AuthPainelBlue';
import { AuthFormContainer } from './components/AuthFormContainer';
import { useAuthPage } from '../viewModels/useAuthPage';
import {
  useAuthAnimation,
  authPageVariants,
} from '../viewModels/useAuthAnimation';

const authTransition: Transition = {
  duration: 0.34,
  ease: [0.25, 0.1, 0.25, 1],
};

function AuthContent() {
  const {
    isLogin,
    isCriar,
    isRecuperar,
    goToLogin,
    goToCriar,
    goToRecuperar,
  } = useAuthPage();

  const { animationKey, transitionConfig } = useAuthAnimation();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence
        mode="sync"
        initial={false}
        custom={transitionConfig}
      >
        {isLogin && (
          <motion.div
            key={animationKey}
            custom={transitionConfig}
            variants={authPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={authTransition}
            className="pointer-events-none absolute inset-0 flex min-h-screen w-full will-change-transform"
          >
            <div className="pointer-events-auto flex min-h-screen w-full">
              <AuthPainelBlue
                variant="login"
                onToggle={goToCriar}
                isAnimating={false}
              />

              <AuthFormContainer
                title="Bem-vindo de volta"
                subtitle="Entre com suas credenciais para continuar"
              >
                <LoginForm onEsqueceuSenha={goToRecuperar} />
              </AuthFormContainer>
            </div>
          </motion.div>
        )}

        {isCriar && (
          <motion.div
            key={animationKey}
            custom={transitionConfig}
            variants={authPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={authTransition}
            className="pointer-events-none absolute inset-0 flex min-h-screen w-full will-change-transform"
          >
            <div className="pointer-events-auto flex min-h-screen w-full">
              <AuthFormContainer
                title="Crie sua conta"
                subtitle="Preencha seus dados para começar"
              >
                <CadastroForm onVoltarLogin={goToLogin} />
              </AuthFormContainer>

              <AuthPainelBlue
                variant="cadastro"
                onToggle={goToLogin}
                isAnimating={false}
              />
            </div>
          </motion.div>
        )}

        {isRecuperar && (
          <motion.div
            key={animationKey}
            custom={transitionConfig}
            variants={authPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={authTransition}
            className="pointer-events-none absolute inset-0 flex min-h-screen w-full will-change-transform"
          >
            <div className="pointer-events-auto flex min-h-screen w-full">
              <AuthPainelBlue
                variant="recuperar"
                onToggle={goToLogin}
                isAnimating={false}
              />

              <AuthFormContainer
                title="Recuperar senha"
                subtitle="Informe seu e-mail para continuar"
              >
                <RecuperarSenhaForm />
              </AuthFormContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900">
      <AuthContent />
      <ToastContainer />
    </div>
  );
}