import DOMPurify from 'dompurify';
import { marked, Tokens } from 'marked';

const customRenderer = {
  heading(token: Tokens.Heading): string {
    let classes = '';
    switch (token.depth) {
      case 1:
        classes = 'text-2xl font-bold mt-4 mb-2';
        break;
      case 2:
        classes = 'text-xl font-bold mt-4 mb-2';
        break;
      case 3:
        classes = 'text-lg font-bold mt-4 mb-2';
        break;
      default:
        classes = 'text-base font-bold mt-4 mb-2';
    }

    return `<h${token.depth} class="${classes}">${token.text.replace(
      /\*/g,
      '',
    )}</h${token.depth}>`;
  },
  hr(_token: Tokens.Hr): string {
    return `<hr class="my-4 border-gray-300" />`;
  },
  link(token: Tokens.Link): string {
    const title = token.title ? ` title="${token.title}"` : '';
    return `<a href="${token.href}"${title} class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">${token.text}</a>`;
  },
  checkbox(token: Tokens.Checkbox): string {
    return `<input type="checkbox" disabled ${
      token.checked ? 'checked' : ''
    } class="mr-2" />`;
  },
  list(token: Tokens.List): string {
    const tag = token.ordered ? 'ol' : 'ul';
    const classes = token.ordered ? 'list-decimal ml-4' : 'list-disc ml-4';
    const body = token.items
      .map((item: Tokens.ListItem) => customRenderer.listitem(item))
      .join('');
    return `<${tag} class="${classes}">${body}</${tag}>`;
  },
  listitem(token: Tokens.ListItem): string {
    let checkboxHTML = '';
    if (token.checked !== undefined) {
      checkboxHTML = customRenderer.checkbox({
        checked: token.checked,
      } as Tokens.Checkbox);
    }
    return `<li class="ml-4">${checkboxHTML}${marked.parseInline(
      token.text,
    )}</li>`;
  },
};

marked.use({
  renderer: customRenderer,
  breaks: true,
  gfm: true,
  hooks: {
    postprocess: (html: string) =>
      DOMPurify.sanitize(
        html.replace(/\n+$/, '').replace(/\n+/g, '<p class="my-4" />'),
      ),
  },
});

export const formatMessageText = (message: string): string =>
  String(
    marked(message.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]+/, '')),
  );

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
