

[TOC]

# Watch Tower Comics

Watch Tower Comics is a desktop application which seeks to give an individual the ability to track their comic book collection.  A desktop Comic book tracker built with NodeJS, VueJS,  Electron and SQLite3.



## About The Project

This project was created so that I could keep track of comics the comics that I was collecting without having to pay any kind of fee.  This gave me the idea to create a DIY comic book tracking system that let's the user create and maintain their own information free of charge

![](.\readme images\Main.PNG)



## Features

In this section I wanted to highlight some of the interesting features of Watch Tower.

### RESTful Backend

Built with Express, Watch Tower features a fully RESTful backend service which allows for easy facilitation of the frontend functions.

### Easily Add/Edit Collections

Collections are easily added by click the add collection button and filling out a few fields.  After that the collection is pre populated with the number of issues specified and the remaining issue specific data can be added in (such as variants or price purchased add with the "add issue" or "edit issue" buttons.

### Easily Upload Comic Covers

To lessen some of the clicking comic book covers can be dragged and drop onto the respective issue to save time uploading numerous comic book covers.

## Getting Started

### Prerequisites

- NPM v6.13.4
  - https://www.npmjs.com/get-npm
- NodeJs v12.16.1
  - https://nodejs.org/dist/latest-v12.x/
- Electron
  - `npm install electron -g`
- Vue CLI
  - npm install -g @vue/cli

### Installation

1. Clone the repo
   - `git clone url`
2. Install NPM packages
   - `npm install: all`
3. Build the project
   - `npm run build:all`
4. Start the project
   - `npm start`

### Testing

For easier testing of both the front and backend tests pertaining to each piece are respectively in the **client** and **server** folders.  To run the tests go into either folder and execute the command `npm run test`.  
