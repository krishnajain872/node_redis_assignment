const responseHelper = async (req, res) => {
  const response = {
    statusCode: res.statusCode,
    data: res.data || {},
    message: "Success",
  };
  return res.status(res.statusCode).json(response);
};

module.exports = {
  responseHelper,
};
