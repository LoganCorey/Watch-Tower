# Watch Tower Front-End

This is the front-end portion of Watch Tower.  The front end was created using VueJS and Electron.  One of the main goals with the frontend was to make it feel like a proper app so in order to do this I took a lot of inspiration from the Spotify desktop app.  A main design philosophy was to keep the interface as unobtrusive and muted as possible to really bring out the comic book covers.

## Getting Started

### Prerequisites

- NPM v6.13.4

  - https://www.npmjs.com/get-npm

- NodeJs v12.16.1

  - https://nodejs.org/dist/latest-v12.x/


### Installation

1. Install NPM packages
   - `npm install`
2. Start the project
   - `npm run electron:serve `



### Building

In order to build the project you can run the command `npm run electron:build`, this will build the VueJS component and the electron component located in dist and electron_dist.

### Testing

For easier testing of both the front and backend tests pertaining to each piece are respectively in the **client** and **server** folders.  To run the tests go into either folder and execute the command `npm run test`.  