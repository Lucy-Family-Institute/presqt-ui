import {testTokens, testTokenCommand} from "../config";

export default function testTokenFinder(connectionName, token) {
  let goodToken = token;
  if (token === testTokenCommand) {
    for (var key in testTokens) {
      if (key === connectionName) {
        goodToken = testTokens[key];
      }
    }
  }
  return goodToken;
}
