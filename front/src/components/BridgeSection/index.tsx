import React, { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  useGetUserBridgeAccountsQuery,
  useCreateBridgeConnectionUrlMutation,
  useUpdateBridgeConnectionUrlMutation,
  useDeleteBridgeItemMutation,
} from '@@/services/bridge';
import { IoWarningOutline } from 'react-icons/io5';
import AccountCard from '@@/components/Cards/AccountCard';
import Status from '@@/components/BridgeSection/Status';
import StatusBadge from '@@/components/BridgeSection/StatusBadge';
import { LuRefreshCcw, LuDelete } from 'react-icons/lu';

const BridgeSection: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: items } = useGetUserBridgeAccountsQuery(userId, {
    skip: !userId,
  });

  const [registerAccount] = useCreateBridgeConnectionUrlMutation();
  const [updateAccount] = useUpdateBridgeConnectionUrlMutation();
  const [deleteAccount, { isSuccess }] = useDeleteBridgeItemMutation();

  const onRegisterAccount = useCallback(() => {
    if (userId) {
      registerAccount(userId);
    }
  }, [registerAccount, userId]);

  const onUpdateItem = useCallback(
    (itemId: number) => {
      if (userId) {
        updateAccount({ userId, itemId });
      }
    },
    [updateAccount, userId],
  );

  const onDeleteItem = useCallback(
    (itemId: number) => {
      if (userId) {
        confirm('Voulez-vous vraiment supprimer ce compte ?') &&
          deleteAccount({ userId, itemId });
      }
    },
    [deleteAccount, userId],
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(`La connexion a la banque a bien été annulée`, {
        position: 'top-right',
      });
    }
  }, [isSuccess]);

  return (
    <div className="mt-4">
      <button
        className="bg-sky-600 rounded-lg py-2 px-3 hover:bg-sky-700 flex ml-auto mb-2"
        onClick={onRegisterAccount}
      >
        <span className="text-white ml-1">+ Nouveau compte</span>
      </button>

      {!items?.length && (
        <p className="font-main text-main flex flex-row items-center justify-center">
          <IoWarningOutline size={24} />
          <span className="mx-1">Aucun compte connecté</span>
          <IoWarningOutline size={24} />
        </p>
      )}

      {!!items?.length &&
        items.map((item) => {
          return (
            <div key={item.id} className="mb-6">
              <div className="flex flex-row items-center mb-2">
                <StatusBadge item={item} />
                <img
                  src={item.provider_logo}
                  alt="logo"
                  className="w-fit h-12"
                />
                <p className="underline text-lg semibold ml-1">
                  {item.provider_name}
                </p>
                <button onClick={() => onUpdateItem(item.id)}>
                  <LuRefreshCcw size={20} className="ml-4" />
                </button>

                <button onClick={() => onDeleteItem(item.id)}>
                  <LuDelete size={24} className="ml-4 text-red-500" />
                </button>
              </div>
              <Status item={item} />
              <div className="flex flex-row flex-wrap">
                {item.accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BridgeSection;
