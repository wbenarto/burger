const express = require('express');

const app = express();

// Set the port of application
const PORT = process.env.PORT || 8080

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establishing Handlebars as templating language
const exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Establishing mysql conncection
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
});

db.connect((err) => {
    if (err) throw err;

    console.log("MySQLconnected as id " + db.threadId);
});

// Importing routes and giving access to it
var routes = require('./controllers/burgers_controller');

app.use('/', routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
})