function mergeMissingKeys(obj1, obj2) {
  for (let key in obj1) {
    if (
      !obj2.hasOwnProperty(key) ||
      obj2[key] === undefined ||
      obj2[key] === "" ||
      obj2[key] === null
    ) {
      obj2[key] = obj1[key];
    }
  }
  return obj2;
}

module.exports = mergeMissingKeys;
