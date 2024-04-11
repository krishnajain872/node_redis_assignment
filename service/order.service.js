const db = require("../config/db");
const requiredFeild = require("../helper/requiredFeild.helper");
const mergerObjectKeys = require("../helper/object.helper");
const orderInfo = async (payload) => {
  const hash_name_order = `${payload.value.TenantId}_${payload.value.OMSId}_${payload.value.ClientID}_${payload.value.Token}:${payload.value.OrderId}`;
  const hash_name_client = `${payload.value.TenantId}_${payload.value.OMSId}:${payload.value.ClientID}`;
  if (
    Number(payload.value.OperationType) === 100 &&
    requiredFeild.requiredFieldOrders(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const existClient = await db.hgetall(hash_name_client);
    if (Object.keys(existClient).length === 0) {
      const error = new Error("client does not exist use different clientID");
      error.statusCode = 404;
      throw error;
    }
    const existOrder = await db.hgetall(hash_name_order);
    if (Object.keys(existOrder).length !== 0) {
      const error = new Error(
        "Order already exist exist for clientID use different orderId"
      );
      error.statusCode = 404;
      throw error;
    }
    const key = payload.value.OrderId;
    const value = JSON.stringify(payload.value);

    const data = await db.hset(hash_name_order, key, value);
    console.log(data);
    if (data) {
      await db.sadd("orderDetails", hash_name_order);
      return data;
    }
  }
  // update order
  else if (
    Number(payload.value.OperationType) === 101 &&
    requiredFeild.requiredFieldOrders(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const exist = await db.hgetall(hash_name_order);

    if (Object.keys(exist).length === 0) {
      const error = new Error("order Does not exist");
      error.statusCode = 404;
      throw error;
    }

    const data = {};
    for (var key in exist) {
      Object.assign(data, JSON.parse(exist[key]));
    }

    const mergedData = JSON.stringify(mergerObjectKeys(data, payload.value));
    exist[payload.value.OrderId] = mergedData;
    console.log(exist);
    await db.hset(hash_name_order, exist);
    const update = [];
    const updatedData = await db.hgetall(hash_name_order);
    for (var key in updatedData) {
      updatedData[key] = update.push(JSON.parse(updatedData[key]));
    }
    if (updatedData) {
      return update;
    }
  }
  // delete
  else if (
    Number(payload.value.OperationType) === 102 &&
    requiredFeild.requiredFieldOrders(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const exist = await db.hgetall(hash_name_order);

    if (Object.keys(exist).length === 0) {
      const error = new Error("order Does not exist");
      error.statusCode = 404;
      throw error;
    }

    const data = await db.del(hash_name_order);

    await db.srem("orderDetails", hash_name_order);

    if (data) {
      return data;
    }
  } else if (
    Number(payload.value.OperationType) === 103 &&
    requiredFeild.requiredFieldOrders(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    const exist = await db.hgetall(hash_name_order);

    if (Object.keys(exist).length === 0) {
      const error = new Error("order Does not exist");
      error.statusCode = 404;
      throw error;
    }
    const data = [];
    for (var key in exist) {
      exist[key] = data.push(JSON.parse(exist[key]));
    }
    return data;
  } else if (
    Number(payload.value.OperationType) === 104 &&
    requiredFeild.requiredFieldOrders(
      payload.value,
      Number(payload.value.OperationType)
    )
  ) {
    console.log("GET ALL ORDER FOR CLIENT SERVICE");
    const hashdata = await db.smembers("orderDetails");
    let data = [];
    await Promise.all(
      hashdata.map(async (element, id) => {
        let hashElement = await db.hgetall(element);
        hashElement = JSON.parse(JSON.stringify(hashElement));
        console.log(hashElement);
        for (var key in hashElement) {
          let order = JSON.parse(hashElement[key]);
          console.log("THIS is client => ", order.ClientID);

          if (Number(order.ClientID) === Number(payload.value.ClientID)) {
            await data.push(order);
          }
        }
      })
    );
    console.log(data); // This will print all the orders which have a ClientID of 1

    return data;
  }
};

module.exports = { orderInfo };
