import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

import bluelockImg from '../../assets/bluelock-manga.webp';
import jjkImg from '../../assets/jjk-manga.jpg';
import rothbardImg from '../../assets/rothbard-livro.jpg';
import orwellImg from '../../assets/george-orwell-livro.jpg';
import misesImg from '../../assets/human-action-mises.jpg';

export const Home: React.FC = () => {
  const featuredBooks = [
    { src: bluelockImg, alt: 'Blue Lock Manga' },
    { src: jjkImg, alt: 'Jujutsu Kaisen Manga' },
    { src: rothbardImg, alt: 'Rothbard Livro' },
    { src: orwellImg, alt: 'George Orwell Livro' },
    { src: misesImg, alt: 'Human Action Mises' },
  ];

  return (
    <>
      <Header title="Book.net" />

      <div className="p-[15px] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          <Link to="/vendas" className="menu-card menu-card-vendas">
            <div className="icon-box">🤝</div>
            <span className="pl-[15px] uppercase text-[0.9rem]">Vendas / Aluguéis</span>
          </Link>
          <Link to="/cadastro-livro" className="menu-card menu-card-livro">
            <div className="icon-box">➕</div>
            <span className="pl-[15px] uppercase text-[0.9rem]">Novo Livro</span>
          </Link>
          <Link to="/cadastro-cliente" className="menu-card menu-card-clientes">
            <div className="icon-box">👥</div>
            <span className="pl-[15px] uppercase text-[0.9rem]">Cadastro de Clientes</span>
          </Link>
        </div>

        <div className="mt-5">
          <h1 className="p-5 mt-[30px] bg-primary text-white rounded-lg text-center text-[1.25rem]">
            Livros em Destaque
          </h1>
          <div className="grid grid-cols-2 gap-2.5 mt-5 max-[350px]:grid-cols-1 xs:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] xs:gap-5 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
            {featuredBooks.map((book, index) => (
              <img
                key={index}
                className="book-img"
                src={book.src}
                alt={book.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
