import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row px-4 sm:px-8 py-4 mb-8 justify-between items-center">
      <Link
        to="https://www.superhelo.fr"
        className=""
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src="/logo_blackyellow.svg" className="h-8 sm:h-12" />
      </Link>

      <div className="flex flex-row items-center space-x-2 sm:space-x-8 md:space-x-12">
        <Link
          className="text-xs sm:text-lg font-semibold underline"
          to="https://www.superhelo.fr/professionnel"
          rel="noopener noreferrer"
          target="_blank"
        >
          Professionels
        </Link>

        <Link
          className="text-xs sm:text-lg font-semibold underline"
          to="https://www.superhelo.fr/familles"
          rel="noopener noreferrer"
          target="_blank"
        >
          Famille
        </Link>

        <Link
          className="text-xs sm:text-lg font-semibold underline"
          to="https://www.superhelo.fr/tarifs"
          rel="noopener noreferrer"
          target="_blank"
        >
          Tarif
        </Link>
      </div>

      <div>
        <Link
          className="text-xs sm:text-lg font-semibold underline"
          to="/signin"
        >
          Me connecter
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
