export const formatCurrency = ({
  value,
  currency,
  locale,
}: {
  value: number;
  currency: string;
  locale: string;
}): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
