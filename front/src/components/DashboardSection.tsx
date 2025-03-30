import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { useRetrieveFinancialMetricsQuery } from '@@/services/bridge';
import { formatCurrency } from '@@/utils/format';

const DashboardSection: React.FC<{ wardId: string }> = ({ wardId }) => {
  const { data: metrics } = useRetrieveFinancialMetricsQuery(wardId, {
    skip: !wardId,
  });

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-violet-200 bg-violet-50 w-full flex flex-col justify-between">
          <div>
            <p className="font-bold text-xl mb-2">Activité sur les comptes</p>
            <div className="bg-white p-4">
              <div className="mb-2 flex flex-row justify-between">
                <span>Solde des comptes</span>
                <span>
                  {metrics?.balance &&
                    formatCurrency({
                      value: metrics.balance,
                      currency: 'EUR',
                      locale: 'fr-FR',
                    })}
                </span>
              </div>
              <div className="mb-2 flex flex-row justify-between">
                <span>Revenus</span>
                <span>
                  {metrics?.income &&
                    formatCurrency({
                      value: metrics.income,
                      currency: 'EUR',
                      locale: 'fr-FR',
                    })}
                </span>
              </div>
              <div className="mb-2 flex flex-row justify-between">
                <span>Dépenses</span>
                <span>
                  {metrics?.expenses &&
                    formatCurrency({
                      value: metrics.expenses,
                      currency: 'EUR',
                      locale: 'fr-FR',
                    })}
                </span>
              </div>
            </div>
          </div>
          <Link className="mt-4 text-center text-sm underline" to="#finance">
            Voir plus
          </Link>
        </div>

        <div className="p-4 border border-violet-200 bg-violet-50 w-full flex flex-col justify-between">
          <div>
            <p className="font-bold text-xl mb-2">
              Actions à réaliser et notifications
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                className="flex justify-between items-center bg-white p-4"
                to="#info"
              >
                <p>Réaliser inventaire</p>
                <LuArrowRight className="w-12" />
              </Link>
              <Link
                className="flex justify-between items-center bg-white p-4"
                to="#info"
              >
                <p>Justificatif(s) manquant(s)</p>
                <LuArrowRight className="w-12" />
              </Link>
              <Link
                className="flex justify-between items-center bg-white p-4"
                to="#info"
              >
                <p>Facture(s) en attente de réglement</p>
                <LuArrowRight className="w-12" />
              </Link>
            </div>
          </div>
          <Link className="mt-4 text-center text-sm underline" to="#info">
            Voir plus
          </Link>
        </div>
      </div>

      <div className="p-4 border border-violet-200 bg-violet-50 w-full mt-8">
        <p className="font-bold text-xl mb-2">Comment puis-je vous aider ?</p>
        <div className="p-4 grid grid-cols-3 gap-4">
          <Link to={`/wards/${wardId}/conversations`} className="bg-white p-2">
            Rédige un courier
          </Link>
          <Link to={`/wards/${wardId}/conversations`} className="bg-white p-2">
            Contacter le juge
          </Link>
          <Link to={`/wards/${wardId}/conversations`} className="bg-white p-2">
            Générer le rapport de gestion
          </Link>
          <Link to={`/wards/${wardId}/conversations`} className="bg-white p-2">
            Réaliser un inventaire
          </Link>
          <Link to={`/wards/${wardId}/conversations`} className="bg-white p-2">
            Rechercher dans le compte
          </Link>
          <Link to={`/wards/${wardId}/conversations`} className="bg-white p-2">
            Savoir comment...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
