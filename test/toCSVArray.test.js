const toCSVArray = require("../src/toCSVArray");

const nestedTestData = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    hobbies: ["reading", "painting"],
    addresses: [
      {
        type: "home",
        street: "123 Main St",
        city: "Exampleville",
      },
      {
        type: "work",
        street: "456 Office Rd",
        city: "Workington",
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    hobbies: ["gardening", "cooking"],
    addresses: [
      {
        type: "home",
        street: "789 Garden Ave",
        city: "Greenville",
      },
    ],
  },
];

console.log(JSON.stringify(nestedTestData))

describe("toCSVArray", () => {
  test("toCSVArray ", () => {
    expect(toCSVArray(nestedTestData)).toMatchSnapshot();
    expect(toCSVArray(nestedTestData, false)).toMatchSnapshot();
  });
});
