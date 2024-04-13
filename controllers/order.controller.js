const orderService = require("../service/order.service");
const generic = require("../helper/error.helper");

const orderInfo = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await orderService.orderInfo(payload);
    res.data = data;
    next();
  } catch (error) {
    generic.errorHelper(req, res, error.message, error.statusCode, error);
  }
};

module.exports = {
  orderInfo,
};
