import axios, { AxiosInstance } from 'axios';

const token =
  '0599346a4c62a36a6798c44fe65189a1e3ac78fb-151420de-df75-4f53-8df0-539422c4c106';

class BridgeService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.bridgeapi.io/v2',
      headers: {
        'content-type': 'application/json',
        'Bridge-Version': '2021-06-01',
        'Client-Id': process.env.BRIDGE_CLIENT_ID,
        'Client-Secret': process.env.BRIDGE_CLIENT_SECRET,
      },
    });
  }

  createUser = async (externalUserId: string) => {
    const { data } = await this.axiosInstance({
      method: 'POST',
      url: '/users',
      data: {
        external_user_id: externalUserId,
      },
    });

    //{
    //  uuid: '85140a11-6847-4c81-8631-e133e202312b',
    //  external_user_id: '674753d29c754e8dd46244c8'
    //}

    return data;
  };

  authenticateUser = async (externalUserId: string) => {
    const { data } = await this.axiosInstance({
      method: 'POST',
      url: '/authenticate',
      data: {
        external_user_id: externalUserId,
      },
    });

    //{
    //  access_token: '0599346a4c62a36a6798c44fe65189a1e3ac78fb-151420de-df75-4f53-8df0-539422c4c106',
    //  expires_at: '2024-12-12T12:30:22.732Z',
    //  user: {
    //    uuid: '85140a11-6847-4c81-8631-e133e202312b',
    //    external_user_id: '674753d29c754e8dd46244c8'
    //  }
    //}

    return data;
  };

  generateConnectUrl = async () => {
    const { data } = await this.axiosInstance({
      method: 'POST',
      url: '/connect/items/add',
      data: {
        country: 'fr',
        prefill_email: 'alexander.brel+patient@gmail.com',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //{
    //  redirect_url: 'https://connect.bridgeapi.io/session/8d7e7420-96cc-4730-880c-f69c77a47b75'
    //}
    return data;
  };

  retrieveAuthenticatedUserItems = async () => {
    const { data } = await this.axiosInstance({
      method: 'GET',
      url: '/items',
      params: {
        limit: 100,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //{
    //  resources: [
    //    {
    //      id: 10248839,
    //      status: 0,
    //      status_code_info: 'OK',
    //      status_code_description: null,
    //      bank_id: 574
    //    }
    //  ],
    //  generated_at: '2024-12-12T11:02:27.338Z',
    //  pagination: { next_uri: null }
    //}
    return data;
  };

  retrieveTransactions = async () => {
    const { data } = await this.axiosInstance({
      method: 'GET',
      url: '/transactions/updated',
      params: {
        since: '2019-06-21T18:44:09.523Z',
        limit: 12,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    return data;
  };

  retrieveAccountsInformation = async () => {
    const { data } = await this.axiosInstance({
      method: 'GET',
      url: '/accounts-information',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.dir(data, { depth: undefined });

    /*
    resources: [
    {
      item_id: 10248839,
      first_name: 'MICHEL',
      last_name: 'DUPONT',
      accounts: [
        {
          id: 48678161,
          name: 'Compte Courant 1',
          type: 'checking',
          currency_code: 'EUR',
          bank_id: 574,
          iban: 'FR6914508000303386763591H62'
        },
        {
          id: 48678162,
          name: 'Compte Courant 2',
          type: 'checking',
          currency_code: 'EUR',
          bank_id: 574,
          iban: 'FR4117569000301446331456R06'
        },
        {
          id: 48678163,
          name: 'Compte Courant 3',
          type: 'checking',
          currency_code: 'EUR',
          bank_id: 574,
          iban: 'FR0530003000402916465922J55'
        },
        {
          id: 48678164,
          name: 'Pocket GBP',
          type: 'checking',
          currency_code: 'GBP',
          bank_id: 574,
          iban: 'GB77BARC20035391348945'
        }
      ]
    }
  ],
    */

    return data;
  };

  initiateTransfer = async () => {
    const { data } = await this.axiosInstance({
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

    console.log(data);

    return data;
  };
}

export default new BridgeService();
