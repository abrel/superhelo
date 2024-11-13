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

  export type Measure = {
    type: MeasureTypes;
    startDate: Date;
    endDate?: Date;
    documentIds?: Types.ObjectId[];
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
    deductions: {
      value: number;
      label: string;
    }[];

    documentIds?: Types.ObjectId[];
  };
  export type PersonalProperty = {
    label: string;
    value: number;
    documentIds?: Types.ObjectId[];
  };
  export type Debt = {
    label: string;
    amount: number;
    schedule: {
      date: Date;
      amortization: number;
      interest: number;
    }[];
    documentIds?: Types.ObjectId[];
  };

  export type Contact = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
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

    // Mesures de protection
    measures?: Measure[];

    // Inventaire
    realEstateProperties?: RealEstateProperty[];
    personalProperties?: PersonalProperty[];
    debts?: Debt[];

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
}
