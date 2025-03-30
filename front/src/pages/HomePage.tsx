import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { useGetMeQuery } from '@@/services/user';

const HighlighedText: React.FC<{
  value: number;
  label: string;
  to: string;
}> = ({ value, label, to }) => {
  return (
    <Link className="text-center font-bold" to={to}>
      <h2 className="text-yellow-500 text-4xl">{value}</h2>
      <p className="text-xl">{label}</p>
    </Link>
  );
};

const HomePage: React.FC = () => {
  const { data: me } = useGetMeQuery();
  return (
    <div className="m-8">
      <h1 className="text-xl font-bold">Bonjour {me?.firstName} !</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <HighlighedText value={50} label="Mesures actives" to="/wards" />
        <HighlighedText value={11} label="Notifications" to="#" />
        <HighlighedText value={8} label="Actions à réaliser" to="#" />
        <HighlighedText value={12} label="Messages non lus" to="#" />
      </div>

      <div className="mt-12 p-4 border border-violet-200 bg-violet-50 w-full flex flex-col justify-between">
        <div>
          <p className="font-bold text-xl mb-2">
            Actions à réaliser et notifications
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              className="flex justify-between items-center bg-white p-4"
              to="#"
            >
              <p>Lorem Ipsum</p>
              <p>Réaliser inventaire</p>
              <LuArrowRight className="w-12" />
            </Link>
            <Link
              className="flex justify-between items-center bg-white p-4"
              to="#"
            >
              <p>Alexandre BREL</p>
              <p>Justificatif(s) manquant(s)</p>
              <LuArrowRight className="w-12" />
            </Link>
            <Link
              className="flex justify-between items-center bg-white p-4"
              to="#"
            >
              <p>Augustin Chatenet</p>
              <p>Facture(s) en attente de réglement</p>
              <LuArrowRight className="w-12" />
            </Link>
          </div>
        </div>
        <Link className="mt-4 text-center text-sm underline" to="#">
          Voir plus
        </Link>
      </div>

      <div className="mt-12 p-4 border border-violet-200 bg-violet-50 w-full">
        <p className="font-bold text-xl mb-2">Comment puis-je vous aider ?</p>
        <div className="p-4 grid grid-cols-3 gap-4">
          <Link to="/conversations" className="bg-white p-2">
            Rédige un courier
          </Link>
          <Link to="/conversations" className="bg-white p-2">
            Contacter le juge
          </Link>
          <Link to="/conversations" className="bg-white p-2">
            Générer le rapport de gestion
          </Link>
          <Link to="/conversations" className="bg-white p-2">
            Réaliser un inventaire
          </Link>
          <Link to="/conversations" className="bg-white p-2">
            Rechercher dans le compte
          </Link>
          <Link to="/conversations" className="bg-white p-2">
            Savoir comment...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
