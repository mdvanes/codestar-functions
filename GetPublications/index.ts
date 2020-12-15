import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import got from "got";

const GET_PUBLICATIONS_URL =
  "https://medium.com/codestar-blog/latest?format=json";

// TODO deploy

/**
 * @description Azure function getPublications
 *
 * Method: GET
 *
 * TODO Validates the origin URL with {@link safeGetHeaders}
 *
 * Endpoints
 * - on test stage: https://hjoutysc5k.execute-api.eu-west-1.amazonaws.com/test/get-publications
 * - on prod stage: https://267sder6c7.execute-api.eu-west-1.amazonaws.com/prod/get-publications
 *
 * @param {object} context Azure context
 * @param {object} req HTTP Request
 * @return {Promise<void>} Nothing is returned, set property "res" on the Azure context object.
 *
 * @example
 * // Call locally from the CLI:
 * npm start and go to url
 * TODO call directly on the CLI
 *
 * // Expected payload
 * {
 *   "headers": {
 *      "origin": "ORIGIN"
 *   },
 *   "body": "[ { id: "123", "title": "My Post" } ]",
 * }
 */
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  // const screenName = req.query.screenname || (req.body && req.body.screenname);
  // const count = req.query.count || (req.body && req.body.count);
  //   const responseMessage = name
  //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
  //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  // TODO This medium API no longer works, fix! Needs authentication
  try {
    const response = await got(GET_PUBLICATIONS_URL);
    //   // Strip security header
    //   const saneResponse = response.body.substr(16);
    //   const responseJson = JSON.parse(saneResponse);
    //   const posts = responseJson.payload.posts;
    //   const users = responseJson.payload.references.User;
  } catch (err) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "failure!",
    };
  }
};

export default httpTrigger;
