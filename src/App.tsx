import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './components/layout/container/Container';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Container children={"tela dashboard"}/>} />
        <Route path='/financeiro' element={<Container children={"tela Financeiro"}/>} />
        <Route path='/setings' element={<Container children={"tela Setings"}/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
