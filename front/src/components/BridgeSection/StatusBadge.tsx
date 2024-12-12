import React from 'react';

const StatusBadge: React.FC<{ item: SH.BridgeItem }> = ({ item }) => {
  switch (item.status_code_info) {
    case 'ok':
      return (
        <span className="bg-green-500 text-white rounded-lg py-1 px-2">
          Connecté
        </span>
      );

    default:
      return (
        <span className="bg-red-500 text-white rounded-lg py-1 px-2">
          Erreur
        </span>
      );
  }
};

export default StatusBadge;
