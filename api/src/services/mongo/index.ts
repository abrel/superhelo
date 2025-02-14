import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import * as Sentry from '@sentry/node';
import UserSchema from '@@/services/mongo/schemas/User';
import DocumentSchema from '@@/services/mongo/schemas/Document';
import MessageSchema from '@@/services/mongo/schemas/Message';
import BridgeAccountSchema from '@@/services/mongo/schemas/BridgeAccount';
import BridgeTransactionSchema from '@@/services/mongo/schemas/BridgeTransaction';

class MongoManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  models: Record<string, any>;

  constructor() {
    this.models = {};
    this.initMongo();
  }

  connect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  initMongo = () => {
    const shDB = mongoose.connection.useDb('sh');
    this.models.User = shDB.model<SH.User>('User', UserSchema);
    this.models.Document = shDB.model<SH.Document>('Document', DocumentSchema);
    this.models.BridgeAccount = shDB.model<Bridge.UserAccount>(
      'BridgeAccount',
      BridgeAccountSchema,
    );
    this.models.BridgeTransaction = shDB.model<Bridge.MongoTransaction>(
      'BridgeTransaction',
      BridgeTransactionSchema,
    );
    this.models.Message = shDB.model<AI.Message>('Message', MessageSchema);

    mongoose.connection.on('error', (e: Error) => {
      Sentry.captureException(e);
    });
    mongoose.connection.on('disconnected', this.connect);

    this.connect();
  };

  healthCheck = () => mongoose.connection.readyState === 1;

  getModels = () => this.models;

  getClient = () => mongoose.connection.getClient() as unknown as MongoClient;
}

export default new MongoManager();
