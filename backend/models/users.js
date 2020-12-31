const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  phone: { type: String, trim: true, required: true, unique: true },
  address: { type: String, trim: true, required: true }
});

const User = mongoose.model('User', schema);

const validate = user => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } }).required(),
    phone: Joi.string().required().regex(/^[0-9]{9}$/),
    address: Joi.string().required().min(5).max(50)
  });

  return schema.validate(user);
}

const validateUpdatedUser = object => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } }),
    phone: Joi.string().regex(/^[0-9]{9}$/),
    address: Joi.string().min(5).max(50)
  });

  return schema.validate(object);
}

module.exports = { User, validate, validateUpdatedUser };