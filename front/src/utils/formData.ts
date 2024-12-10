export const convertToFormData = (
  object: Record<string, unknown>,
  form?: FormData,
  namespace?: string,
): FormData => {
  const formData = form || new FormData();

  for (const key of Object.keys(object)) {
    const value = object[key] as Record<string, unknown>;
    if ([null, undefined, ''].includes(value as any)) {
      continue;
    }

    const formKey = namespace ? `${namespace}[${key}]` : key;
    if (typeof value === 'object' && !(value instanceof Date)) {
      if (value.length === 0) {
        formData.append(formKey, '[]');
      } else {
        convertToFormData(
          value,
          formData,
          namespace ? `${namespace}[${key}]` : key,
        );
      }
    } else {
      formData.append(formKey, String(value));
    }
  }

  return formData;
};
