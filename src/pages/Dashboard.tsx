import InfoCards from '@/components/DashboardComponents/InfoCards';
import { useEntrada } from '@/hooks/useEntrada';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const { setEntrada, handleSubmit, isLoading, entrada } = useEntrada();

  return (
    <main className="w-full mt-10 px-[5%]">
      <InfoCards entrada={entrada} handleSubmit={handleSubmit} isLoading={isLoading} setEntrada={setEntrada}/>
      <ToastContainer />
    </main>
  );
};

export default Dashboard;
