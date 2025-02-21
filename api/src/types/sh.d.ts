const { Types } = require('mongoose');
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
    name: string;

    userId?: Types.ObjectId;
    conversationId?: string;
    createdBy?: Types.ObjectId;
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
}
