import Joi from 'joi';

export const paymentValidationSchema = Joi.object({
  userId: Joi.string().trim().required(),
  amount: Joi.number().min(0).required(),
}).required();
