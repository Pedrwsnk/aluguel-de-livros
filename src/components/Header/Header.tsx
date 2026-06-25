import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  return (
    <header className="bg-white p-4 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex flex-col gap-2.5 items-center text-center sm:flex-row sm:justify-between sm:text-left">
      {showBackButton ? (
        <>
          <Link to="/" className="btn-back">
            Voltar
          </Link>
          <h2>{title}</h2>
        </>
      ) : (
        <h2>{title}</h2>
      )}
    </header>
  );
};
