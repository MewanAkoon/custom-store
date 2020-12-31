const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

const Product = mongoose.model('Product', schema);

const validate = product => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    userId: Joi.objectId().required()
  });

  return schema.validate(product);
}

const validateUpdatedProduct = object => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    quantity: Joi.number().min(0)
  });

  return schema.validate(object);
}

module.exports = { Product, validate, validateUpdatedProduct };