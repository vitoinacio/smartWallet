import CadastroForm from '@/components/CadastroForm';
import { ToastContainer } from 'react-toastify';

const Cadastro = () => {
  return (
    <main>
      <div className=''>
        <CadastroForm />
      </div>
      <ToastContainer />
    </main>
  );
};

export default Cadastro;
