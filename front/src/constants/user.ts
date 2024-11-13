export enum Roles {
  ADMIN = 'admin',
  GUARDIAN = 'guardian',
  WARD = 'ward',
}

export enum Genders {
  M = 'male',
  F = 'female',
  O = 'other',
}

export const selectInputGenders = [
  {
    id: Genders.M,
    label: 'Homme',
  },
  {
    id: Genders.F,
    label: 'Femme',
  },
  {
    id: Genders.O,
    label: 'Autre',
  },
];

export enum MaritalStatuses {
  SINGLE = 'single',
  CIVIL_PARTNERSHIP = 'civil_partnership',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
  COHABITING = 'cohabiting',
}

export const selectInputMaritalStatuses = [
  {
    id: MaritalStatuses.SINGLE,
    label: 'Célibataire',
  },
  {
    id: MaritalStatuses.CIVIL_PARTNERSHIP,
    label: 'Pacsé(e)',
  },
  {
    id: MaritalStatuses.MARRIED,
    label: 'Marié(e)',
  },
  {
    id: MaritalStatuses.COHABITING,
    label: 'En concubinage',
  },
  {
    id: MaritalStatuses.DIVORCED,
    label: 'divorcé(e)',
  },
  {
    id: MaritalStatuses.WIDOWED,
    label: 'Veuf(ve)',
  },
];
