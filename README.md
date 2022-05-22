# Package-machine app

## CREATE
Create route can create new couriers and new machines. Could create an admin app for this but now I used Postman to send requests, for simplicity.
- Courier schema:
  - name: string
  - password: string (hashed on registering for safety)
- Courier endpoint: 
  - /api/v1/create/new-courier

- Machine schema:
  - aParcels: array of objects
  - bParcels: array of objects
  - cParcels: array of objects
  - Schema of parcel objects populating these arrays:
    - password: string, name: string, empty: boolean
- Machine endpoint: 
  - /api/v1/create/new-machine
- Creating is simplified by only needing to send the numbers of parcels we would like the machine to have in each size. 

## .ENV ON FRONTEND
Machine ID is stored manually on the frontend in an ENV variable, needs to be set when installing the app on-site.
This ensure that the machine will be able to fetch it's data from the Mongo database, and it's data only, not other machines in the system.

## HOW THE APP WORKS
- Login screen has two options: Pick-up and Drop-off
- Drop-off route:
  - Courier is asked to log in. Courier is authenticated with Passport.js - local strategy using name and password. 
  - Courier is guided with toast messages if he doesn't fill in the name and password fields.
  - For demonstration purposes there is a tool-tip which auto-fills the fields for you, with one of the registered couriers information.
  - After logging in courier can choose from the currently empty parcels to place his package.
  - The app displays the parcel chosen, plus a 5 digit password (courier has the possibility to generate new passwords). Courier needs to notify the costumer of these data in order for them to be able to pick up the package in the future. 
  - When the drop-off is initiated the database is updated and the courier is logged out. The app returns to the homepage.
- Pick-up route:
  - Client is asked to provide which parcel he want to open and his password.
  - Client is guided by toast messages throughout the procedure.
  - On success the database is updated, Client is prompted with an on-screen message and the app is returned to the homepage. 

## MEDIA QUERY
- The layouts are adjusted on smaller screen sizes, so the app remains usable.

## DOCKERIZING
- The app can be be dockerized by initiating build on the frontend, and the dockerizing in the backend. API created with Express.js hosts the React app and establishes communication with Mongo database.

