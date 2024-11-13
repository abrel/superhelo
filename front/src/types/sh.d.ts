const { Roles, Genders, MaritalStatuses } = require('@@/constants/user');
const { DocumentTypes } = require('@@constants/document');

declare namespace SH {
  export type SigninInput = {
    email: string;
    password: string;
  };

  export type SigninResult = {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  };

  export type Contact = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
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
}
