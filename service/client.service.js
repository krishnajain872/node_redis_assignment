const db = require("../config/db");
const requiredFeild = require("../helper/requiredFeild.helper");
const mergerObjectKeys = require("../helper/object.helper");
const clientInfo = async (payload) => {
  // add data
  if (
    Number(payload.value.OperationType) === 100 &&
    requiredFeild.requiredFieldClients(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const hash_name = `${payload.value.TenantId}_${payload.value.OMSId}:${payload.value.ClientID}`;

    const exist = await db.hgetall(hash_name);

    if (Object.keys(exist).length !== 0) {
      const error = new Error("client already exist user different clientID");
      error.statusCode = 409;
      throw error;
    }

    const key = payload.value.ClientID;
    const value = JSON.stringify(payload.value);

    const data = await db.hset(hash_name, key, value);
    if (data) {
      await db.sadd("clientDetails", hash_name);
      return data;
    }
  }
  // update operation
  else if (
    Number(payload.value.OperationType) === 101 &&
    requiredFeild.requiredFieldClients(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const hash_name = `${payload.value.TenantId}_${payload.value.OMSId}:${payload.value.ClientID}`;

    const exist = await db.hgetall(hash_name);

    if (Object.keys(exist).length === 0) {
      const error = new Error("client Does not exist");
      error.statusCode = 404;
      throw error;
    }

    const data = {};
    for (var key in exist) {
      Object.assign(data, JSON.parse(exist[key]));
    }

    const mergedData = JSON.stringify(mergerObjectKeys(data, payload.value));
    exist[payload.value.ClientID] = mergedData;
    console.log(exist);

    await db.hset(hash_name, exist);

    const update = [];
    const updatedData = await db.hgetall(hash_name);

    for (var key in updatedData) {
      updatedData[key] = update.push(JSON.parse(updatedData[key]));
    }
    if (updatedData) {
      return update;
    }
  } // delete operation
  else if (
    Number(payload.value.OperationType) === 102 &&
    requiredFeild.requiredFieldClients(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const hash_name = `${payload.value.TenantId}_${payload.value.OMSId}:${payload.value.ClientID}`;

    const exist = await db.hgetall(hash_name);

    if (Object.keys(exist).length === 0) {
      const error = new Error("client Does not exist");
      error.statusCode = 404;
      throw error;
    }

    const data = await db.del(hash_name);

    await db.srem("clientDetails", hash_name);
    console.log("delete called " + data);
    if (data) {
      return data;
    }
  } // get operation
  else if (
    Number(payload.value.OperationType) === 103 &&
    requiredFeild.requiredFieldClients(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const hash_name = `${payload.value.TenantId}_${payload.value.OMSId}:${payload.value.ClientID}`;

    const exist = await db.hgetall(hash_name);

    if (Object.keys(exist).length === 0) {
      const error = new Error("client Does not exist");
      error.statusCode = 404;
      throw error;
    }
    const data = [];
    for (var key in exist) {
      exist[key] = data.push(JSON.parse(exist[key]));
    }

    return data;
  } // getAll operation
  else if (
    Number(payload.value.OperationType) === 104 &&
    requiredFeild.requiredFieldClients(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const hashdata = await db.smembers("clientDetails");
    let data = [];

    await Promise.all(
      hashdata.map(async (element) => {
        let hashData = await db.hgetall(element);
        hashData = JSON.parse(JSON.stringify(hashData));
        for (var key in hashData) {
          hashData[key] = data.push(JSON.parse(hashData[key]));
        }
      })
    );
    return data;
  }
};

module.exports = { clientInfo };
