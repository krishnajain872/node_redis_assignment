const { Router } = require("express");
const clientController = require("../controllers/client.controller");
const clientValidator = require("../validators/clientInfoValidation");
const genericResponse = require("../helper/response.helper");

const router = Router();

router.post(
  "/info",
  clientValidator.clientInfoschema,
  clientController.clientInfo,
  genericResponse.responseHelper
);

module.exports = router;
