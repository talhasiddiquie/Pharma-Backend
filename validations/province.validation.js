const Joi = require("joi-oid");
// const { password, objectId } = require("./custom.validation");

const createProvince = {
  body: Joi.object().keys({
    objectId: Joi.objectId().required(),
    name: Joi.string().required(),
    isActive: Joi.string(),
  }),
};

const getProvinces = {
  query: Joi.object().keys({
    Provincename: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProvince = {
  body: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};

const updateProvince = {
  body: Joi.object().keys({
    id: Joi.objectId().required(),
    name: Joi.string().required(),
    isActive: Joi.string(),
  }),
};
module.exports = {
  getProvince,
  getProvinces,
  createProvince,
  updateProvince,
};
