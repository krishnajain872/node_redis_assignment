const Joi = require("joi");
const { validateRequest } = require("../middlewares/validator.middleware");
const clientInfoschema = (req, res, next) => {
  const schema = Joi.object({
    MsgType: Joi.number().integer().valid(1121).required(),
    OperationType: Joi.number()
      .integer()
      .valid(100, 101, 102, 103, 104)
      .required(),
    TenantId: Joi.number().integer().min(1),
    OMSId: Joi.number().integer().min(1),
    ClientID: Joi.number().integer().min(1),
    ClientName: Joi.string(),
    Remark: Joi.string().default(""),
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  clientInfoschema,
};
