import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { BsArrowLeft } from 'react-icons/bs';
import cx from 'classnames';
import { useRetrieveAccountTransactionsQuery } from '@@/services/bridge';
import { useGetUserQuery } from '@@/services/user';

import { formatCurrency } from '@@/utils/intl';

const AccountPage: React.FC = () => {
  const { wardId, accountId } = useParams<{
    wardId: string;
    accountId: string;
  }>();

  const { data: ward } = useGetUserQuery(wardId || '', {
    skip: !wardId,
  });

  const { data: transactions, isLoading } = useRetrieveAccountTransactionsQuery(
    { userId: wardId || '', accountId: accountId || '' },
    {
      skip: !wardId || !accountId,
    },
  );

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="p-4 w-full">
      <Link to={`/wards/${wardId}#finance`}>
        <BsArrowLeft size={20} className="mb-1" />
      </Link>
      <h2 className="text-slate-700 text-lg font-semibold">
        {ward?.firstName} {ward?.lastName}
      </h2>
      {!transactions?.length && (
        <p>Aucune transactions disponibles pour ce compte</p>
      )}
      {transactions?.map((transaction) => (
        <div
          key={transaction.id}
          className="flex flex-row items-center justify-between py-1 border-b border-gray-200 w-[900px] mx-auto"
        >
          <div className="flex flex-row items-center space-x-4 truncate">
            <span>{transaction.date}</span>
            <span className="max-w-[500px] truncate">
              {transaction.clean_description}
            </span>
            <span className="text-xs bg-purple-100 text-purpple-700 p-1 rounded-md">
              {transaction.category_name}
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-700 p-1 rounded-md">
              {transaction.subcategory_name}
            </span>
          </div>

          <span
            className={cx(
              'py-1 px-2 rounded-md',
              transaction.amount > 0
                ? 'text-green-700 bg-green-100'
                : 'text-red-700 bg-red-100',
            )}
          >
            {formatCurrency({
              value: transaction.amount,
              currency: transaction.currency_code,
              locale: 'fr-FR',
            })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AccountPage;
