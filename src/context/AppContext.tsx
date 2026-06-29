import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Book } from '../types/book.types';
import type { Customer } from '../types/customer.types';

interface AppContextProps {
  books: Book[];
  customers: Customer[];
  salesCount: number;
  rentalsCount: number;
  addBook: (book: Omit<Book, 'id'>) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    nome: 'Blue Lock - Vol 1',
    autor: 'Muneyuki Kaneshiro',
    editora: 'Panini',
    ano: 2022,
    assunto: 'Mangá',
    quantidade: 67,
    finalidade: 'venda',
    origem: 'nacional',
    precoVenda: 39.90,
    precoAluguel: 12.00,
    precoRenovacao: 0
  },
  {
    id: '2',
    nome: 'Jujutsu Kaisen 0',
    autor: 'Gege Akutami',
    editora: 'Panini',
    ano: 2021,
    assunto: 'Mangá',
    quantidade: 69,
    finalidade: 'ambos',
    origem: 'nacional',
    precoVenda: 34.90,
    precoAluguel: 8.00,
    precoRenovacao: 4.00
  },
  {
    id: '3',
    nome: '1984',
    autor: 'George Orwell',
    editora: 'Companhia das Letras',
    ano: 1949,
    assunto: 'Política',
    quantidade: 24,
    finalidade: 'aluguel',
    origem: 'nacional',
    precoVenda: 45.00,
    precoAluguel: 12.00,
    precoRenovacao: 6.00
  },
  {
    id: '4',
    nome: 'Ação Humana',
    autor: 'Ludwig von Mises',
    editora: 'LVM Editora',
    ano: 1949,
    assunto: 'Política',
    quantidade: 42,
    finalidade: 'venda',
    origem: 'importado',
    precoVenda: 69.90,
    precoAluguel: 25.00,
    precoRenovacao: 0
  },
  {
    id: '5',
    nome: 'O que o governo fez com o nosso dinheiro?',
    autor: 'Murray Rothbard',
    editora: 'LVM Editora',
    ano: 1963,
    assunto: 'Política',
    quantidade: 15,
    finalidade: 'ambos',
    origem: 'nacional',
    precoVenda: 65.00,
    precoAluguel: 15.00,
    precoRenovacao: 5.00
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const stored = localStorage.getItem('@booknet:books');
    return stored ? JSON.parse(stored) : INITIAL_BOOKS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const stored = localStorage.getItem('@booknet:customers');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('@booknet:books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('@booknet:customers', JSON.stringify(customers));
  }, [customers]);

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
    };
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const salesCount = 56 + books.filter(b => b.finalidade === 'venda').length - INITIAL_BOOKS.filter(b => b.finalidade === 'venda').length;
  const rentalsCount = 49 + books.filter(b => b.finalidade === 'aluguel').length - INITIAL_BOOKS.filter(b => b.finalidade === 'aluguel').length;

  return (
    <AppContext.Provider
      value={{
        books,
        customers,
        salesCount,
        rentalsCount,
        addBook,
        addCustomer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
