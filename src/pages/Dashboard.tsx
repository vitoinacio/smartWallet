import InfoCards from '@/components/DashboardComponents/InfoCards';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  return (
    <main className="w-full mt-10 px-[5%]">
      <InfoCards />
      <ToastContainer />
    </main>
  );
};

export default Dashboard;
