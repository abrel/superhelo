import React from 'react';
import { Link } from 'react-router-dom';

const Fallback: React.FC = () => {
  return (
    <div className="font-main text-main flex flex-col justify-center h-screen max-w-lg mx-auto text-center">
      <img src="/logo.svg" alt="Error" className="h-22 mx-auto mb-8" />
      <h1 className="mb-8 text-2xl">Oups ! Quelque chose s'est mal passé...</h1>
      <p className="mb-4">
        Nous sommes désolés pour le désagrément. L'erreur a été enregistrée et
        notre équipe technique est déjà sur le coup pour la résoudre.
      </p>
      <p>Merci de votre patience et de votre compréhension.</p>

      <Link
        to="/"
        reloadDocument
        className="p-3 bg-yellow-500 rounded-lg mt-10 w-fit mx-auto"
      >
        <span className="text-white">Retour à la page d'accueil</span>
      </Link>
    </div>
  );
};

export default Fallback;
