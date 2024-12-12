export const formatIban = (iban: string): string => {
  return iban.replace(/(.{4})/g, '$1 ').trim();
};
