export enum AccountTypes {
  PEA = 'pea',
  BROKERAGE = 'brokerage',
  CHECKING = 'checking',
  LOAN = 'loan',
  SAVINGS = 'savings',
  CARD = 'card',
  LIFE_INSURANCE = 'life_insurance',
}

export const translateAccountType = (type: string): string => {
  switch (type) {
    case AccountTypes.PEA:
      return 'PEA';
    case AccountTypes.BROKERAGE:
      return 'C. Titre';
    case AccountTypes.CHECKING:
      return 'C. Courant';
    case AccountTypes.LOAN:
      return 'Prêt';
    case AccountTypes.SAVINGS:
      return 'C. Epargne';
    case AccountTypes.CARD:
      return 'Carte';
    case AccountTypes.LIFE_INSURANCE:
      return 'Assurance Vie';
    default:
      return type;
  }
};

export const getAccountColor = (type: string): string => {
  switch (type) {
    case AccountTypes.CHECKING:
      return 'bg-amber-500';
    case AccountTypes.PEA:
    case AccountTypes.BROKERAGE:
      return 'bg-emerald-500';
    case AccountTypes.LOAN:
    case AccountTypes.CARD:
      return 'bg-red-500';
    case AccountTypes.SAVINGS:
    case AccountTypes.LIFE_INSURANCE:
    default:
      return 'bg-green-500';
  }
};
