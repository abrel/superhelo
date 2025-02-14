const { Roles, Genders, MaritalStatuses } = require('@@/constants/user');
const { DocumentTypes } = require('@@constants/document');

declare namespace SH {
  export type MultiSelectOption = { id: string; label: string };
  export type SigninInput = {
    email: string;
    password: string;
  };

  export type SigninResult = {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  };

  export type Court = {
    name?: string;
    service?: string;
    address?: string;
    postcode?: string;
    city?: string;
    country?: string;
    phone?: string;
    fax?: string;
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
    motive?: string;
    startDate: Date;
    endDate?: Date;
    judgment?: Judgment;
    documentIds?: string[];
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

    documentIds?: string[];
  };

  export type PersonalProperty = {
    label: string;
    value: number;
    documentIds?: stirng[];
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
    documentIds?: string[];
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
    _id: string;
    id: string;
    email: string;
    role: Roles;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;

    photoDocumentId?: string;
    signatureDocumentId?: string;
    guardianId?: string;

    gender?: Genders;
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
  };

  export type Document = {
    _id: string;
    id: string;
    userId: User;
    createdBy: User;
    name: string;
    label?: string;
    type?: DocumentTypes;
    key: string;
    mimetype: string;
    isPrivate: boolean;

    createdAt?: Date;
    updatedAt?: Date;
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
    account_types: string;
    provider_id: number;
    provider_name: string;
    provider_logo: string;
    last_successful_refresh: Date;
    last_try_refresh: Date;
    created_at: Date;
    accounts: SH.BridgeAccount[];
  };

  export type BridgeMongoTransaction = {
    _id: string;
    id: string;
    userId: string;

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
  };

  export type Message = {
    _id: string;
    id: string;
    messageId: string;
    conversationId: string;
    type: string;
    content: string;

    userId?: string;

    createdAt?: Date;
    updatedAt?: Date;
  };
}
