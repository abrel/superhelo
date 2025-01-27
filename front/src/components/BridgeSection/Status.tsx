import React from 'react';

const Status: React.FC<{ item: SH.BridgeItem }> = ({ item }) => {
  switch (item.status_code_info) {
    case 'ok':
      return null;
    case 'sca_required_webview':
      return (
        <p className="bg-red-100 text-red-700 p-2 rounded-lg">
          Votre banque vous demande de renouveler la synchronisation de votre
          compte afin de confirmer votre identité.
        </p>
      );
    case 'kyc_to_fill':
      return (
        <p className="bg-red-100 text-red-700 p-2 rounded-lg w-fit mb-4">
          Votre banque vous demande de remplir votre formulaire d'informations
          personnelles sur son site web ou son application mobile.
        </p>
      );
    case 'otp_failed':
      return (
        <p className="bg-red-100 text-red-700 p-2 rounded-lg w-fit mb-4">
          L'authentification forte du client a échoué en raison d'une erreur
          technique. Veuillez réessayer.
        </p>
      );

    default:
      return <p>{item.status_code_description}</p>;
  }
};

export default Status;
