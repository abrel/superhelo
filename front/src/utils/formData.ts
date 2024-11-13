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

    if (typeof value === 'object' && !(value instanceof Date)) {
      convertToFormData(
        value,
        formData,
        namespace ? `${namespace}[${key}]` : key,
      );
    } else {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      formData.append(formKey, String(value));
    }
  }

  return formData;
};
