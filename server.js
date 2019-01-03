const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');


const app = express();

// Set the port of application
const PORT = process.env.PORT || 8080

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
});

connection.connect(function(err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the burgers in it.
app.get("/", function(req, res) {
    connection.query("SELECT * FROM movies;", function(err, data) {
        if (err) {
          return res.status(500).end();
        }
    
        res.render("index", { movies: data });
      });
});

// Create a new burger entry 
app.post("", function(req, res) {
    connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
        if (err) {
          return res.status(500).end();
        }
    
        // Send back the ID of the new movie
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
      });
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
})