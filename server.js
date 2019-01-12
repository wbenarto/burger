const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// Set the port of application
const PORT = process.env.PORT || 8080;

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establishing Handlebars as templating language
const exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Importing routes and giving access to it
const routes = require('./controllers/burgers_controller');

app.use('/', routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
})