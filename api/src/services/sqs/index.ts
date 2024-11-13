import AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import * as Sentry from '@sentry/node';
import { sendResetPasswordEmail } from '@@/tasks/mail';

class SQSManager {
  sqs: AWS.SQS;

  queues: Record<
    string,
    {
      name: string;
      handler: (message: AWS.SQS.Message) => Promise<void>;
      url?: string;
    }
  >;

  deadletterQueue: {
    name: string;
    url?: string;
    arn?: string;
  };

  consumers: Record<string, Consumer>;

  constructor() {
    this.sqs = new AWS.SQS({
      endpoint: process.env.AWS_SQS_ENDPOINT,
    });

    this.queues = {
      sendResetPasswordEmail: {
        name: `sh-${process.env.ENV}-send-reset-password-email`,
        handler: async (message) => {
          if (message?.Body) {
            try {
              const { user } = JSON.parse(message.Body);
              await sendResetPasswordEmail(user);
            } catch (e) {
              Sentry.captureException(e);
              throw e;
            }
          }
        },
      },
    };

    this.deadletterQueue = {
      name: `sh-${process.env.ENV}-deadletter`,
    };
    this.consumers = {};

    this.setupSQS();
  }

  listQueues = () => this.sqs.listQueues().promise();

  getQueueUrl = async (queueName: string) =>
    (
      await this.sqs
        .getQueueUrl({
          QueueName: queueName,
        })
        .promise()
    ).QueueUrl;

  getQueueAttributes = async (queueUrl: string) =>
    this.sqs
      .getQueueAttributes({
        QueueUrl: queueUrl,
        AttributeNames: ['All'],
      })
      .promise();

  createQueue = async (
    queueName: string,
    attributes?: AWS.SQS.QueueAttributeMap,
  ) =>
    (
      await this.sqs
        .createQueue({
          QueueName: queueName,
          Attributes: attributes,
        })
        .promise()
    ).QueueUrl;

  setupSQS = async () => {
    try {
      this.deadletterQueue.url = await this.getQueueUrl(
        this.deadletterQueue.name,
      );
    } catch (e) {
      this.deadletterQueue.url = await this.createQueue(
        this.deadletterQueue.name,
        {},
      );
    }

    try {
      this.deadletterQueue.arn = (
        await this.getQueueAttributes(this.deadletterQueue.url as string)
      )?.Attributes?.QueueArn;
    } catch (e) {
      throw new Error('SQS deadletter queue initialisation failed');
    }

    for (const key of Object.keys(this.queues)) {
      const queueName = this.queues[key].name;
      try {
        this.queues[key].url = await this.getQueueUrl(queueName);
      } catch (e) {
        this.queues[key].url = await this.createQueue(queueName, {
          RedrivePolicy: JSON.stringify({
            deadLetterTargetArn: this.deadletterQueue.arn,
            maxReceiveCount: 10,
          }),
        });
      }

      this.consumers[key] = Consumer.create({
        queueUrl: this.queues[key].url,
        handleMessage: this.queues[key].handler,
      });

      this.consumers[key].on('error', (err: Error) => {
        Sentry.captureException(err);
      });
      this.consumers[key].on('processing_error', (err: Error) => {
        Sentry.captureException(err);
      });

      this.consumers[key].start();
    }
  };

  sendMessage = ({
    queue,
    messageBody,
  }: {
    queue:
      | 'createPlan'
      | 'createSuggestion'
      | 'updateMedicalRecord'
      | 'sendEventICS'
      | 'cancelEventICS'
      | 'updateEventICS'
      | 'sendResetPasswordEmail'
      | 'notifyPSForWSMessage'
      | 'sendWelcomeMessage'
      | 'extractTasks';
    messageBody: string;
  }) => {
    const { url } = this.queues[queue];
    if (!url) {
      throw new Error('Queue url is not set properly');
    }

    return this.sqs
      .sendMessage({
        MessageBody: messageBody,
        QueueUrl: url,
      })
      .promise();
  };
}

export default new SQSManager();
