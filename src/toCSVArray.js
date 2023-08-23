const flatten = require("flat");

const flattenData = (dataArr) =>
  dataArr.map((item) =>
    typeof item === "string" ? item : flatten(item, { safe: true })
  );

const toCSVArray = (data, duplicateRows = true) => {
  return flattenData(data).reduce((acc, item) => {
    let newItem = {};
    let toConcat = [];
    for (const key in item) {
      const itemValue = item[key];
      if (!(typeof itemValue === "object" && Array.isArray(itemValue))) {
        newItem[key] = item[key];
      } else if (
        Array.isArray(itemValue) &&
        itemValue.every((item) => typeof item === "string")
      ) {
        toConcat = toConcat.concat(
          itemValue.map((item) => {
            return { [`${key}`]: item };
          })
        );
      } else {
        toConcat = toConcat.concat(toCSVArray(itemValue));
      }
    }
    if (duplicateRows) {
      if (toConcat.length) {
        toConcat.forEach((concatItem) =>
          acc.push({ ...newItem, ...concatItem })
        );
      } else {
        acc.push(newItem);
      }
      return acc;
    }

    const [firstItem = {}, restItems = []] = toConcat;
    acc.push({ ...newItem, ...firstItem });
    return acc.concat(restItems);
  }, []);
};

module.exports = toCSVArray; 