const readFile = require("fs").promises.readFile;
const writeFile = require("fs").promises.writeFile;
const { Parser } = require("@json2csv/plainjs");
const toCSVArray = require("./toCSVArray");

const parser = new Parser();

const main = async () => {
  const string = await readFile("./inbound/response.json", "utf8");
  const flatData = JSON.parse(string);
  const csvData = toCSVArray(flatData);

  const csv = parser.parse(csvData);
  await writeFile("./outbound/output.csv", csv);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
