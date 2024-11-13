/* eslint-disable @typescript-eslint/default-param-last */
class HttpError extends Error {
  messageText?: string;

  status: number;

  statusCode: number;

  details?: unknown[];

  constructor(
    message = 'Something bad happened',
    status = 500,
    details?: unknown[],
  ) {
    super(message);
    this.messageText = message;
    this.name = 'HttpError';
    this.stack = new Error().stack;
    this.status = status;
    this.statusCode = status;
    this.details = details;
  }
}

export default HttpError;
