import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { useApp } from '../../context/AppContext';

export const Vendas: React.FC = () => {
  const { books, customers, salesCount, rentalsCount } = useApp();

  const formatPrice = (price?: number) => {
    if (price === undefined || price <= 0) return '-';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <>
      <Header title="Vendas, Aluguéis e Preços" showBackButton />

      <div className="flex flex-col gap-2.5 items-center m-5 sm:flex-row sm:justify-between">
        <h3 className="text-lg font-bold">Informações</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-[15px] p-[15px] xs:grid-cols-2 lg:grid-cols-3">
        <div className="text-white p-5 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05)] bg-success">
          <p className="font-bold text-[0.8rem] uppercase opacity-90">VENDAS</p>
          <h3 className="text-[1.75rem] mb-[5px] font-semibold">{salesCount}</h3>
        </div>
        <div className="text-white p-5 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05)] bg-primary">
          <p className="font-bold text-[0.8rem] uppercase opacity-90">ALUGUÉIS</p>
          <h3 className="text-[1.75rem] mb-[5px] font-semibold">{rentalsCount}</h3>
        </div>
        <div className="text-white p-5 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.05)] bg-[#6c757d]">
          <p className="font-bold text-[0.8rem] uppercase opacity-90">CLIENTES</p>
          <h3 className="text-[1.75rem] mb-[5px] font-semibold">{70 + customers.length}</h3>
        </div>
      </div>
          
      <div className="p-[15px] max-w-[1200px] mx-auto">
        <div className="content-box">
          <div className="content-header">
            <h3 className="text-lg font-bold">Catálogo</h3>
            <Link to="/cadastro-livro" className="btn btn-edit">Novo Livro</Link>
          </div>
          
          <div className="w-full overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor(a)</th>
                  <th>Preço Venda</th>
                  <th>Preço Aluguel</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.nome}</td>
                    <td>{book.autor}</td>
                    <td>{formatPrice(book.precoVenda)}</td>
                    <td>{formatPrice(book.precoAluguel)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
