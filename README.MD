# San Mateo Neighborhoods Essentials App 

The purpose of this project is to build a web application using React.js from scratch. It should:
* Be Responsive
* Be A single page app built with React.js
* Use asynchronous requests to Google Maps API and at least one more 3rd party API
* Function Offline using Service Workers
* Be Accessible

### What is this app?
This app is a local map for San Mateo (hardcoded to 3000 meters around the downtown) neighborhood. It shows markers on the map of different useful places like coffee shops, gyms, bakeries, etc. There's a filter dropdown available - it allows to narrow down the list to only chosen category.

Keep in mind that right now the app is limited to only request **5 items per each category**. This limitation is made for comfortable testing and developing, because I use *free* Foursquare API account and it has limits on daily requests.

Sometimes there could be mildly irrelevant results (like a burger shop in an ice-cream category), because it may have this as a secondary category on Foursquare (and indeed serve ice-cream) but have a different primary category.

### How to run the project in a development mode (no service worker)

1. Copy this repo on your computer
2. Check that you have node.js and npm installed
3. Install all project dependencies with `npm install`
4. Modify Google Maps API key ( in `./src/Map.js`, parameter **googleMapURL**) to match yours. Modify Foursquare API key ( in `./src/Foursquare.js`, parameter **foursquareKeys**) to match yours.
  *These keys will be disabled as soon as the app gets evaluated by Udacity team.*
5. Start the development server with `npm start`

With your server running, visit the site: `http://localhost:3000` (it will be opened for you when you run `npm start` command)

### How to run the project in a production mode
1. Repeat steps 1-4 from a previous section
2. Build the project with `npm run build`
5. Start the production server with `serve -s build`

With your server running, visit the site: `http://localhost:5000`


### What's used in the project
* React.js
* node.js 
* npm
* React Google Maps component

### APIs used
* Google Maps
* Foursquare

