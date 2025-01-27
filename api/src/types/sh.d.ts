const { Roles, Genders, MaritalStatuses } = require('@@/constants/user');
const { DocumentTypes } = require('@@constants/document');
const { MeasureTypes } = require('@@/constants/measure');

declare namespace SH {
  export type JWTData = {
    id: string;
    email: string;
    role: Roles;
  };

  export type EmailRecipient = {
    Email: string;
    Name: string;
  };

  export type Court = {
    name: string;
    service: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    phone: string;
    fax: string;
  };

  export type Attendee = {
    name: string;
    role: string;
  };

  export type Judgment = {
    date: Date;
    court: Court;
    attendees: Attendee[];
  };

  export type Measure = {
    type: MeasureTypes;
    motive: string;
    startDate: Date;
    endDate?: Date;
    judgment: Judgment;
    documentIds?: Types.ObjectId[];
  };

  export type Deduction = {
    value: number;
    label: string;
  };

  export type RealEstateProperty = {
    address?: string;
    city?: string;
    postcode?: string;
    country?: string;

    value?: number;
    floorArea?: number;
    landArea?: number;
    purchaseDate?: Date;
    saleDate?: Date;
    deductions: Deduction[];

    documentIds?: Types.ObjectId[];
  };

  export type PersonalProperty = {
    label: string;
    value: number;
    documentIds?: Types.ObjectId[];
  };

  export type ScheduleItem = {
    date: Date;
    amortization: number;
    interest: number;
  };

  export type Debt = {
    label: string;
    amount: number;
    schedule: ScheduleItem[];
    documentIds?: Types.ObjectId[];
  };

  export type Contact = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  export type PasswordItem = {
    label: string;
    username: string;
    value: string;
  };

  export type User = {
    _id: Types.ObjectId;
    id: string;
    email: string;
    role: Roles;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;

    photoDocumentId?: Types.ObjectId;
    signatureDocumentId?: Types.ObjectId;
    guardianId?: Types.ObjectId;

    gender?: Genders;
    email?: string;
    phone?: string;
    nationality?: string;
    address?: string;
    city?: string;
    postcode?: string;
    country?: string;
    birthDate?: Date;
    cityOfBirth?: string;
    nationalInsuranceNumber?: string;
    taxIndentificationNumber?: string;
    gir?: string;
    alone?: boolean;
    pets?: boolean;
    religion?: string;
    maritalStatus?: MaritalStatuses;
    children?: number;
    trustedContacts?: Contact[];
    measures?: Measure[];
    realEstateProperties?: RealEstateProperty[];
    personalProperties?: PersonalProperty[];
    debts?: Debt[];
    passwords?: PasswordItem[];

    isDeleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<User>;
    __v?: number;
  };

  export type Document = {
    _id: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;
    createdBy: Types.ObjectId;
    name: string;
    label?: string;

    key: string;
    mimetype: string;
    isPrivate: boolean;
    type: DocumentTypes;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<Document>;
    __v?: number;
  };

  export type DocumentContent = {
    title: string;
    data?: string;
    b64Images?: string[];
  };

  export type BridgeUserAccount = {
    _id: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;
    uuid: string;
    accessToken: string;
    accessTokenExpiresAt: Date;

    createdAt?: Date;
    updatedAt?: Date;

    save: () => Promise<BridgeUserAccount>;
    __v?: number;
  };

  export type BridgeProvider = {
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

  export type BridgeAccount = {
    id: number;
    name: string;
    balance: number;
    accounting_balance: number;
    instant_balance: number;
    updated_at: Date;
    last_refresh_status: string;
    type: string;
    currency_code: string;
    item_id: number;
    provider_id: number;
    data_access: string;
    pro: boolean;
    iban: string;
  };

  export type BridgeItem = {
    id: number;
    status: number;
    status_code_info: string;
    status_code_description: string;
    provider_id: number;
    account_types: string;
    last_successful_refresh: Date;
    last_try_refresh: Date;
    created_at: Date;

    // Custom fields
    accounts?: BridgeAccount[];
    provider_name?: string;
    provider_logo?: string;
  };

  export type BridgeTransaction = {
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

  export type BridgeMongoTransaction = {
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

    save: () => Promise<BridgeMongoTransaction>;
    __v?: number;
  };

  export type BridgeStock = {
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
