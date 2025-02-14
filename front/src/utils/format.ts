import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const formatMessageText = (message: string): string => {
  return DOMPurify.sanitize(
    String(
      marked(
        message
          .replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')
          .replace(/\n/g, '<br />'),
      ),
    ),
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
