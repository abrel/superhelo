import Mailjet, { Client } from 'node-mailjet';

class MailjetManager {
  mailjet: Client;

  version: string;

  templateIds: Record<string, number>;

  constructor() {
    this.mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE,
      {
        config: {},
        options: {},
      },
    );
    this.version = 'v3.1';
    this.templateIds = {};
  }

  getTemplates = () => this.mailjet.get('template').request();

  sendEmail = ({
    From,
    To,
    Subject,
    HTMLPart,
    TemplateID,
    Data,
    Variables,
    Attachments,
  }: {
    From: SH.EmailRecipient;
    To: SH.EmailRecipient[];
    Subject: string;
    HTMLPart?: string;
    TemplateID?: number;
    Data?: Record<string, string>;
    Variables?: Record<string, string>;
    Attachments?: {
      ContentType: string;
      Filename: string;
      Base64Content: string;
    }[];
  }) => {
    if (process.env.ENV !== 'production') {
      return Promise.resolve();
    }

    return this.mailjet.post('send', { version: this.version }).request({
      Messages: [
        {
          From,
          To,
          Subject,
          HTMLPart,
          TemplateID,
          TemplateLanguage: !!TemplateID,
          Data,
          Variables,
          Attachments,
        },
      ],
    });
  };
}

export default new MailjetManager();
