import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const OAuth = require("oauth");

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_APP_SECRET,
  TWITTER_USER_TOKEN,
  TWITTER_USER_SECRET,
} = process.env;

// TODO deploy

// const GET_RECENT_TWEETS_URL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${SCREEN_NAME}&count=${TWEET_COUNT}`;
const GET_RECENT_TWEETS_URL_ROOT = `https://api.twitter.com/1.1/statuses/user_timeline.json?`;

const authCallback = (context, headers) => {
  context.log("authCallback init");
  /* params: error, data, result */
  return (error, data) => {
    try {
      if (error) {
        context.log(error);
        // throw new Error(`Auth failure GET_RECENT_TWEETS_URL ${error}`);
        // context.res = {
        //   status: 401,
        //   body: "some error occurred",
        // };
        // TODO fix error handling
        context.done(`Auth failure GET_RECENT_TWEETS_URL ${error.statusCode}`);
      }
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: data, // JSON.stringify(data),
      };
      //   callback(null, {
      //     statusCode: 200,
      //     headers,
      //     body: JSON.stringify(data),
      //   });
      context.done();
    } catch (err) {
      // TODO this catch is no longer needed?
      context.log(err);
      context.res = {
        status: 401,
        body: "some error occurred",
      };
      context.done(err);
      //   callback(`Failed GET_RECENT_TWEETS_URL ${err}`);
    }
  };
};

/**
 * @description Azure function getTweets
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
  const screenName = req.query.screenname || (req.body && req.body.screenname);
  const count = req.query.count || (req.body && req.body.count);

  const oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    TWITTER_CONSUMER_KEY, // Twitter application consumer key
    TWITTER_APP_SECRET, // Twitter application secret
    "1.0",
    "",
    "HMAC-SHA1"
  );

  const headers = {}; // TODO use safe urls Util

  oauth.get(
    `${GET_RECENT_TWEETS_URL_ROOT}screen_name=${screenName}&count=${count}`,
    TWITTER_USER_TOKEN, // Twitter user token for this app
    TWITTER_USER_SECRET, // Twitter user secret for this app
    authCallback(context, headers)
  );
};

export default httpTrigger;
