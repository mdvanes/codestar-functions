Set up:

https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser

Create a project:

func init CodestarFunctions --typescript

Add a function to a project:

func new --name GetPublications --template "HTTP trigger" --authlevel "anonymous"

Run local:

Set env values like TWITTER_CONSUMER_KEY in local.settings.json/Values
nvm use 12
npm i
npm start
http://localhost:7071/api/GetPublications?screenname=mdworldnl&count=10

Publish and run:

