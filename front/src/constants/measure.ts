export enum MeasureTypes {
  GUARDIANSHIP = 'guardianship',
  ENHANCED_GUARDIANSHIP = 'enhanced_guardianship',
  FULL_GUARDIANSHIP = 'full_guardianship',
  JUDICIAL_PROTECTION = 'judicial_protection',
}

export const translateMeasureType = (type: string) => {
  switch (type) {
    case MeasureTypes.GUARDIANSHIP:
      return 'Curatelle';
    case MeasureTypes.ENHANCED_GUARDIANSHIP:
      return 'Curatelle renforcée';
    case MeasureTypes.FULL_GUARDIANSHIP:
      return 'Tutelle';
    case MeasureTypes.JUDICIAL_PROTECTION:
      return 'Protection judiciaire';
    default:
      return type;
  }
};

export const selectInputMeasureTypes = Object.values(MeasureTypes).map(
  (type) => ({
    id: type,
    label: translateMeasureType(type),
  }),
);
