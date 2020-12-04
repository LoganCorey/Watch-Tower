# Watch Tower Back-End

This is the back-end portion of Watch Tower.  The back-end was created using the Express web frame with Sequelize and SQLite3.  One of the issues I ran into creating this application was in the amount of data that needed to be stored and retrieved.  In order to resolve this issue I decided on making Watch Tower a self managed data tool where a user can upload their own comic book information and track what they have/don't have.  This also makes the app itself feel like part of your collection that you're completing which can add to the fun.  This is a fully RESTful service  which made building the front-end much easier.

## Getting Started

### Prerequisites

- NPM v6.13.4
  - https://www.npmjs.com/get-npm
- NodeJs v12.16.1
  - https://nodejs.org/dist/latest-v12.x/

### Installation

1. Install NPM packages
   - `npm install`
2. Build the project
   - `npm run build`
3. Start the project
   - `npm start`



### Building

In order to build the project you can run the command `npm run electron:build`, this will build the VueJS component and the electron component located in dist and electron_dist.

### Testing

For easier testing of both the front and backend tests pertaining to each piece are respectively in the **client** and **server** folders.  To run the tests go into either folder and execute the command `npm run test`.  