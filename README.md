# Certs

Certs is used by the Department of Permits, Licenses, & Inspections at the City of Pittsburgh to track professional certifications and continuing education credits for it's personnel.  

Certs interfaces with Sharepoint as a data store via the [365-proxy](https://github.com/CityofPittsburgh/365-api)

<img src='screenshot.png' width='100%'/>

## A note on boilerplate

The bones of Certs are shared across all client applications developed by Paul Marks for the City of Pittsburgh.  For more in-depth documentation on the structure,  design choices, authentication flow, and installation procedures for this application, please see the documentation for the [boilerplate](https://github.com/CityofPittsburgh/react-typescript-boilerplate).

This README will focus only on the components of this application that are unique to Certs.

## Structure
    ...
    app
    ├── src                         
        ├── components        
            |── admin                   # Admin view into certification history...permits search, delete, edit, etc.
            |── certificationRecords    # Return users cert records, and provides interface to create new records 
        ├── store                   
            |── certHistory             # Store of all certification history
            |── certifications          # Store of all certification types
            |── userProfile             # Mappings of users to departments and positions        

## Running Locally

### Prerequisites

* [Node.js](https://nodejs.org) - JS runtime
* .env - See .env.example for all required secrets

### Installation
```
git clone https://github.com/CityofPittsburgh/certs
cd certs
// first, install dependencies for the server
npm install
// then, install dependencies for the client
cd app
npm install
// to run the app locally and bypass auth
npm start
// to bundle the app for deployment
npm run build
// to run the app from the minified build, with auth workflow
cd ..
node server.js
```

## Deployment

Both staging and production services are hosted in Azure.  Application is deployed directly from github, and can be triggered either (a) through the Azure GUI, (b) through the [CLI](https://docs.microsoft.com/en-us/cli/azure/webapp/deployment/source?view=azure-cli-latest#az-webapp-deployment-source-sync), or (c) through the [proxy service](https://github.com/CityofPittsburgh/azure-proxy).

For complete documentation on the azure environment, see [here](https://github.com/CityofPittsburgh/all-things-azure.git).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details