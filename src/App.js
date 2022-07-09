import './App.css';
import CrearOferta from './OfertasLaborales/CrearOferta';
import MostrarOfertas from './OfertasLaborales/MostrarOfertas';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home/Home.js'
import Header from './Header/Header.js'
function App() {
  return (
  
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/verOfertas' element={<MostrarOfertas/>} />
      <Route path='/crearOferta' element={<CrearOferta/>} />
      <Route path='/' element={<Home/>} />
    </Routes>
  </BrowserRouter>



  );
}

export default App;
