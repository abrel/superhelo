import React from 'react';

const Status: React.FC<{ item: SH.BridgeItem }> = ({ item }) => {
  switch (item.status_code_info) {
    case 'ok':
      return null;
    case 'sca_required_webview':
      return (
        <p>
          Votre banque vous demande de renouveler la synchronisation de votre
          compte afin de confirmer votre identité.
        </p>
      );
    default:
      return <p>{item.status_code_description}</p>;
  }
};

export default Status;
