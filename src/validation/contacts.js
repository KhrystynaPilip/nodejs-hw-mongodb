import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

// Оголошення схеми з кастомізованими повідомленнями
export const createContactSchema = Joi.object({
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.messages('User id should be a valid mongo id');
    }
    return true;
  }),
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{6,16}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be 6-16 digits and may start with +',
      'string.empty': 'Phone number is required',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email must be at least {#limit} characters long',
    'string.max': 'Email must be at most {#limit} characters long',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string',
      'any.only': 'Contact type must be one of: work, home, personal',
      'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{6,16}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be 6-16 digits and may start with +',
    }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email must be at least {#limit} characters long',
    'string.max': 'Email must be at most {#limit} characters long',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type must be a string',
    'any.only': 'Contact type must be one of: work, home, personal',
    'any.required': 'Contact type is required',
  }),
});
