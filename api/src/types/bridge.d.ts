const { Types } = require('mongoose');

declare namespace Bridge {
  export type User = {
    _id: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;
    uuid: string;
    accessToken: string;
    accessTokenExpiresAt: Date;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<User>;
    __v?: number;
  };

  export type Category = {
    categoryId: number;
    categoryName: string;
    subcategoryId: number;
    subcategoryName: string;
  };

  export type Provider = {
    id: number;
    name: string;
    country_code: string;
    images: {
      logo: string;
    };
    group_name: string;
    capabilities: string[];
    payment_metadata: {
      release_status: string;
      nb_max_transactions: number;
      max_size_label: number;
      multiple_dates_payments: boolean;
      sender_iban_available: boolean;
      provider_environments: string[];
      execution_status_available: boolean;
    };
    aggregation_metadata: { release_status: string };
    health_status: {
      single_payment: { status: string };
      aggregation: { status: string };
    };
    tags: { segment: string[] };
  };

  export type Item = {
    id: number;
    status: number;
    status_code_info: string;
    status_code_description?: string;
    provider_id: number;
    account_types: string;
    last_successful_refresh: Date;
    last_try_refresh: Date;
    created_at: Date;

    // Custom fields
    accounts?: Account[];
    provider_name?: string;
    provider_logo?: string;
  };

  export type MongoItem = {
    _id: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;
    item_id: string;
    status: number;
    status_code_info: string;
    status_code_description?: string;
    provider_id: number;
    account_types: string;
    last_successful_refresh: Date;
    last_try_refresh: Date;
    created_at: Date;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<MongoItem>;
    toObject: () => MongoItem;
    __v?: number;

    // Custom fields
    accounts?: MongoAccount[];
    provider_name?: string;
    provider_logo?: string;
  };

  export type Loan = {
    next_payment_date: string;
    next_payment_amount: number;
    maturity_date: string;
    opening_date: string;
    interest_rate: number;
    borrowed_capital: number;
    repaid_capital: number;
    remaining_capital: number;
    total_estimated_interests: number;
  };

  export type Account = {
    id: number;
    name: string;
    balance: number;
    accounting_balance?: number;
    instant_balance?: number;
    updated_at: Date;
    last_refresh_status: string;
    type: string;
    currency_code: string;
    item_id: number;
    provider_id: number;
    data_access: string;
    pro: boolean;
    iban?: string;
    loan_details?: Loan;
  };

  export type MongoAccount = {
    _id: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;
    account_id: string;
    item_id: string;
    name: string;
    balance: number;
    accounting_balance?: number;
    instant_balance?: number;
    updated_at: Date;
    last_refresh_status: string;
    type: string;
    currency_code: string;
    provider_id: number;
    data_access: string;
    pro: boolean;
    iban?: string;
    loan_details?: Loan;
    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<MongoAccount>;
    toObject: () => MongoAccount;
    __v?: number;
  };

  export type Transaction = {
    id: number;
    clean_description: string;
    provider_description: string;
    amount: number;
    date: string;
    booking_date: string;
    transaction_date: string;
    value_date: string;
    updated_at: Date;
    currency_code: string;
    deleted: boolean;
    category_id: number;
    operation_type: string;
    account_id: number;
    future: boolean;
  };

  export type MongoTransaction = {
    _id: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;

    transaction_id: string;
    clean_description: string;
    provider_description: string;
    amount: number;
    date: string;
    booking_date?: string;
    transaction_date?: string;
    value_date?: string;
    updated_at: Date;
    currency_code: string;
    deleted: boolean;
    category_id: number;
    category_name?: string;
    subcategory_name?: string;
    operation_type?: string;
    account_id: string;
    future: boolean;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<MongoTransaction>;
    __v?: number;
  };

  export type Stock = {
    id: number;
    account_id: number;

    label: string;
    ticker: string;
    marketplace: string | null;
    isin: string;
    stock_key: string;
    current_price: number;
    currency_code: string;
    quantity: number;
    total_value: number;
    average_purchase_price: number;
    value_date: string;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
  };
}
