import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import { translateAccountType, getAccountColor } from '@@/constants/bridge';
import { formatCurrency } from '@@/utils/intl';
import { formatIban } from '@@/utils/iban';

const AccountItemCard: React.FC<{
  account: SH.BridgeAccount;
}> = ({ account }) => {
  return (
    <div className="relative m-2 ml-0 mt-0 p-3 rounded-lg border w-fit">
      <div className="flex flex-row items-start justify-between border-b border-slate-200 pb-2">
        <div>
          <p className="text-lg">{account.name}</p>
          <p className="italic text-xs">
            Dernière mise à jour : {moment(account.updated_at).calendar()}
          </p>
        </div>

        <span
          className={cx(
            'text-white rounded-lg py-1 px-2 text-xs',
            getAccountColor(account.type),
          )}
        >
          {translateAccountType(account.type)}
        </span>
      </div>

      <div className="mt-2">
        <p className="text-sm">
          Solde:
          <span className="ml-1 font-semibold">
            {formatCurrency({
              value: account.balance,
              currency: account.currency_code,
              locale: 'fr-FR',
            })}
          </span>
        </p>
        {!!account.iban && (
          <p className="text-xs">IBAN: {formatIban(account.iban)}</p>
        )}
      </div>
    </div>
  );
};

export default AccountItemCard;
