import axios, { AxiosInstance } from 'axios';
import Promise from 'bluebird';
import * as BridgeUserRepositoryy from '@@/services/mongo/repositories/BridgeUser';
import * as BridgeItemRepository from '@@/services/mongo/repositories/BridgeItem';
import * as BridgeAccountRepository from '@@/services/mongo/repositories/BridgeAccount';
import * as BridgeTransactionRepository from '@@/services/mongo/repositories/BridgeTransaction';
import * as UserRepository from '@@/services/mongo/repositories/User';
import categories from '@@/constants/categories';

class BridgeService {
  instance: AxiosInstance;
  aggregationInstance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.bridgeapi.io',
      headers: {
        'content-type': 'application/json',
        'Bridge-Version': '2025-01-15',
        'Client-Id': process.env.BRIDGE_CLIENT_ID,
        'Client-Secret': process.env.BRIDGE_CLIENT_SECRET,
      },
    });

    this.aggregationInstance = axios.create({
      baseURL: 'https://api.bridgeapi.io/v3/aggregation',
      headers: {
        'content-type': 'application/json',
        'Bridge-Version': '2025-01-15',
        'Client-Id': process.env.BRIDGE_CLIENT_ID,
        'Client-Secret': process.env.BRIDGE_CLIENT_SECRET,
      },
    });
  }

  listProviders = async () => {
    let providers: Bridge.Provider[] = [];
    let url = '/v3/providers';

    while (url) {
      const { data } = await this.instance({
        method: 'GET',
        url,
        params: {
          limit: 500,
          country_code: 'FR',
          capabilities: 'aggregation',
          aggregation_release_status: 'active',
        },
      });
      providers = providers.concat(data.resources);
      url = data.pagination.next_uri;
    }

    return providers;
  };

  listCategories = async () => {
    let categories: any[] = [];
    let url = '/categories';

    while (url) {
      const { data } = await this.aggregationInstance({
        method: 'GET',
        url,
      });
      categories = categories.concat(data.resources);
      url = data.pagination?.next_uri;
    }

    return categories;
  };

  createUser = async (externalUserId: string) => {
    const { data } = await this.aggregationInstance({
      method: 'POST',
      url: '/users',
      data: {
        external_user_id: externalUserId,
      },
    });

    return data;
  };

  authenticateUser = async (externalUserId: string) => {
    const { data } = await this.aggregationInstance({
      method: 'POST',
      url: '/authorization/token',
      data: {
        external_user_id: externalUserId,
      },
    });

    return data;
  };

  // logged routes
  findOrCreateToken = async (userId: string) => {
    const account = await BridgeUserRepositoryy.findBridgeUserByUserId(userId);

    if (!account) {
      try {
        await this.createUser(userId);
      } catch (e) {
        // account may already exist
      }

      const token = await this.authenticateUser(userId);

      await BridgeUserRepositoryy.createBridgeUser({
        userId,
        uuid: token.user.uuid,
        accessToken: token.access_token,
        accessTokenExpiresAt: token.expires_at,
      });

      return token.access_token;
    }

    if (
      account.accessTokenExpiresAt &&
      new Date(account.accessTokenExpiresAt) > new Date()
    ) {
      return account.accessToken;
    }

    const token = await this.authenticateUser(userId);

    await BridgeUserRepositoryy.updateBridgeUserById(account._id, {
      accessToken: token.access_token,
      accessTokenExpiresAt: token.expires_at,
    });

    return token.access_token;
  };

  generateConnectUrl = async (userId: string) => {
    const [token, user] = await Promise.all([
      this.findOrCreateToken(userId),
      UserRepository.findUserById(userId),
    ]);

    const { data } = await this.aggregationInstance({
      method: 'POST',
      url: '/connect-sessions',
      data: {
        user_email: user.email,
        country_code: 'FR',
        account_types: 'all',
        callback_url: `https://app.superhelo.fr/wards/${userId}#finance`,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  manageConnectUrl = async ({
    userId,
    itemId,
  }: {
    userId: string;
    itemId: string;
  }) => {
    const [token, item] = await Promise.all([
      this.findOrCreateToken(userId),
      BridgeItemRepository.findBridgeItemById(itemId),
    ]);
    const { data } = await this.aggregationInstance({
      method: 'POST',
      url: '/connect-sessions',
      data: {
        item_id: Number(item.item_id),
        account_types: 'all',
        callback_url: `https://app.superhelo.fr/wards/${userId}#finance`,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  retrieveUserItems = async (userId: string) => {
    let resources: Bridge.Item[] = [];
    let url = '/items';
    const token = await this.findOrCreateToken(userId);

    while (url) {
      const { data } = await this.aggregationInstance({
        method: 'GET',
        url,
        params: {
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resources = resources.concat(data.resources);
      url = data.pagination.next_uri;
    }

    return resources;
  };

  deleteUserItem = async ({
    userId,
    itemId,
  }: {
    userId: string;
    itemId: string;
  }) => {
    const token = await this.findOrCreateToken(userId);
    const { data } = await this.aggregationInstance({
      method: 'DELETE',
      url: `/items/${itemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await Promise.all([
      BridgeItemRepository.deleteBridgeItemById(itemId),
      BridgeAccountRepository.deleteBridgeAccountByItemId(itemId),
    ]);

    return data;
  };

  retrieveAccountsInformation = async (userId: string) => {
    const token = await this.findOrCreateToken(userId);
    let resources: Bridge.Account[] = [];
    let url = '/accounts';

    while (url) {
      const { data } = await this.aggregationInstance({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resources = resources.concat(data.resources);
      url = data.pagination.next_uri;
    }

    return resources;
  };

  retrieveTransactions = async (
    userId: string,
    params: { since?: Date; limit?: number },
  ) => {
    let resources: Bridge.Transaction[] = [];
    let url = '/transactions';

    const token = await this.findOrCreateToken(userId);

    while (url) {
      const { data } = await this.aggregationInstance({
        method: 'GET',
        url,
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resources = resources.concat(data.resources);
      url = data.pagination.next_uri?.replace('/v3/aggregation', '');
    }

    return resources;
  };

  syncItemsForUserId = async (userId: string) => {
    const items = await this.retrieveUserItems(userId);

    await Promise.map(
      items,
      async ({ id, accounts, ...item }) => {
        return BridgeItemRepository.createOrUpdateBridgeItem({
          userId,
          item_id: String(id),
          ...item,
        });
      },
      { concurrency: 10 },
    );
  };

  syncAccountsForUserId = async (userId: string) => {
    const accounts = await this.retrieveAccountsInformation(userId);

    await Promise.map(
      accounts,
      async ({ id, item_id, ...account }) => {
        return BridgeAccountRepository.CreateOrUpdateBridgeAccount({
          userId,
          account_id: String(id),
          item_id: String(item_id),
          ...account,
        });
      },
      { concurrency: 10 },
    );
  };

  syncTransactionsForUserId = async (userId: string) => {
    const transactions = await this.retrieveTransactions(userId, {
      limit: 500,
    });

    await Promise.map(
      transactions,
      async ({ id, account_id, ...transaction }) => {
        const category = categories.find(
          (c) => c.subcategoryId === transaction.category_id,
        );
        return BridgeTransactionRepository.CreateOrUpdateBridgeTransaction({
          userId,
          transaction_id: String(id),
          account_id: String(account_id),
          category_name: category?.categoryName,
          subcategory_name: category?.subcategoryName,
          ...transaction,
        });
      },
      { concurrency: 10 },
    );
  };

  syncBridgeData = async () => {
    const users = await BridgeUserRepositoryy.findAllBridgeUsersBy({});
    for (const { userId } of users) {
      await this.syncItemsForUserId(userId);
      await this.syncAccountsForUserId(userId);
      await this.syncTransactionsForUserId(userId);
    }
  };

  retrieveStocks = async ({
    userId,
    accountId,
  }: {
    userId: string;
    accountId: number;
  }) => {
    let resources: Bridge.Stock[] = [];
    let url = '/stocks';

    const token = await this.findOrCreateToken(userId);

    while (url) {
      const { data } = await this.aggregationInstance({
        method: 'GET',
        url,
        params: {
          account_id: accountId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resources = resources.concat(data.resources);
      url = data.pagination.next_uri;
    }

    return resources;
  };

  initiateTransfer = async (userId: string) => {
    const token = await this.findOrCreateToken(userId);
    const { data } = await this.aggregationInstance({
      method: 'POST',
      url: '/pay/transfer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        beneficiary: {
          name: 'Test Name',
          iban: 'FR3130003000709222579823U36',
        },
        amount: 1500.59,
        editable_amount: false,
        label: 'Label example',
        sender_account_id: 123456789,
        sender_account_editable: false,
        client_reference: 'reference-test-1234',
      },
    });

    return data;
  };
}

export default new BridgeService();
