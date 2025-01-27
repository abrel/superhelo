import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import UserSchema from '@@/services/mongo/schemas/User';
import DocumentSchema from '@@/services/mongo/schemas/Document';
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
    this.models.BridgeAccount = shDB.model<SH.BridgeUserAccount>(
      'BridgeAccount',
      BridgeAccountSchema,
    );
    this.models.BridgeTransaction = shDB.model<SH.BridgeMongoTransaction>(
      'BridgeTransaction',
      BridgeTransactionSchema,
    );

    mongoose.connection.on('error', (e: Error) => {
      Sentry.captureException(e);
    });
    mongoose.connection.on('disconnected', this.connect);

    this.connect();
  };

  healthCheck = () => mongoose.connection.readyState === 1;

  getModels = () => this.models;
}

export default new MongoManager();
