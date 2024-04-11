const Joi = require("joi");
const { validateRequest } = require("../middlewares/validator.middleware");
const orderInfoschema = (req, res, next) => {
  const schema = Joi.object({
    MsgType: Joi.number().valid(1120).required(),
    OperationType: Joi.number()
      .integer()
      .valid(100, 101, 102, 103, 104)
      .required(),
    TenantId: Joi.number().integer().min(1),
    OMSId: Joi.number().integer().min(1),
    OrderType: Joi.string().valid("buy", "sell"),
    OrderId: Joi.number().integer().min(1),
    Token: Joi.number().integer().min(1),
    OrderPrice: Joi.number(),
    ClientID: Joi.number().integer().min(1),
    ClientName: Joi.string(),
    Remark: Joi.string().default(""),
  });
  validateRequest(req, res, next, schema, "body");
};
module.exports = {
  orderInfoschema,
};
