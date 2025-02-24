import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './components/layout/container/Container';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Financeiro from './pages/Financeiro';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Container children={<Dashboard/>}/>} />
        <Route path='/financeiro' element={<Container children={<Financeiro/>}/>} />
        <Route path='/settings' element={<Container children={<Settings/>}/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
