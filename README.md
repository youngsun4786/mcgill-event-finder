# mcgill-event-finder (McEvent)

## What is McEvent?

Event-centered platform for McGill students, for easier management and viewing of events taking place on Campus.

## To get started

In order to run it locally, make sure that you are connected to a MongoDB instance to access the database.

`cd` into backend folder and run `npm install --force` to include dependencies because the typegoose library demands for lower version for mongoose it will throw an error when installing without the force flag.

then `cd` into frontend folder and run `npm install` to download all the dependencies.

This will be all for the installation, and to start the application run the following command at the **root** of the project folder:

`cd frontend && npm start && cd .. && cd backend && npm start`
