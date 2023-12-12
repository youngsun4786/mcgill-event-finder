# mcgill-event-finder (McEvent)

Here's the link to our website:

https://mcevent.netlify.app/

## What is McEvent?

Event-centered platform for McGill students, for easier management and viewing of events taking place on Campus.

## To get started

In order to run it locally, make sure that you are connected to a MongoDB instance to access the database.

`cd` into backend folder and run `npm install --force` to include dependencies because the typegoose library demands for lower version for mongoose it will throw an error when installing without the force flag.

Afterwards, run `npm start` to start the server.

Next, open up a new terminal tab, and `cd` into frontend folder and run `npm install` to download all the dependencies.

Finally, run `npm start` to start the client.
