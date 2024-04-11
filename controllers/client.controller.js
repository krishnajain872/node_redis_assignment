const clientService = require("../service/client.service");
const generic = require("../helper/error.helper");

const clientInfo = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await clientService.clientInfo(payload);
    res.data = data;
    next();
  } catch (error) {
    generic.errorHelper(req, res, error.message, error.statusCode, error);
  }
};
const getClient = async (req, res, next) => {
  try {
    res.data = { message: "The routes working fine" };
    next();
  } catch (error) {
    generic.errorHelper(req, res, error.message, error.statusCode, error);
  }
};

module.exports = {
  clientInfo,
  getClient,
};
