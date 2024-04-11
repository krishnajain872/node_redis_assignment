const requiredFieldClients = (payload, operation) => {
  if (operation === 100) {
    const keys = [
      "MsgType",
      "OperationType",
      "TenantId",
      "OMSId",
      "ClientID",
      "ClientName",
      "Remark",
    ];
    for (let key of keys) {
      if (!payload.hasOwnProperty(key)) {
        const error = new Error(`This feild ${key} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
    return true;
  }
  if (operation === 101 || operation === 102 || operation === 103) {
    const keys = ["MsgType", "OperationType", "TenantId", "OMSId", "ClientID"];
    for (let key of keys) {
      if (!payload.hasOwnProperty(key)) {
        const error = new Error(`This feild ${key} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
    return true;
  }
  if (operation === 104) {
    const keys = ["MsgType", "OperationType"];
    for (let key of keys) {
      if (!payload.hasOwnProperty(key)) {
        const error = new Error(`This feild ${key} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
    return true;
  }
};

const requiredFieldOrders = (payload, operation) => {
  if (operation === 100) {
    const keys = [
      "MsgType",
      "OperationType",
      "TenantId",
      "OMSId",
      "OrderType",
      "OrderId",
      "Token",
      "OrderPrice",
      "ClientID",
      "ClientName",
      "Remark",
    ];

    for (let key of keys) {
      if (!payload.hasOwnProperty(key)) {
        const error = new Error(`This feild ${key} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
    return true;
  }
  if (
    operation === 101 || //update
    operation === 102 || //delete
    operation === 103 //get
  ) {
    const keys = [
      "MsgType",
      "OperationType",
      "TenantId",
      "OrderId",
      "Token",
      "OrderId",
      "OMSId",
    ];

    for (let key of keys) {
      if (!payload.hasOwnProperty(key)) {
        const error = new Error(`This feild ${key} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
    return true;
  }
  if (operation === 104) {
    const keys = ["MsgType", "OperationType", "TenantId", "ClientID", "OMSId"];
    for (let key of keys) {
      if (!payload.hasOwnProperty(key)) {
        const error = new Error(`This feild ${key} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
    return true;
  }
};
module.exports = { requiredFieldClients, requiredFieldOrders };
