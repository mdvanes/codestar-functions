Trying out Azure functions by migrating AWS Lambda functions.

# Set up:

https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser

# Create a project:

func init CodestarFunctions --typescript

Add a function to a project:

func new --name GetPublications --template "HTTP trigger" --authlevel "anonymous"

Run local:

Set env values like TWITTER_CONSUMER_KEY in local.settings.json/Values
nvm use 12
npm i
npm start
http://localhost:7071/api/GetPublications?screenname=mdworldnl&count=10

# Create function on cloud:

az login

az group create --name AzureFunctionsQuickstart-rg --location westeurope

(this takes a couple of minutes)
az storage account create --name codestarstorage --location westeurope --resource-group AzureFunctionsQuickstart-rg --sku Standard_LRS

(this takes a couple of minutes)
az functionapp create --resource-group AzureFunctionsQuickstart-rg --consumption-plan-location westeurope --runtime node --runtime-version 12 --functions-version 3 --name CodestarFunctions --storage-account codestarstorage

# Publish and run:

npm i
(this does `npm prune --production` at the end, so `npm i` is needed to continue developing)
npm run build:production

(this takes a couple of minutes)
func azure functionapp publish CodestarFunctions

result:

```
Functions in CodestarFunctions:
    GetPublications - [httpTrigger]
        Invoke url: https://codestarfunctions.azurewebsites.net/api/getpublications

    GetTweets - [httpTrigger]
        Invoke url: https://codestarfunctions.azurewebsites.net/api/gettweets
```

## Set up envars

Function app > Settings > Configuration > New application setting

## Install npm dependencies

Make sure runtime dependencies are in "dependencies" and not "devDependencies" and it should work on build.

## Try the endpoints

try: https://codestarfunctions.azurewebsites.net/api/gettweets?screenname=mdworldnl&count=10
(should return a JSON with an array of tweets)

try: https://codestarfunctions.azurewebsites.net/api/getpublications
(should return "failure!")