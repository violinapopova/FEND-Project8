# Sofia Cultural Map

**Sofia Cultural Map** project is the 8th and last project of the Front-End Web Development Nanodegree Program of Udacity.

## Project Overview

A single page application featuring a full screen Google map of a choosen location. The page represents 5 locations, identifed by map markers. When the page is loaded the User can interact with the locations. On a navigation menu five local landmarks are displayed by default. They could be filtered by name or can be directly clicked. There are animated map markers which on click show additional information about the selected landmark like landmark's title and the number of user likes according to summary provided by Foursquare API.
The design is accessible for screen reader use.
The page is responsive and could be used on desktop, tablet and mobile displays.
Offline use: By a ServiceWorker => a script that your browser runs in the background for offline experience.

* Notes: I'm using API keys for development purposes only. That's why when you run the app the map will be marked. Also this is the reason I'm using limit endpoints from Foursquare API. Feel free to use your own API keys.

## Installation

1. Clone the repository or download files

2. You will need npm to manage dependencies.

    * npm install

3. To run the app in a development mode

    * npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. With Create-react-app a Serviceworker is invoked by default. You need to run project in production build.

    * npm run build

    * serve -s build

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Dependencies

* [Create React App](https://github.com/facebookincubator/create-react-app)

* [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp)

* [Google Maps API](https://cloud.google.com/maps-platform/)

* [Foursquare API](https://foursquare.com/developers/apps)

* [Google Fonts](https://fonts.google.com/)
