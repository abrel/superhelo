export enum DocumentTypes {
  OTHER = 'other',
  SIGNATURE = 'signature',
  AVATAR = 'avatar',
}

export const translateDocumentType = (type: string, plural = false) => {
  if (plural) {
    switch (type) {
      case DocumentTypes.OTHER:
        return 'Autres documents:';
      default:
        return type;
    }
  }
  switch (type) {
    case DocumentTypes.OTHER:
      return 'Autre';
    default:
      return type;
  }
};

export const selectInputDocumentTypes = Object.values(DocumentTypes)
  .filter((t) => ![DocumentTypes.SIGNATURE, DocumentTypes.AVATAR].includes(t))
  .map((type) => ({
    id: type,
    label: translateDocumentType(type),
  }));
