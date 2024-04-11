const generic = require("../helper/error.helper");
const validateRequest = (req, res, next, schema, parameterType) => {
  let requestData = {};
  if (parameterType === "body") {
    requestData = req.body;
  }
  const value = schema.validate(requestData);
  if (!value.error) {
    req.body = value;
    return next();
  }
  const errorMessage = value.error.details[0].message;
  generic.errorHelper(req, res, errorMessage, 400, value.error);
};

module.exports = {
  validateRequest,
};
