import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurantes from './paginas/Admistracao/Restaurantes/AdmnistracaoRestaurantes';
import FormularioRestaurante from './paginas/Admistracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default App;
