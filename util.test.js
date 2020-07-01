//Test feedback data
const { generateText } = require("./util");

test("should output name title and message", () => {
  const text = generateText("Wiwi", "Great", "Great Service");
  expect(text).toBe("Name: Wiwi, Title: Great, Message: Great Service");
});
