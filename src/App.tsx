import { BrowserRouter} from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
