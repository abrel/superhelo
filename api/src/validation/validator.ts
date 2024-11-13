import HttpError from '@@/utils/HttpError';

type Validation = {
  value: unknown;
  error?: { details: { message?: string }[] };
};

type Schema = {
  validate: (arg: unknown) => Validation;
};

const validator = (payload: unknown, schema: Schema) => {
  const validation: Validation = schema.validate(payload);

  if (validation.error) {
    throw new HttpError('Validation Error', 400, validation.error.details);
  }

  return validation.value;
};

export default validator;
