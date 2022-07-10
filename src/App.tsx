import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Admistracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Admistracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Admistracao/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/Admistracao/Restaurantes/AdmnistracaoRestaurantes';
import FormularioRestaurante from './paginas/Admistracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={< FormularioPrato />} />
        <Route path="pratos/:id" element={< FormularioPrato />} />
      </Route>


    </Routes>
  );
}

export default App;
