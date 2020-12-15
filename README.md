Set up:

https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser

Create a project:

func init CodestarFunctions --typescript

Add a function to a project:

func new --name GetPublications --template "HTTP trigger" --authlevel "anonymous"

Run local:

nvm use 12
npm i
npm start


