const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const orderValidator = require("../validators/orderInfoValidation");
const genericResponse = require("../helper/response.helper");

const router = Router();

router.post(
  "/info",
  orderValidator.orderInfoschema,
  orderController.orderInfo,
  genericResponse.responseHelper
);
router.get("/info", orderController.getOrder, genericResponse.responseHelper);

module.exports = router;
