export enum AccountTypes {
  PEA = 'pea',
  BROKERAGE = 'brokerage',
  CHECKING = 'checking',
  LOAN = 'loan',
  SAVINGS = 'savings',
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
    default:
      return type;
  }
};

export const getAccountColor = (type: string): string => {
  switch (type) {
    case AccountTypes.CHECKING:
      return 'bg-amber-500';
    case AccountTypes.PEA:
      return 'bg-emerald-500';
    case AccountTypes.BROKERAGE:
      return 'bg-emerald-500';
    case AccountTypes.LOAN:
      return 'bg-red-500';
    default:
      return 'bg-green-500';
  }
};
