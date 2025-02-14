import DOMPurify from 'dompurify';

export const formatMessageText = (message: string): string => {
  return DOMPurify.sanitize(
    message
      .replace(/\*([^\*]+)\*/g, '<b>$1</b>')
      .replace(/_([^_]+)_/g, '<i>$1</i>')
      .replace(/~([^~]+)~/g, '<strike>$1</strike>')
      .replace(/```([^`]+)```/g, '<pre>$1</pre>')
      .replace(/\n/g, '<br />'),
  );
};

export const formatIban = (iban: string): string => {
  return iban.replace(/(.{4})/g, '$1 ').trim();
};

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
