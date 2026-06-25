import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home/Home';
import { CadastroLivro } from './pages/CadastroLivro/CadastroLivro';
import { CadastroClientes } from './pages/CadastroClientes/CadastroClientes';
import { Vendas } from './pages/Vendas/Vendas';

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-livro" element={<CadastroLivro />} />
          <Route path="/cadastro-cliente" element={<CadastroClientes />} />
          <Route path="/vendas" element={<Vendas />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
