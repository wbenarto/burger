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

// Use Handlebars to render the main index.html page with the burgers in it.
app.get("/", (req, res) => {
    db.query("SELECT * FROM burgers;", (err, data) => {
        if (err) {
          return res.status(500).end();
        }
    
        res.render("index", { burger: data });
      });
});

// Create a new burger entry 
app.post("", (req, res) => {
    db.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.movie], (err, result) => {
        if (err) {
          return res.status(500).end();
        }
    
        // Send back the ID of the new movie
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
      });
});

// Importing routes and giving access to it
var routes = require('./controllers/burgers_controller');

app.use('/', routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
})