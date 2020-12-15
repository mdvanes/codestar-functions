import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import got from "got";
const OAuth = require("oauth");

const GET_PUBLICATIONS_URL =
  "https://medium.com/codestar-blog/latest?format=json";

const SCREEN_NAME = "mdworld";
const TWEET_COUNT = "10";
const GET_RECENT_TWEETS_URL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${SCREEN_NAME}&count=${TWEET_COUNT}`;

const authCallback = (context, headers) => {
  context.log("authCallback init");
  /* params: error, data, result */
  return (error, data) => {
    context.log("authCallback response", error, data);
    try {
      if (error) {
        context.log(error);
        throw new Error(`Auth failure GET_RECENT_TWEETS_URL ${error}`);
      }
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(data),
      };
      //   callback(null, {
      //     statusCode: 200,
      //     headers,
      //     body: JSON.stringify(data),
      //   });
      //   context.done();
    } catch (err) {
      context.log(err);
      //   callback(`Failed GET_RECENT_TWEETS_URL ${err}`);
    }
  };
};

/**
 * @description Lambda function getPublications
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
 * npm start
 * TODO call directly
 *
 * // Expected payload
 * {
 *   "headers": {
 *      "origin": "ORIGIN"
 *   },
 *   "body": "[ { id: "123", "title": "My Post" } ]",
 * }
 */
const httpTrigger: AzureFunction = function (
  context: Context,
  req: HttpRequest
): void {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  // TODO This medium API no longer works, fix! Needs authentication
  //   const response = await got(GET_PUBLICATIONS_URL);
  //   // Strip security header
  //   const saneResponse = response.body.substr(16);
  //   const responseJson = JSON.parse(saneResponse);
  //   const posts = responseJson.payload.posts;
  //   const users = responseJson.payload.references.User;

  const oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    TWITTER_CONSUMER_KEY, // Twitter application consumer key
    TWITTER_APP_SECRET, // Twitter application secret
    "1.0",
    "",
    "HMAC-SHA1"
  );

  const headers = {};

  oauth.get(
    GET_RECENT_TWEETS_URL,
    TWITTER_USER_TOKEN, // Twitter user token for this app
    TWITTER_USER_SECRET, // Twitter user secret for this app
    authCallback(context, headers)
  );
  //   context.done();

  //   TODO unreachable
  //   context.res = {
  //     // status: 200, /* Defaults to 200 */
  //     body: responseMessage,
  //   };
};

export default httpTrigger;
